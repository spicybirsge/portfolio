import { Navbar } from "@/components/navbar"
import { Projects } from "@/components/sections/projects"
import { Experience } from "@/components/sections/experience"
import { Contact } from "@/components/sections/contact"
import { portfolio } from "@/lib/portfolio"

export const metadata = { title: "Work" }

export default function WorkPage() {
  return <><Navbar /><main id="main-content" className="mx-auto w-full max-w-[672px] space-y-5 px-5 pt-16 sm:px-6 sm:pt-20">
    <section><h1 className="text-4xl font-semibold tracking-tight">Work</h1>
    
    </section>
    
    <Experience />
    <Projects />
    <Contact />
  </main></>
}
