import { Footer, Header } from "./components/site";
import { IntroDoodle } from "./components/notebook";
import { ProjectList } from "./components/project-list";
export default function Home(){return <div className="site-shell site-layout"><Header/><main>
<section className="margin-intro"><div className="intro-side-note">I am</div><h1>Olli Järvinen</h1><h2>and this is<br/>my notebook</h2><p>I’m an MSc graduate from Aalto University School of Business, interested in data-driven decision-making, business analytics, and service operations.</p><a className="simple-link" href="/about">More about me</a><IntroDoodle/></section>
<section className="work-section" aria-labelledby="projects-title"><div className="work-section-heading"><h2 id="projects-title">Selected projects</h2><a href="/projects">Project index</a></div><ProjectList/></section>
</main><Footer/></div>;}
