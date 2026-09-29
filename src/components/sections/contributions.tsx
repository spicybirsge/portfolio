import { getContributions } from "@/lib/github"
import { portfolio } from "@/lib/portfolio"
import { SectionHeading } from "./section-heading"

const levels = ["bg-muted", "bg-green-200 dark:bg-green-950", "bg-green-400 dark:bg-green-800", "bg-green-600 dark:bg-green-600", "bg-green-800 dark:bg-green-400"]

export async function Contributions() {
  const days = await getContributions(portfolio.github.username)
  const total = days?.reduce((sum, day) => sum + day.count, 0) ?? 0
  const offset = days?.length ? new Date(days[0].date + "T00:00:00Z").getUTCDay() : 0
  const weeks = days ? Math.ceil((offset + days.length) / 7) : 0
  const months = days?.flatMap((day, index) => index === 0 || day.date.slice(5, 7) !== days[index - 1].date.slice(5, 7) ? [{ label: new Date(day.date + "T00:00:00Z").toLocaleDateString("en-US", { month: "short", timeZone: "UTC" }), column: Math.floor((index + offset) / 7) + 1 }] : []) ?? []
  return (
    <section aria-labelledby="contributions-title">
      <SectionHeading id="contributions-title">{portfolio.github.heading}</SectionHeading>
      <div className="rounded-lg border bg-card p-4 sm:p-5">
        {days && days.length > 0 ? (
          <>
            <div className="overflow-x-auto pb-2" tabIndex={0} role="region" aria-label="GitHub contribution calendar. Scroll horizontally on small screens.">
              <div className="min-w-[560px]">
                <div aria-hidden="true" className="mb-2 ml-7 grid h-4 text-[9px] text-muted-foreground" style={{ gridTemplateColumns: "repeat(" + weeks + ", minmax(0, 1fr))" }}>
                  {months.filter((month, index) => !months[index + 1] || months[index + 1].column - month.column >= 3).map((month, index) => <span key={index} style={{ gridColumn: month.column, gridRow: 1 }}>{month.label}</span>)}
                </div>
                <div className="flex gap-2">
                  <div aria-hidden="true" className="grid w-5 shrink-0 grid-rows-7 text-[9px] text-muted-foreground"><span className="row-start-2">Mon</span><span className="row-start-4">Wed</span><span className="row-start-6">Fri</span></div>
                  <div role="img" aria-label={total + " GitHub contributions over the displayed year"} className="grid flex-1 grid-flow-col grid-rows-7 gap-[2px]" style={{ gridTemplateColumns: "repeat(" + weeks + ", minmax(0, 1fr))" }}>
                    {Array.from({ length: offset }, (_, index) => <span key={"pad-" + index} />)}
                    {days.map((day) => <span key={day.date} title={day.count + " contributions on " + day.date} className={"aspect-square rounded-[1px] " + levels[day.level]} />)}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-[10px] text-muted-foreground">
              <span>{total.toLocaleString("en-US")} contributions in the last year</span>
              <div className="flex items-center gap-1" aria-hidden="true"><span className="mr-1">Less</span>{levels.map((level) => <span key={level} className={"size-2.5 rounded-[1px] " + level} />)}<span className="ml-1">More</span></div>
            </div>
          </>
        ) : <p className="text-sm text-muted-foreground">{days ? "No contributions found for this period." : "GitHub activity is temporarily unavailable."}</p>}
      </div>
      <a className="mt-3 inline-block font-mono text-xs text-muted-foreground hover:text-foreground" href={"https://github.com/" + portfolio.github.username} target="_blank" rel="noreferrer">View my GitHub ↗</a>
    </section>
  )
}
