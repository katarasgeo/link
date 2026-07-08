/*
  ESP32 + TB6600 + NEMA17/23 WiFi Roller Shade Controller
  ---------------------------------------------------------
  Hardware: see wiring_diagram.svg in this folder.
  Shade: 180cm wide, 329cm drop, 40mm roller tube, 1:1 motor/roller belt.

  Libraries required (Arduino Library Manager):
    - AccelStepper by Mike McCauley
    - WebServer + WiFi are built into the ESP32 board package.

  Wiring summary (active-LOW TB6600 inputs, PUL+/DIR+/ENA+ tied to ESP32 5V):
    GPIO25 -> TB6600 PUL-
    GPIO26 -> TB6600 DIR-
    GPIO27 -> TB6600 ENA-
    GPIO32 -> LIMIT_OPEN switch (other leg to GND, INPUT_PULLUP)
    GPIO33 -> LIMIT_CLOSE switch (other leg to GND, INPUT_PULLUP)
*/

#include <WiFi.h>
#include <WebServer.h>
#include <AccelStepper.h>

// ---------- WiFi credentials ----------
const char* WIFI_SSID     = "YOUR_WIFI_SSID";
const char* WIFI_PASSWORD = "YOUR_WIFI_PASSWORD";

// ---------- Pin map ----------
#define PIN_STEP        25
#define PIN_DIR         26
#define PIN_ENABLE      27
#define PIN_LIMIT_OPEN  32
#define PIN_LIMIT_CLOSE 33

// ---------- Shade geometry (edit to match your install) ----------
const float TUBE_DIAMETER_MM   = 40.0;   // roller tube diameter
const float DROP_MM            = 3290.0; // fabric drop, 329 cm
const float PULLEY_RATIO       = 1.0;    // motor turns per roller turn (1:1 belt)
const int   MOTOR_STEPS_PER_REV = 200;   // 1.8 deg/step NEMA17/23
const int   MICROSTEPS          = 16;    // must match TB6600 DIP switch setting

const float TUBE_CIRC_MM = PI * TUBE_DIAMETER_MM;
const float ROLLER_REVS  = DROP_MM / TUBE_CIRC_MM;
const long  MOTOR_STEPS_PER_MOTOR_REV = (long)MOTOR_STEPS_PER_REV * MICROSTEPS;
// Theoretical steps for a full closed->open travel. Overwritten with a
// measured value the first time the shade completes a full open run.
long maxSteps = (long)(ROLLER_REVS * PULLEY_RATIO * MOTOR_STEPS_PER_MOTOR_REV);

const float MAX_SPEED_SPS = 1500.0; // steps/sec
const float ACCEL_SPS2    = 800.0;  // steps/sec^2

// position convention: 0 = fully closed, maxSteps = fully open

AccelStepper stepper(AccelStepper::DRIVER, PIN_STEP, PIN_DIR);
WebServer server(80);

enum ShadeState { IDLE, HOMING, OPENING, CLOSING };
ShadeState state = IDLE;
bool calibrated = false;

