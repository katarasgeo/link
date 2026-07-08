# WiFi Roller Shade Controller (ESP32 + TB6600 + NEMA17/23)

Controls a roller shade (180cm wide, 329cm drop) over WiFi from a stepper
motor driven through a TB6600 driver on a 1:1 belt to the 40mm roller tube.

Files:
- `wiring_diagram.svg` — full wiring diagram (open in a browser or any SVG viewer)
- `curtain_controller.ino` — ESP32 Arduino sketch

## Hardware

| Part | Notes |
|---|---|
| ESP32 dev board | any variant with 5V/VIN pin exposed |
| TB6600 stepper driver | set DIP switches to 1/16 microstepping, current to match motor rating |
| NEMA17 or NEMA23 stepper | 1.8°/step (200 steps/rev) |
| 24V DC power supply | sized for the motor's rated current |
| 2x normally-open limit switch | one at fully-open, one at fully-closed |
| Pulley + belt | 1:1 ratio between motor shaft and 40mm roller tube |

## Wiring

See `wiring_diagram.svg`. Summary:

| ESP32 pin | Connects to |
|---|---|
| 5V (VIN) | TB6600 PUL+, DIR+, ENA+ (tied together) |
| GPIO25 | TB6600 PUL- |
| GPIO26 | TB6600 DIR- |
| GPIO27 | TB6600 ENA- |
| GPIO32 | LIMIT_OPEN switch (other leg to GND) |
| GPIO33 | LIMIT_CLOSE switch (other leg to GND) |
| GND | TB6600 logic GND (shared ground, required) |

TB6600 VCC/GND go to the 24V supply; A+/A-/B+/B- go to the stepper motor's
four coil wires. The 24V supply ground does **not** need to be tied to the
ESP32 — the PUL/DIR/ENA inputs are opto-isolated.

## Step calculation

```
tube circumference = pi * 40mm            = 125.66 mm
roller revolutions  = 3290mm / 125.66mm   = 26.18 rev
motor steps/rev      = 200 * 16 microsteps = 3200
full travel steps    = 26.18 * 3200        = ~83,786 steps  (1:1 belt)
```

These constants live at the top of `curtain_controller.ino`
(`TUBE_DIAMETER_MM`, `DROP_MM`, `PULLEY_RATIO`, `MICROSTEPS`) — edit them if
your install differs. The sketch also **self-calibrates**: the first time
the shade runs fully open and hits `LIMIT_OPEN`, it records the actual step
count and uses that going forward instead of the theoretical estimate.

## Setup

1. Install the **AccelStepper** library (Arduino Library Manager).
2. Open `curtain_controller.ino`, set `WIFI_SSID` / `WIFI_PASSWORD`.
3. Set the TB6600 DIP switches for 1/16 microstepping and the correct motor
   current limit.
4. Flash to the ESP32, open Serial Monitor at 115200 baud to see the
   assigned IP address once it joins WiFi.
5. On boot the shade homes itself: it slowly closes until `LIMIT_CLOSE`
   triggers and sets that as position 0.
6. Visit `http://<esp32-ip>/` for the control page (Open / Close / Stop /
   position slider).

## API

- `GET /open` — run to fully open
- `GET /close` — run to fully closed
- `GET /stop` — stop immediately
- `GET /position?value=NN` — move to NN% open (0-100)
- `GET /status` — JSON `{state, percent, calibrated, position, maxSteps}`

## Safety notes

- Both limit switches are checked every loop iteration independently of
  step counting, so a motor stall or skipped steps won't drive the shade
  into the hard stop.
- If the shade moves the wrong direction on `/open`, either swap the two
  wires of one motor coil, or set `stepper.setPinsInverted(true, true, false)`
  in `setup()`.
