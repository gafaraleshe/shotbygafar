"use client";

/*
 * Shared form primitives for the booking + contact forms. Styled to match the
 * filing-card system: white paper fields on the dotted card, mono labels.
 */

import type { ReactNode } from "react";

const fieldBase =
  "w-full rounded-md border border-neutral-900/15 bg-white px-3 py-2.5 font-mono text-[13px] text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-900/50 focus:ring-2 focus:ring-neutral-900/10 disabled:opacity-60";

export function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-500"
    >
      {children}
      {required && <span className="ml-1 text-rose-600">*</span>}
    </label>
  );
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1 font-mono text-[11px] text-rose-600">{message}</p>
  );
}

export function Input(
  props: React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean },
) {
  const { invalid, className, ...rest } = props;
  return (
    <input
      {...rest}
      className={`${fieldBase} ${invalid ? "border-rose-500/60" : ""} ${className ?? ""}`}
    />
  );
}

export function Select(
  props: React.SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean },
) {
  const { invalid, className, children, ...rest } = props;
  return (
    <select
      {...rest}
      className={`${fieldBase} appearance-none ${invalid ? "border-rose-500/60" : ""} ${className ?? ""}`}
    >
      {children}
    </select>
  );
}

export function Textarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    invalid?: boolean;
  },
) {
  const { invalid, className, ...rest } = props;
  return (
    <textarea
      {...rest}
      className={`${fieldBase} resize-y ${invalid ? "border-rose-500/60" : ""} ${className ?? ""}`}
    />
  );
}
