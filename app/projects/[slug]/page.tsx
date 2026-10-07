import { notFound } from "next/navigation";
import { Footer, Header, SectionLabel, Tags, Visual } from "../../components/site";
import { getProject, projects } from "../../data/projects";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}
export const dynamicParams = false;
export default function ProjectCaseStudy(
  { params }: { params: { slug: string } },
) {
  const project = getProject(params.slug);
  if (!project) notFound();
  return (
    <div className="site-shell">
      <Header current="projects" />
      <main>
        <section className="case-header">
          <div className="container">
            <SectionLabel>Project {project.number} / case study</SectionLabel>
            <h1>{project.title}</h1>
            <p className="case-question">{project.question}</p>
            <Tags items={project.methods} />
            {project.demoUrl && <div className="case-actions"><a className="button" href={`${basePath}${project.demoUrl}`}>Open interactive tool <span aria-hidden="true">↗</span></a><span>English / Suomi · exploratory prototype</span></div>}
          </div>
        </section>
        <div className="container">
          <div className="case-hero-visual">
            {project.hero ? <figure className="case-image"><img src={`${basePath}${project.hero.src}`} alt={project.hero.alt} width="1440" height="1000" /><figcaption>{project.hero.caption}</figcaption></figure> : <Visual label="Hero visualization" />}
          </div>
          <div className="case-body">
            <nav className="case-index" aria-label="Case study sections">
              {["Problem", "Data", "Method", "Results", "Visuals", "Implementation"].map((item) => <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}
            </nav>
            <div>
              <section className="case-section" id="problem"><h2>Problem</h2><p>{project.problem}</p></section>
              <section className="case-section" id="data"><h2>Data</h2><p>{project.data}</p></section>
              <section className="case-section" id="method"><h2>Method</h2><p>{project.method}</p></section>
              <section className="case-section" id="results">
                <h2>Results</h2><p>{project.results}</p>
                {project.validation ? <div className="info-card"><h3>Validation and limits</h3><p>{project.validation}</p></div> : <div className="placeholder-box">RESULTS PLACEHOLDER<br />Add validated estimates, interpretation, and limitations here.</div>}
              </section>
              <section className="case-section" id="visuals">
                <h2>Visualizations</h2>
                {project.visuals ? project.visuals.map(image => <figure className="case-image" key={image.src}><img src={`${basePath}${image.src}`} alt={image.alt} width="1440" height="1000" loading="lazy" /><figcaption>{image.caption}</figcaption></figure>) : <div className="two-col"><div className="placeholder-box">DASHBOARD SCREENSHOT<br />Replace with a Power BI or static export image.</div><div className="placeholder-box">MODEL FIGURE<br />Replace with a final chart or map.</div></div>}
              </section>
              <section className="case-section" id="implementation">
                <h2>Technical implementation</h2><p>{project.implementation}</p>
                {project.demoUrl ? <div className="info-card"><h3>Explore the working application</h3><p>Build a package, inspect its sources and assumptions, and download its annual results.</p><a className="text-link" href={`${basePath}${project.demoUrl}`}>Open Finland Fiscal Lab ↗</a></div> : <div className="two-col"><div className="info-card"><h3>Repository</h3><p>The repository link will be added when this project is published.</p></div><div className="info-card"><h3>Live dashboard</h3><p>The dashboard link will be added when a final version is available.</p></div></div>}
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
