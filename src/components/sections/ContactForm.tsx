"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { ButtonEl } from "@/components/ui/Button";

const inputClasses =
  "w-full rounded-md border border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-ink-300 transition-colors focus:border-oak-600 focus:outline-none";

export function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("Γενικό ερώτημα");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const buildMessage = () =>
    [
      `Γεια σας, θα ήθελα να κλείσω ραντεβού.`,
      `Όνομα: ${name}`,
      `Τηλέφωνο: ${phone}`,
      `Ενδιαφέρον: ${category}`,
      date && `Προτιμώμενη ημερομηνία: ${date}`,
      message && `Μήνυμα: ${message}`,
    ]
      .filter(Boolean)
      .join("\n");

  const validate = () => {
    if (!name.trim() || !phone.trim()) {
      setError("Συμπληρώστε τουλάχιστον όνομα και τηλέφωνο.");
      return false;
    }
    setError("");
    return true;
  };

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const text = encodeURIComponent(buildMessage());
    window.open(`${siteConfig.social.whatsapp}?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const mailtoHref = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
    "Αίτημα ραντεβού",
  )}&body=${encodeURIComponent(buildMessage())}`;

  return (
    <form onSubmit={handleWhatsApp} className="space-y-5" noValidate>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-ink">
            Ονοματεπώνυμο
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClasses}
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-ink">
            Τηλέφωνο
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClasses}
            autoComplete="tel"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className="mb-2 block text-sm font-medium text-ink">
            Ενδιαφέρον
          </label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={inputClasses}
          >
            <option>Γενικό ερώτημα</option>
            {siteConfig.categories.map((c) => (
              <option key={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="date" className="mb-2 block text-sm font-medium text-ink">
            Προτιμώμενη ημερομηνία
          </label>
          <input
            id="date"
            name="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink">
          Μήνυμα (προαιρετικό)
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={inputClasses}
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4 pt-2">
        <ButtonEl type="submit" variant="primary" size="lg">
          Αποστολή μέσω WhatsApp
        </ButtonEl>
        <a
          href={mailtoHref}
          className="text-sm font-medium text-oak-600 underline decoration-oak-100 underline-offset-4 hover:text-oak-800"
        >
          ή στείλτε email →
        </a>
      </div>
    </form>
  );
}
