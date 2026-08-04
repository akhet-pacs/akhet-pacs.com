export const site = {
  name: "Akhet PACS",
  tagline: "Revealing What Matters.",
  contact: "me@theosarkhe.com",
  whatsapp: "https://wa.me/556196650556",
  whatsappLabel: "+55 61 9665-0556",
} as const;

/** Link do WhatsApp com a mensagem já escrita para quem clica. */
export function whatsappHref(message: string): string {
  return `${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

/** Link de e-mail do contato único do site. */
export const mailtoHref = `mailto:${site.contact}`;
