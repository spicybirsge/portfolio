import { Navbar } from "@/components/navbar";
import { Suspense } from "react";
import { Contributions } from "@/components/sections/contributions";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";
import { SectionHeading } from "@/components/sections/section-heading";
import { portfolio } from "@/lib/portfolio";

export const revalidate = 3600;

export default function Home() {
  return <>
    <Navbar />
    <main id="main-content" className="mx-auto w-full max-w-[672px] space-y-16 px-5 pt-16 sm:px-6 sm:pt-20">
      <section aria-labelledby="intro-title">
     
        <h1 id="intro-title" className="mt-6 text-4xl font-semibold tracking-tight">{portfolio.profile.name}</h1>
        <p className="mt-4 font-mono text-sm text-brand">{portfolio.profile.role}</p>
        <p className="mt-5 max-w-[510px] text-base leading-7 text-muted-foreground">{portfolio.profile.summary}</p>
        <div className="mt-8 flex flex-wrap gap-6 font-mono text-sm text-muted-foreground">
          <a href={"https://github.com/" + portfolio.github.username} target="_blank" rel="noreferrer" className="hover:text-foreground">github ↗</a>
          <a href={"mailto:" + portfolio.contact.email} className="hover:text-foreground">email ↗</a>
          {portfolio.site.resumeUrl ? <a href={portfolio.site.resumeUrl} target="_blank" rel="noreferrer" className="hover:text-foreground">resume ↗</a> : null}
        </div>
      </section>
      <Suspense fallback={<section aria-label="Loading GitHub contributions"><SectionHeading>{portfolio.github.heading}</SectionHeading><div className="h-40 rounded-lg border bg-muted/50" role="status"><p className="p-5 text-xs text-muted-foreground">Loading GitHub activity…</p></div></section>}>
        <Contributions />
      </Suspense>
      <Projects preview />
      <section aria-labelledby="tools-title"><SectionHeading id="tools-title">{portfolio.sections.skillsTitle}</SectionHeading><ul className="flex flex-wrap gap-2">{portfolio.skills.map((skill) => <li key={skill} className="rounded-md border bg-card px-3 py-2 font-mono text-xs text-muted-foreground">{skill}</li>)}</ul></section>
      <Contact />
    </main>
  </>;
}
