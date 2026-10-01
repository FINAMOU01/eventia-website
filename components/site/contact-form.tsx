"use client";

import { AlertCircle, ArrowRight, Check } from "lucide-react";
import { useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { expertises } from "@/lib/content";
import { siteConfig } from "@/lib/site";

type FieldName = "name" | "company" | "email" | "phone" | "date" | "location" | "eventType" | "details";
type Errors = Partial<Record<FieldName, string>>;

const inputClasses =
  "w-full border-b border-muted bg-transparent py-3 text-body text-fg transition-colors placeholder:text-fg-muted/70 hover:border-fg focus:border-accent aria-invalid:border-b-2 aria-invalid:border-fg";

function errorMessage(field: HTMLInputElement | HTMLTextAreaElement) {
  if (field.validity.valueMissing) return "Ce champ est requis.";
  if (field.validity.typeMismatch) return "Merci de saisir une adresse e-mail valide.";
  return field.validationMessage;
}

type FieldProps = {
  name: FieldName;
  label: string;
  errors: Errors;
  required?: boolean;
  className?: string;
  children: (props: { id: string; "aria-invalid"?: true; "aria-describedby"?: string }) => ReactNode;
};

function Field({ name, label, errors, required, className, children }: FieldProps) {
  const id = `contact-${name}`;
  const errorId = `${id}-erreur`;
  const error = errors[name];

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label htmlFor={id} className="text-small font-medium text-fg">
        {label}
        {required && (
          <span aria-hidden="true" className="text-accent">
            {" "}
            *
          </span>
        )}
      </label>
      {children({ id, "aria-invalid": error ? true : undefined, "aria-describedby": error ? errorId : undefined })}
      {error && (
        <p id={errorId} className="mt-1 flex items-center gap-1.5 text-small text-fg">
          <AlertCircle aria-hidden="true" className="size-4 text-accent" />
          {error}
        </p>
      )}
    </div>
  );
}

function buildSummary(data: FormData) {
  const needs = data.getAll("needs").map(String);
  const lines = [
    ["Nom & prénom", data.get("name")],
    ["Société", data.get("company")],
    ["E-mail", data.get("email")],
    ["Téléphone", data.get("phone")],
    ["Date", data.get("date")],
    ["Lieu", data.get("location")],
    ["Type d’événement", data.get("eventType")],
    ["Besoin", needs.join(", ")],
    ["Précisions", data.get("details")],
  ]
    .filter(([, value]) => typeof value === "string" && value.trim() !== "")
    .map(([label, value]) => `${label} : ${value}`);

  return lines.join("\n");
}

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function validate(form: HTMLFormElement) {
    const nextErrors: Errors = {};
    let firstInvalid: HTMLElement | null = null;

    for (const element of Array.from(form.elements)) {
      if (!(element instanceof HTMLInputElement || element instanceof HTMLTextAreaElement)) continue;
      if (element.type === "checkbox" || element.validity.valid) continue;
      nextErrors[element.name as FieldName] = errorMessage(element);
      firstInvalid ??= element;
    }

    setErrors(nextErrors);
    firstInvalid?.focus();
    return firstInvalid === null;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!validate(form)) return;

    const data = new FormData(form);
    const eventType = String(data.get("eventType") ?? "").trim();
    const subject = `Demande de devis${eventType ? ` — ${eventType}` : ""}`;
    const body = `Bonjour,\n\nJe souhaite obtenir un devis pour mon événement.\n\n${buildSummary(data)}\n`;

    window.location.href = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("sent");
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-8" aria-describedby="contact-mention">
      <div className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
        <Field name="name" label="Nom & prénom" required errors={errors}>
          {(props) => <input {...props} name="name" type="text" autoComplete="name" required className={inputClasses} />}
        </Field>
        <Field name="company" label="Société" errors={errors}>
          {(props) => <input {...props} name="company" type="text" autoComplete="organization" className={inputClasses} />}
        </Field>
        <Field name="email" label="E-mail" required errors={errors}>
          {(props) => <input {...props} name="email" type="email" autoComplete="email" required className={inputClasses} />}
        </Field>
        <Field name="phone" label="Téléphone" errors={errors}>
          {(props) => <input {...props} name="phone" type="tel" autoComplete="tel" className={inputClasses} />}
        </Field>
        <Field name="date" label="Date" errors={errors}>
          {(props) => <input {...props} name="date" type="date" className={inputClasses} />}
        </Field>
        <Field name="location" label="Lieu" errors={errors}>
          {(props) => <input {...props} name="location" type="text" placeholder="Ville, salle…" className={inputClasses} />}
        </Field>
        <Field name="eventType" label="Type d’événement" errors={errors} className="sm:col-span-2">
          {(props) => (
            <input
              {...props}
              name="eventType"
              type="text"
              placeholder="Concours, lancement de produit, salon, gala…"
              className={inputClasses}
            />
          )}
        </Field>
      </div>

      <fieldset className="flex flex-col gap-4">
        <legend className="text-small font-medium text-fg">Besoin</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {expertises.map((item) => (
            <label
              key={item.id}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-control border border-line px-4 text-small text-fg transition-colors select-none hover:border-accent has-checked:border-accent has-checked:bg-accent has-checked:text-canvas has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-(--tone-focus)"
            >
              <input type="checkbox" name="needs" value={item.title} className="peer sr-only" />
              <Check aria-hidden="true" className="hidden size-4 peer-checked:block" />
              {item.title}
            </label>
          ))}
        </div>
        <Field name="details" label="Précisez votre besoin" errors={errors}>
          {(props) => (
            <textarea
              {...props}
              name="details"
              rows={3}
              placeholder="Nombre de personnes, horaires, tenue, langues…"
              className={cn(inputClasses, "resize-y")}
            />
          )}
        </Field>
      </fieldset>

      <div>
        <Button type="submit" size="lg" icon={<ArrowRight />} className="w-full sm:w-auto">
          Envoyer ma demande
        </Button>
      </div>

      <p id="contact-mention" className="text-small text-fg-muted">
        Les champs marqués d’un <span className="text-accent">*</span> sont requis. Votre demande s’ouvre dans votre
        messagerie, prête à être envoyée à {siteConfig.contact.email}.
      </p>

      <p role="status" className="text-small text-fg">
        {status === "sent" &&
          "Votre messagerie devrait s’ouvrir avec votre demande pré-remplie. Si ce n’est pas le cas, écrivez-nous directement par e-mail ou sur WhatsApp."}
      </p>
    </form>
  );
}
