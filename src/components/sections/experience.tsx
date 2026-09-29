import { getWork, portfolio } from "@/lib/portfolio"
import { SectionHeading } from "./section-heading"

export function Experience() {
  return <section aria-labelledby="experience-title">
    <SectionHeading id="experience-title">{portfolio.sections.experienceTitle}</SectionHeading>
    <div className="space-y-7">{getWork().map((job) => <article key={job.id} className="grid gap-2 sm:grid-cols-[135px_1fr]">
      <p className="pt-0.5 font-mono text-xs text-muted-foreground">{job.startDate.slice(0, 4)} — {job.endDate?.slice(0, 4) ?? "Present"}</p>
      <div><h3 className="text-sm font-medium">{job.role}</h3><p className="mt-1 text-sm text-brand">{job.url ? <a href={job.url} target="_blank" rel="noopener noreferrer" className="hover:underline">{job.company} ↗</a> : job.company}</p><p className="mt-2 text-sm leading-6 text-muted-foreground">{job.description}</p></div>
    </article>)}</div>
  </section>
}
