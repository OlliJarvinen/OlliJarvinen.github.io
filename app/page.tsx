import { Footer, Header } from "./components/site";
import { ProjectList } from "./components/project-list";
export default function Home(){return <div className="site-shell site-layout"><Header/><main>
<section className="margin-intro notebook-intro" aria-labelledby="notebook-owner">
  <div className="notebook-owner-label">This notebook belongs to</div>
  <h1 id="notebook-owner" className="notebook-owner"><span>Olli Järvinen</span></h1>
  <p>I’m an MSc graduate from Aalto University School of Business, interested in data-driven decision-making, business analytics, and service operations. This website showcases some of my personal and academic projects.</p>
  <a className="simple-link" href="/about">About me</a>
</section>
<section className="work-section" aria-labelledby="projects-title"><div className="work-section-heading"><h2 id="projects-title">Selected projects</h2><a href="/projects">Project index</a></div><ProjectList/></section>
</main><Footer/></div>;}
