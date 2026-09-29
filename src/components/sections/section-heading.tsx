export function SectionHeading({ children, id }: { children: React.ReactNode; id?: string }) {
  return <div className="mb-5 flex items-center gap-3"><h2 id={id} className="shrink-0 font-mono text-xs tracking-[0.16em] text-muted-foreground uppercase">{children}</h2><span aria-hidden="true" className="h-px flex-1 bg-border" /></div>
}
