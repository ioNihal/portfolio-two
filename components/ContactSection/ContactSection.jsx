"use client";

import { useState } from "react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const noErrors = { subject: "", email: "", message: "" };

const fieldBase =
  "w-full border-b bg-transparent py-2 font-serif text-xl text-foreground transition-colors placeholder:text-subtle focus:outline-none";

function validate({ subject, email, message }) {
  const errors = { ...noErrors };
  if (subject.trim().length < 2) errors.subject = "Enter a subject (min 2 characters).";
  if (!emailRegex.test(email.trim())) errors.email = "Enter a valid email address.";
  if (message.trim().length < 10) errors.message = "Message must be at least 10 characters.";
  return errors;
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block font-mono text-xs text-subtle">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactSection() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errors, setErrors] = useState(noErrors);

  const inputProps = (id) => ({
    id,
    name: id,
    "aria-invalid": !!errors[id],
    "aria-describedby": errors[id] ? `${id}-error` : undefined,
    className: `${fieldBase} ${errors[id] ? "border-red-500" : "border-subtle focus:border-accent"}`,
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      subject: String(fd.get("subject") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
    };

    const found = validate(payload);
    setErrors(found);
    if (Object.values(found).some(Boolean)) return;

    setStatus("sending");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      form.reset();
      setStatus("sent");
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus("error");
    } finally {
      clearTimeout(timeout);
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="w-full bg-background px-6 py-24"
    >
      <div className="mx-auto max-w-2xl">
        <h2
          id="contact-heading"
          className="mb-6 font-mono text-[13px] font-normal text-muted"
        >
          Contact
        </h2>

        <p className="mb-14 font-serif text-4xl leading-tight text-foreground text-balance sm:text-5xl">
          Got a project in mind? Let&apos;s talk.
        </p>

        <form onSubmit={handleSubmit} noValidate className="space-y-8">
          <div className="grid gap-8 sm:grid-cols-2">
            <Field id="subject" label="subject" error={errors.subject}>
              <input type="text" placeholder="What is it about?" {...inputProps("subject")} />
            </Field>
            <Field id="email" label="email" error={errors.email}>
              <input type="email" placeholder="you@example.com" {...inputProps("email")} />
            </Field>
          </div>

          <Field id="message" label="message" error={errors.message}>
            <textarea
              rows={4}
              placeholder="Min 10 characters"
              {...inputProps("message")}
              className={`${inputProps("message").className} resize-none`}
            />
          </Field>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-sm">
            <button
              type="submit"
              disabled={status === "sending"}
              className="cursor-pointer text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline focus-visible:underline disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "sending" ? "sending…" : "send message ↗"}
            </button>

            <p role="status" className="text-muted">
              {status === "sent" && "Message sent. I'll get back to you soon."}
              {status === "error" && "Couldn't send your message. Please try again."}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}