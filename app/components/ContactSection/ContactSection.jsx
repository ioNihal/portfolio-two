"use client";

import { useState } from "react";

export default function ContactSection() {
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState({
    subject: "",
    email: "",
    body: ""
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validate(values) {
    const err = { subject: "", email: "", body: "" };
    let ok = true;

    if (!values.subject || String(values.subject).trim().length < 2) {
      err.subject = "Please enter a subject (min 2 characters).";
      ok = false;
    }

    if (!values.email || !emailRegex.test(String(values.email).trim())) {
      err.email = "Please enter a valid email address.";
      ok = false;
    }

    if (!values.message || String(values.message).trim().length < 10) {
      err.body = "Message must be at least 10 characters.";
      ok = false;
    }

    setErrors(err);
    return ok;
  }


  function inputClass(hasError) {
    const base =
      "w-full border focus:outline-none transition-colors duration-300 p-3";
    const normal = "border-gray-500 focus:border-indigo-500";
    const er = "border-red-500 focus:border-indigo-500";
    return `${base} ${hasError ? er : normal}`;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const fd = new FormData(e.target);
    const payload = {
      subject: fd.get("subject")?.toString() ?? "",
      email: fd.get("email")?.toString() ?? "",
      message: fd.get("body")?.toString() ?? ""
    };

    if (!validate(payload)) {
      return;
    }

    setSending(true);

    // Abort controller with timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      let data = null;
      try {
        data = await res.json();
      } catch (err) {
        // ignore JSON parse errors
      }

      if (!res.ok) {
        const msg = data?.error || data?.message || res.statusText || "Failed to send message";
        console.error(msg);
      } else {
        e.target.reset();
        setErrors({ subject: "", email: "", body: "" });
      }
    } catch (err) {
      if (err.name === "AbortError") {
        console.error("Request timed out. Please try again.");
      } else {
        console.error("Contact form error:", err);
      }
    } finally {
      clearTimeout(timeout);
      setSending(false);
    }
  }

  return (
    <section
      className="min-h-screen w-full bg-gray-950 border-t border-gray-600 relative px-4 sm:px-6 text-white isolate flex flex-col items-center justify-center"
      style={{ fontFamily: "var(--urbanist)" }}
      id="contact"
    >
      <div className="w-full 2xl:w-7/10 m-auto font-bold px-6 lg:px-10">
        <h2 className="text-4xl md:text-6xl lg:text-8xl leading-snug">
          Got a project in mind?<br />Let's talk.
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-1 w-full 2xl:w-7/10 m-auto px-6 lg:px-10 grid grid-cols-1 gap-5 lg:grid-cols-5 lg:grid-rows-2"
        noValidate
      >
        <div className="flex flex-col gap-3 order-1 lg:order-none lg:col-start-4 lg:row-start-1">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            placeholder="Subject"
            required
            className={inputClass(!!errors.subject)}
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? "subject-error-sr" : undefined}
          />

          {errors.subject && (
            <span id="subject-error-sr" className="sr-only">
              {errors.subject}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3 order-2 lg:order-none lg:col-start-5 lg:row-start-1">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
            required
            className={inputClass(!!errors.email)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error-sr" : undefined}
          />
          {errors.email && (
            <span id="email-error-sr" className="sr-only">
              {errors.email}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3 order-3 lg:order-none lg:col-start-1 lg:row-start-1 lg:col-span-3 lg:row-span-2">
          <label htmlFor="body">Message</label>
          <textarea
            id="body"
            name="body"
            rows="5"
            placeholder="Your Message (Min 10 characters)"
            required
            className={inputClass(!!errors.body) + " h-[200px] resize-none"}
            aria-invalid={!!errors.body}
            aria-describedby={errors.body ? "body-error-sr" : undefined}
          />
          {errors.body && (
            <span id="body-error-sr" className="sr-only">
              {errors.body}
            </span>
          )}
        </div>

        <button
          type="submit"
          disabled={sending}
          aria-label="Send message to Nihal"
          className="order-4 lg:order-none lg:col-start-4 lg:col-end-6 lg:row-start-2 bg-white text-black rounded-full text-3xl cursor-pointer hover:opacity-90 transition-opacity duration-300 w-full py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {sending ? "Sending..." : "Message Nihal"}
        </button>
      </form>
    </section>
  );
}
