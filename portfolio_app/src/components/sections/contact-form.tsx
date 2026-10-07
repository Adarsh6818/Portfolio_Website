"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { ContactBlockHeading } from "@/components/ui/contact-block-heading";
import { Reveal } from "@/components/ui/reveal";

type FormValues = {
  name: string;
  email: string;
  message: string;
  company: string; // honeypot
};

const inputClass =
  "w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm outline-none transition-colors placeholder:text-faint focus:border-accent/60";

export function ContactForm({ index = "02" }: { index?: string }) {
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

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-20 md:py-28">
      <ContactBlockHeading index={index} label="Message" title="Send a message" />

      <Reveal className="mt-14">
        {status === "success" ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-surface p-10 text-center">
            <CheckCircle2 className="size-12 text-accent" />
            <h3 className="text-xl font-semibold">Message sent!</h3>
            <p className="max-w-sm text-sm text-muted">
              Thanks for reaching out — I&apos;ll get back to you as soon as I
              can.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-2 rounded-full border border-border bg-surface-2 px-5 py-2.5 text-sm transition-colors hover:border-accent/50"
            >
              Send another
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="grid gap-5 rounded-2xl border border-border bg-surface p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name
                </label>
                <input
                  id="name"
                  className={inputClass}
                  placeholder="Your name"
                  {...register("name", {
                    required: "Name is required",
                    minLength: { value: 2, message: "Name is too short" },
                  })}
                />
                {errors.name ? (
                  <span className="text-xs text-red-400">{errors.name.message}</span>
                ) : null}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className={inputClass}
                  placeholder="you@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                />
                {errors.email ? (
                  <span className="text-xs text-red-400">{errors.email.message}</span>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className={`${inputClass} resize-y`}
                placeholder="Tell me about your project or role..."
                {...register("message", {
                  required: "Message is required",
                  minLength: { value: 10, message: "Message is too short" },
                })}
              />
              {errors.message ? (
                <span className="text-xs text-red-400">
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
              <p className="text-sm text-red-400">{errorMsg}</p>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="size-4" />
                  Send Message
                </>
              )}
            </button>
          </form>
        )}
      </Reveal>
    </section>
  );
}
