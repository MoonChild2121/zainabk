"use client";

import { useActionState, useEffect, useState } from "react";
import { sendMessage, type ContactState } from "./actions";

const initialState: ContactState = { status: "idle", message: "" };

type FieldErrors = Partial<Record<"subject" | "message", string>>;
type EmailStatus = null | "valid" | "invalid" | "empty";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Shared field chrome — white field on the light card.
const fieldBase =
  "peer w-full rounded-sm border border-teal-700/20 bg-teal-100 px-4 text-base text-teal-900 outline-none transition focus:border-teal-700/50 focus:ring-2 focus:ring-teal-700/25";

// Label floats up (smaller) when the field is focused OR has content.
const labelFloat =
  "peer-focus:top-1.5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-teal-700 " +
  "peer-[:not(:placeholder-shown)]:top-1.5 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-teal-700";

const labelBase =
  "pointer-events-none absolute left-4 text-base text-teal-900/45 transition-all";

// Live email feedback text + tone.
function emailFeedback(status: EmailStatus): { text: string; tone: "ok" | "err" } | null {
  switch (status) {
    case "valid":
      return { text: "Looks good!", tone: "ok" };
    case "invalid":
      return { text: "That email doesn't look right…", tone: "err" };
    case "empty":
      return { text: "Please enter your email so I can reply.", tone: "err" };
    default:
      return null;
  }
}

/**
 * Contact form (Screen 6). Posts to the `sendMessage` Server Action via
 * useActionState so the Resend API key never touches the client. Validates the
 * email live as it's typed, checks email + message on submit, and shows
 * floating labels, colored feedback, and a disabled/loading state while sending.
 */
export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendMessage, initialState);
  const [emailStatus, setEmailStatus] = useState<EmailStatus>(null);
  const [clientErrors, setClientErrors] = useState<FieldErrors>({});
  const [statusHidden, setStatusHidden] = useState(false);

  // Client-side gate: block submit (and the server action) if email/message
  // are missing/invalid. React skips the action when the submit is prevented.
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setStatusHidden(false);
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    let blocked = false;
    if (!email) {
      setEmailStatus("empty");
      blocked = true;
    } else if (!EMAIL_RE.test(email)) {
      setEmailStatus("invalid");
      blocked = true;
    } else {
      setEmailStatus("valid");
    }

    const errors: FieldErrors = {};
    if (!message) errors.message = "Please write a message.";
    setClientErrors(errors);

    if (blocked || Object.keys(errors).length > 0) event.preventDefault();
  }

  const clearError = (field: keyof FieldErrors) =>
    setClientErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));

  // Auto-dismiss the status line: success after 5s, errors after 10s.
  useEffect(() => {
    if (state.status === "idle") return;
    const delay = state.status === "success" ? 5000 : 10000;
    const t = setTimeout(() => setStatusHidden(true), delay);
    return () => clearTimeout(t);
  }, [state]);

  const errorFor = (field: keyof FieldErrors) =>
    clientErrors[field] ?? state.errors?.[field];

  const succeeded = state.status === "success";
  // Hide inline field messages while sending and once the send succeeds — the
  // button/status line carries the state from there.
  const showMsgs = !pending && !succeeded;

  // Email feedback: live status wins; fall back to a server-side email error.
  const emailMsg = showMsgs
    ? emailFeedback(emailStatus) ??
      (state.errors?.email ? { text: state.errors.email, tone: "err" as const } : null)
    : null;

  return (
    <form
      action={formAction}
      onSubmit={handleSubmit}
      noValidate
      className="flex min-h-[560px] flex-col gap-3 rounded-md bg-teal-200 p-6 text-fg sm:p-7 slide-in-left"
    >
      {/* Honeypot — off-screen, hidden from users; bots that fill it get bounced. */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className={`flex min-h-0 flex-1 flex-col gap-3 ${pending ? "opacity-60" : ""}`}>
        {/* Email — required, validated live */}
        <div>
          <div className="relative">
            <input
              id="cf-email"
              type="email"
              name="email"
              placeholder=" "
              autoComplete="email"
              disabled={pending}
              aria-invalid={emailMsg?.tone === "err" ? true : undefined}
              aria-describedby={emailMsg ? "cf-email-msg" : undefined}
              onInput={(e) => {
                const v = e.currentTarget.value.trim();
                setEmailStatus(v === "" ? null : EMAIL_RE.test(v) ? "valid" : "invalid");
              }}
              className={`${fieldBase} pb-2 pt-5`}
            />
            <label htmlFor="cf-email" className={`${labelBase} top-1/2 -translate-y-1/2 ${labelFloat}`}>
              Your email
            </label>
          </div>
          {emailMsg ? (
            <p
              key={emailMsg.text}
              id="cf-email-msg"
              className={`field-msg mt-1 text-xs font-medium ${emailMsg.tone === "ok" ? "text-green-700" : "text-red-600"}`}
            >
              {emailMsg.text}
            </p>
          ) : null}
        </div>

        {/* Subject — optional */}
        <div>
          <div className="relative">
            <input
              id="cf-subject"
              type="text"
              name="subject"
              placeholder=" "
              disabled={pending}
              aria-invalid={errorFor("subject") ? true : undefined}
              onInput={() => clearError("subject")}
              className={`${fieldBase} pb-2 pt-5`}
            />
            <label htmlFor="cf-subject" className={`${labelBase} top-1/2 -translate-y-1/2 ${labelFloat}`}>
              Subject <span className="text-teal-900/35">(optional)</span>
            </label>
          </div>
          {showMsgs && errorFor("subject") ? (
            <p key={errorFor("subject")} className="field-msg mt-1 text-xs font-medium text-red-600">
              {errorFor("subject")}
            </p>
          ) : null}
        </div>

        {/* Message — required */}
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="relative flex min-h-0 flex-1 flex-col">
            <textarea
              id="cf-message"
              name="message"
              placeholder=" "
              disabled={pending}
              aria-invalid={errorFor("message") ? true : undefined}
              aria-describedby={errorFor("message") ? "cf-message-err" : undefined}
              onInput={() => clearError("message")}
              className={`${fieldBase} min-h-[196px] flex-1 resize-none pb-2 pt-6`}
            />
            <label htmlFor="cf-message" className={`${labelBase} top-4 ${labelFloat}`}>
              Your message
            </label>
          </div>
          {showMsgs && errorFor("message") ? (
            <p
              key={errorFor("message")}
              id="cf-message-err"
              className="field-msg mt-1 text-xs font-medium text-red-600"
            >
              {errorFor("message")}
            </p>
          ) : null}
        </div>
      </div>

      {/* Status message slides out from behind the send button, then fades
          away 5s after a successful send. */}
      <div className="relative flex items-center justify-end gap-3 overflow-hidden">
        <p
          aria-live="polite"
          data-show={
            state.status !== "idle" && !pending && !statusHidden ? "true" : "false"
          }
          className={`status-slide whitespace-nowrap text-sm font-medium ${succeeded ? "text-green-700" : "text-red-600"}`}
        >
          {state.status === "idle" ? "" : state.message}
        </p>
        <button
          type="submit"
          disabled={pending}
          className="relative z-10 inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-sm bg-teal-500 px-5 py-3 text-sm font-semibold text-green-100 transition-colors hover:bg-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? (
            <>
              <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z" />
              </svg>
              Sending…
            </>
          ) : (
            "Send message"
          )}
        </button>
      </div>
    </form>
  );
}
