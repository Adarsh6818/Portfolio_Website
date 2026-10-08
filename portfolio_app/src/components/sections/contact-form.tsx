"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { CheckCircle2, Loader2 } from "lucide-react";

type FormValues = {
  name: string;
  email: string;
  message: string;
  company: string; // honeypot
};

const inputClass =
  "w-full rounded-2xl border border-border bg-surface-2/70 px-5 py-4 text-sm outline-none transition-colors placeholder:text-muted focus:border-accent/60";

/** The contact form as a self-contained glass panel (used by the contact hero). */
export function ContactFormPanel({ className = "" }: { className?: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(values: FormValues) {
    setStatus("idle");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error ?? "Something went wrong.");
      }
      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const panelClass = `rounded-3xl border border-border bg-surface/60 p-3 shadow-2xl shadow-black/10 backdrop-blur-xl ${className}`;

  if (status === "success") {
    return (
      <div
        className={`${panelClass} flex flex-col items-center justify-center gap-4 p-10 text-center`}
      >
        <CheckCircle2 className="size-12 text-accent" />
        <h3 className="text-xl font-semibold">Message sent!</h3>
        <p className="max-w-sm text-sm text-muted">
          Thanks for reaching out — I&apos;ll get back to you as soon as I can.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 rounded-full border border-border bg-surface-2 px-5 py-2.5 text-sm transition-colors hover:border-accent/50"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={`${panelClass} flex flex-col gap-3`}
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="sr-only">
          Name
        </label>
        <input
          id="name"
          autoComplete="name"
          className={inputClass}
          placeholder="Name"
          {...register("name", {
            required: "Name is required",
            minLength: { value: 2, message: "Name is too short" },
          })}
        />
        {errors.name ? (
          <span className="px-2 text-xs text-red-400">{errors.name.message}</span>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className={inputClass}
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          })}
        />
        {errors.email ? (
          <span className="px-2 text-xs text-red-400">{errors.email.message}</span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-1.5">
        <label htmlFor="message" className="sr-only">
          Message
        </label>
        <textarea
          id="message"
          rows={8}
          className={`${inputClass} min-h-48 flex-1 resize-none`}
          placeholder="Message"
          {...register("message", {
            required: "Message is required",
            minLength: { value: 10, message: "Message is too short" },
          })}
        />
        {errors.message ? (
          <span className="px-2 text-xs text-red-400">
            {errors.message.message}
          </span>
        ) : null}
      </div>

      {/* Honeypot — hidden from real users */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
        {...register("company")}
      />

      {status === "error" ? (
        <p className="px-2 text-sm text-red-400">{errorMsg}</p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-foreground px-6 py-4 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Submit"
        )}
      </button>
    </form>
  );
}