// ---------- Web UI ----------
const char INDEX_HTML[] PROGMEM = R"HTML(
<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Curtain Control</title>
<style>
body{font-family:sans-serif;text-align:center;margin-top:40px;background:#f4f6f7}
button{font-size:18px;padding:14px 28px;margin:8px;border:none;border-radius:8px;color:#fff;cursor:pointer}
.open{background:#1e8449}.close{background:#2c5aa0}.stop{background:#c0392b}
#status{margin-top:20px;font-size:15px;color:#333}
</style></head><body>
<h2>Roller Shade</h2>
<button class="open" onclick="cmd('open')">Open</button>
<button class="close" onclick="cmd('close')">Close</button>
<button class="stop" onclick="cmd('stop')">Stop</button>
<div><input id="pos" type="range" min="0" max="100" value="0" style="width:80%" onchange="setPos(this.value)"></div>
<div id="status">loading...</div>
<script>
function cmd(c){fetch('/'+c).then(refresh)}
function setPos(v){fetch('/position?value='+v).then(refresh)}
function refresh(){fetch('/status').then(r=>r.json()).then(d=>{
  document.getElementById('status').innerText =
    'State: '+d.state+' | Position: '+d.percent+'% | Calibrated: '+d.calibrated;
  document.getElementById('pos').value = d.percent;
})}
setInterval(refresh, 1500);
refresh();
</script></body></html>
)HTML";

void handleRoot() {
  server.send_P(200, "text/html", INDEX_HTML);
}

void handleStatus() {
  int percent = maxSteps > 0 ? (int)((stepper.currentPosition() * 100L) / maxSteps) : 0;
  String stateStr;
  switch (state) {
    case IDLE: stateStr = "idle"; break;
    case HOMING: stateStr = "homing"; break;
    case OPENING: stateStr = "opening"; break;
    case CLOSING: stateStr = "closing"; break;
  }
  String json = "{\"state\":\"" + stateStr + "\",\"percent\":" + String(percent) +
                ",\"calibrated\":" + (calibrated ? "true" : "false") +
                ",\"position\":" + String(stepper.currentPosition()) +
                ",\"maxSteps\":" + String(maxSteps) + "}";
  server.send(200, "application/json", json);
}

void handleOpen() {
  state = OPENING;
  stepper.moveTo(maxSteps);
  server.send(200, "text/plain", "opening");
}

void handleClose() {
  state = CLOSING;
  stepper.moveTo(0);
  server.send(200, "text/plain", "closing");
}

void handleStop() {
  stepper.stop();
  state = IDLE;
  server.send(200, "text/plain", "stopped");
}

void handlePosition() {
  if (!server.hasArg("value")) {
    server.send(400, "text/plain", "missing value");
    return;
  }
  int percent = constrain(server.arg("value").toInt(), 0, 100);
  long target = (maxSteps * (long)percent) / 100;
  state = (target > stepper.currentPosition()) ? OPENING : CLOSING;
  stepper.moveTo(target);
  server.send(200, "text/plain", "moving to " + String(percent) + "%");
}

// Move slowly toward the closed limit switch and zero the position there.
void homeToClosed() {
  state = HOMING;
  stepper.setMaxSpeed(300);
  stepper.setSpeed(-300); // negative = closing direction
  while (digitalRead(PIN_LIMIT_CLOSE) == HIGH) {
    stepper.runSpeed();
  }
  stepper.setCurrentPosition(0);
  stepper.setMaxSpeed(MAX_SPEED_SPS);
  state = IDLE;
}

void setup() {
  Serial.begin(115200);

  pinMode(PIN_LIMIT_OPEN, INPUT_PULLUP);
  pinMode(PIN_LIMIT_CLOSE, INPUT_PULLUP);

  stepper.setEnablePin(PIN_ENABLE);
  // PUL+/DIR+/ENA+ are tied to 5V, so PUL- must pulse LOW to step (step
  // polarity inverted), while ENA- HIGH = enabled / LOW = disabled, which
  // already matches AccelStepper's default (enable NOT inverted).
  stepper.setPinsInverted(false, true, false); // dir, step, enable
  stepper.enableOutputs();
  stepper.setMaxSpeed(MAX_SPEED_SPS);
  stepper.setAcceleration(ACCEL_SPS2);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(400);
    Serial.print(".");
  }
  Serial.println();
  Serial.print("Connected, IP address: ");
  Serial.println(WiFi.localIP());

  server.on("/", handleRoot);
  server.on("/open", handleOpen);
  server.on("/close", handleClose);
  server.on("/stop", handleStop);
  server.on("/position", handlePosition);
  server.on("/status", handleStatus);
  server.begin();

  // Home the shade to a known "closed" position at boot.
  homeToClosed();
}

void loop() {
  server.handleClient();

  // Hardware safety cutoffs, independent of step counting.
  if (state == OPENING && digitalRead(PIN_LIMIT_OPEN) == LOW) {
    stepper.stop();
    stepper.setCurrentPosition(stepper.currentPosition());
    if (!calibrated) {
      maxSteps = stepper.currentPosition(); // learn real travel on first full open
      calibrated = true;
    }
    state = IDLE;
  }
  if (state == CLOSING && digitalRead(PIN_LIMIT_CLOSE) == LOW) {
    stepper.stop();
    stepper.setCurrentPosition(0);
    state = IDLE;
  }

  stepper.run();

  if (stepper.distanceToGo() == 0 && state != IDLE && state != HOMING) {
    state = IDLE;
  }
}
