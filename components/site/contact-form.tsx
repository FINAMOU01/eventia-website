"use client";

import { useReducedMotion } from "framer-motion";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent, type MouseEvent, type ReactNode } from "react";
import { Button, ButtonContent, buttonClasses } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/cn";
import type { Locale } from "@/lib/i18n";
import { submitQuoteRequest, type QuoteRequest } from "@/lib/quote-request";
import { siteConfig } from "@/lib/site";

export const QUOTE_FORM_ID = "demande-devis";

type FieldName = keyof QuoteRequest;
type Errors = Partial<Record<FieldName, string>>;

const REQUIRED_FIELDS: FieldName[] = ["name", "email", "need"];
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const copy = {
  fr: {
    required: "Ce champ est requis.",
    invalidEmail: "Merci de saisir une adresse e-mail valide.",
    title: "Demande de devis",
    successTitle: "Votre demande est prête.",
    successText:
      "Votre messagerie s’est ouverte avec votre demande pré-remplie : il vous suffit d’envoyer l’e-mail pour nous la transmettre. Si elle ne s’est pas ouverte, écrivez-nous à",
    again: "Faire une nouvelle demande",
    labels: {
      name: "Nom & prénom",
      company: "Société",
      email: "E-mail",
      phone: "Téléphone",
      date: "Date",
      location: "Lieu",
      eventType: "Type d’événement",
      need: "Besoin",
    },
    placeholders: {
      location: "Ville, salle…",
      eventType: "Concours, lancement de produit, salon, gala…",
      need: "Nombre de personnes, horaires, profils, tenue, langues…",
    },
    submitting: "Préparation…",
    submit: "Envoyer ma demande",
    noteStart: "Les champs marqués d’un",
    noteEnd: "sont requis. Votre demande s’ouvre dans votre messagerie, prête à être envoyée à",
  },
  en: {
    required: "This field is required.",
    invalidEmail: "Please enter a valid e-mail address.",
    title: "Quote request",
    successTitle: "Your request is ready.",
    successText:
      "Your e-mail app has opened with your request pre-filled: simply send the e-mail to pass it on to us. If it did not open, write to us at",
    again: "Make a new request",
    labels: {
      name: "Full name",
      company: "Company",
      email: "E-mail",
      phone: "Phone",
      date: "Date",
      location: "Venue",
      eventType: "Type of event",
      need: "Requirements",
    },
    placeholders: {
      location: "City, venue…",
      eventType: "Pageant, product launch, trade show, gala…",
      need: "Number of people, schedule, profiles, dress code, languages…",
    },
    submitting: "Preparing…",
    submit: "Send my request",
    noteStart: "Fields marked with an",
    noteEnd: "are required. Your request opens in your e-mail app, ready to be sent to",
  },
} satisfies Record<Locale, unknown>;

const inputClasses =
  "w-full rounded-none border-0 border-b border-input bg-transparent px-0 py-3 text-body text-fg transition-[border-color,box-shadow] duration-300 placeholder:text-fg-muted/60 hover:border-fg/40 focus:border-accent focus:shadow-[0_1px_0_0_var(--color-accent)] focus-visible:outline-none aria-invalid:border-fg aria-invalid:shadow-[0_1px_0_0_var(--color-fg)]";

function fieldError(name: FieldName, value: string, locale: Locale) {
  const trimmed = value.trim();
  if (REQUIRED_FIELDS.includes(name) && trimmed === "") return copy[locale].required;
  if (name === "email" && trimmed !== "" && !EMAIL_PATTERN.test(trimmed)) {
    return copy[locale].invalidEmail;
  }
  return undefined;
}

function readRequest(form: HTMLFormElement): QuoteRequest {
  const data = new FormData(form);
  const value = (name: FieldName) => String(data.get(name) ?? "");
  return {
    name: value("name"),
    company: value("company"),
    email: value("email"),
    phone: value("phone"),
    date: value("date"),
    location: value("location"),
    eventType: value("eventType"),
    need: value("need"),
  };
}

type FieldProps = {
  name: FieldName;
  label: string;
  errors: Errors;
  className?: string;
  children: (props: {
    id: string;
    name: FieldName;
    required?: true;
    "aria-invalid"?: true;
    "aria-describedby"?: string;
  }) => ReactNode;
};

function Field({ name, label, errors, className, children }: FieldProps) {
  const id = `devis-${name}`;
  const errorId = `${id}-erreur`;
  const error = errors[name];
  const required = REQUIRED_FIELDS.includes(name);

  return (
    <div className={cn("flex flex-col", className)}>
      <label htmlFor={id} className="text-eyebrow font-medium tracking-[0.14em] text-fg-muted uppercase">
        {label}
        {required && (
          <span aria-hidden="true" className="text-accent">
            {" "}
            *
          </span>
        )}
      </label>
      {children({
        id,
        name,
        required: required || undefined,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": error ? errorId : undefined,
      })}
      {error && (
        <p id={errorId} className="mt-2 flex items-center gap-1.5 text-small text-fg">
          <AlertCircle aria-hidden="true" className="size-4 shrink-0 text-accent" />
          {error}
        </p>
      )}
    </div>
  );
}

