import Link from "next/link"
import { getProjects, portfolio } from "@/lib/portfolio"
import { SectionHeading } from "./section-heading"

export function Projects({ preview = false }: { preview?: boolean }) {
  const projects = getProjects()
  return <section aria-labelledby="projects-title">
    <SectionHeading id="projects-title">{portfolio.sections.workTitle}</SectionHeading>
    <div className="space-y-3">
      {(preview ? projects.slice(0, 3) : projects).map((project) => (
        <article key={project.id} id={project.slug} className="scroll-mt-24 rounded-lg border bg-card p-5">
          <div className="flex items-baseline justify-between gap-4"><h3 className="text-sm font-medium">{project.name}</h3><span className="font-mono text-xs text-muted-foreground">{project.year}</span></div>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{project.description}</p>
          <div className="mt-4 flex flex-wrap items-center gap-2">{project.tags.map((tag) => <span key={tag} className="rounded border border-border/60 bg-muted/60 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">{tag}</span>)}
          </div>
          {project.repoUrl || project.url ? (
            <div className="mt-4 flex flex-wrap gap-4 font-mono text-xs text-brand">
              {project.repoUrl ? <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" aria-label={project.name + " repository"} className="hover:underline">Repository ↗</a> : null}
              {project.url ? <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={project.name + " website"} className="hover:underline">Visit site ↗</a> : null}
            </div>
          ) : null}
        </article>
      ))}
    </div>
    {preview ? <Link href="/work" className="mt-4 inline-block font-mono text-xs text-muted-foreground hover:text-foreground">All work & projects →</Link> : null}
  </section>
}
