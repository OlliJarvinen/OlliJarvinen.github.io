import { Footer, Header } from "../components/site";
import { ProjectList } from "../components/project-list";
export default function ProjectsPage(){return <div className="site-shell site-layout"><Header current="projects"/><main><section className="detail-page all-work"><span className="eyebrow">Projects &amp; research</span><h1>Selected projects</h1><ProjectList headingLevel={2}/></section></main><Footer/></div>;}
