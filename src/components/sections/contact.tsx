import { portfolio } from "@/lib/portfolio"
import { SectionHeading } from "./section-heading"

export function Contact() {
  return <footer className="pb-8">
    <section aria-labelledby="contact-title">
      <SectionHeading id="contact-title">{portfolio.sections.contactTitle}</SectionHeading>
      <p className="max-w-lg text-sm leading-7 text-muted-foreground">{portfolio.sections.contactDescription}</p>
      <a href={"mailto:" + portfolio.contact.email} className="mt-4 inline-block text-sm text-foreground underline decoration-border underline-offset-4 hover:decoration-brand">{portfolio.contact.email} ↗</a>
      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 font-mono text-xs text-muted-foreground">{portfolio.socials.map((social) => <a key={social.label} href={social.url} target="_blank" rel="noreferrer" className="hover:text-foreground">{social.label.toLowerCase()} ↗</a>)}</div>
    </section>
    <div className="mt-14 flex flex-wrap justify-between gap-3 border-t pt-5 font-mono text-[10px] text-muted-foreground"><span>Copyright &copy; {portfolio.site.name} 2026 - Present. All rights reserved.</span><span>{portfolio.sections.footer}</span></div>
  </footer>
}