/** "Demander un devis" CTA that brings the quote form into view and focuses its first field. */
export function QuoteFormLink({ children, className }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    const form = document.getElementById(QUOTE_FORM_ID);
    if (!form) return;
    event.preventDefault();
    form.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    form.querySelector<HTMLInputElement>("input")?.focus({ preventScroll: true });
  }

  return (
    <a href={`#${QUOTE_FORM_ID}`} onClick={handleClick} className={buttonClasses({ size: "lg", className })}>
      <ButtonContent variant="primary" icon={<ArrowRight />}>
        {children}
      </ButtonContent>
    </a>
  );
}

export function ContactForm({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  function validate(form: HTMLFormElement) {
    const request = readRequest(form);
    const names = Object.keys(request) as FieldName[];
    const nextErrors: Errors = {};
    for (const name of names) {
      const error = fieldError(name, request[name], locale);
      if (error) nextErrors[name] = error;
    }
    setErrors(nextErrors);

    const firstInvalid = names.find((name) => nextErrors[name]);
    if (firstInvalid) form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
    return firstInvalid ? null : request;
  }

  // Once a field shows an error, re-check it as the visitor corrects it.
  function handleChange(event: ChangeEvent<HTMLFormElement>) {
    const field = event.target as unknown as HTMLInputElement | HTMLTextAreaElement;
    const name = field.name as FieldName;
    if (!errors[name]) return;
    setErrors((current) => ({ ...current, [name]: fieldError(name, field.value, locale) }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const request = validate(event.currentTarget);
    if (!request) return;

    setStatus("submitting");
    try {
      await submitQuoteRequest(request, locale);
      setStatus("success");
    } catch {
      setStatus("idle");
    }
  }

  function startOver() {
    setErrors({});
    setStatus("idle");
  }

  return (
    <div
      id={QUOTE_FORM_ID}
      role="region"
      aria-labelledby="devis-titre"
      className="rounded-card border border-line bg-surface p-6 sm:p-10 lg:p-12"
    >
      <Eyebrow id="devis-titre">{t.title}</Eyebrow>

      {status === "success" ? (
        <div role="status" className="mt-8 flex flex-col items-start gap-5">
          <CheckCircle2 aria-hidden="true" className="size-10 text-accent" />
          <p className="font-display text-h3 text-fg">{t.successTitle}</p>
          <p className="max-w-md text-body text-fg-muted">
            {t.successText}{" "}
            <a href={`mailto:${siteConfig.contact.email}`} className="text-accent underline underline-offset-4">
              {siteConfig.contact.email}
            </a>
            .
          </p>
          <Button variant="text" onClick={startOver}>
            {t.again}
          </Button>
        </div>
      ) : (
        <form
          noValidate
          onSubmit={handleSubmit}
          onChange={handleChange}
          aria-busy={status === "submitting"}
          aria-describedby="devis-mention"
          className="mt-8 flex flex-col gap-8"
        >
          <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
            <Field name="name" label={t.labels.name} errors={errors}>
              {(props) => <input {...props} type="text" autoComplete="name" className={inputClasses} />}
            </Field>
            <Field name="company" label={t.labels.company} errors={errors}>
              {(props) => <input {...props} type="text" autoComplete="organization" className={inputClasses} />}
            </Field>
            <Field name="email" label={t.labels.email} errors={errors}>
              {(props) => (
                <input {...props} type="email" autoComplete="email" inputMode="email" className={inputClasses} />
              )}
            </Field>
            <Field name="phone" label={t.labels.phone} errors={errors}>
              {(props) => <input {...props} type="tel" autoComplete="tel" inputMode="tel" className={inputClasses} />}
            </Field>
            <Field name="date" label={t.labels.date} errors={errors}>
              {(props) => <input {...props} type="date" className={inputClasses} />}
            </Field>
            <Field name="location" label={t.labels.location} errors={errors}>
              {(props) => (
                <input {...props} type="text" placeholder={t.placeholders.location} className={inputClasses} />
              )}
            </Field>
            <Field name="eventType" label={t.labels.eventType} errors={errors} className="sm:col-span-2">
              {(props) => (
                <input {...props} type="text" placeholder={t.placeholders.eventType} className={inputClasses} />
              )}
            </Field>
            <Field name="need" label={t.labels.need} errors={errors} className="sm:col-span-2">
              {(props) => (
                <textarea
                  {...props}
                  rows={5}
                  placeholder={t.placeholders.need}
                  className={cn(inputClasses, "min-h-36 resize-y")}
                />
              )}
            </Field>
          </div>

          <div className="flex flex-col gap-4">
            <Button
              type="submit"
              size="lg"
              disabled={status === "submitting"}
              icon={status === "submitting" ? <Loader2 className="animate-spin" /> : <ArrowRight />}
              className="w-full sm:w-auto sm:self-start"
            >
              {status === "submitting" ? t.submitting : t.submit}
            </Button>
            <p id="devis-mention" className="text-small text-fg-muted">
              {t.noteStart} <span className="text-accent">*</span> {t.noteEnd} {siteConfig.contact.email}.
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
