import { Footer, Header, SectionLabel, Tags } from "./components/site";

export default function Home() {
  return (
    <div className="site-shell">
      <Header />
      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <SectionLabel>Data &amp; business analytics</SectionLabel>
              <h1 className="display">Olli Järvinen<span className="hero-role">Building things that answer questions<br />with data and AI.</span></h1>
              <p className="lede">I’m an MSc graduate of economics and business administration from Aalto University, interested in data-driven decision-making, business analytics, and service operations.</p>
              <div className="hero-actions">
                <a className="button" href="#selected-work">Explore my work <span aria-hidden="true">↓</span></a>
                <a className="text-link" href="/about">More about me <span aria-hidden="true">↗</span></a>
              </div>
            </div>
            <aside className="portfolio-index" aria-label="Portfolio overview">
              <span className="index-heading">Inside this portfolio</span>
              <a href="/thesis"><span className="index-number">01</span><span>Research<strong>Teaching efficiency</strong></span><span aria-hidden="true">↗</span></a>
              <a href="/projects/helsinki-cycling-infrastructure-analysis"><span className="index-number">02</span><span>In progress<strong>Helsinki cycling</strong></span><span aria-hidden="true">↗</span></a>
              <a href="/education"><span className="index-number">03</span><span>Background<strong>Aalto University</strong></span><span aria-hidden="true">↗</span></a>
            </aside>
          </div>
        </section>
        <section className="section selected-section" id="selected-work">
          <div className="container">
            <div className="section-heading"><h2 className="section-title">Selected work<span className="title-dot">.</span></h2><a className="text-link" href="/projects">Project index ↗</a></div>
            <article className="featured-study">
              <div className="study-diagram" aria-label="Thesis model: resources support students, who progress to graduates">
                <div className="diagram-caption">A two-stage view of teaching</div>
                <div className="diagram-flow"><span>Resources</span><span className="diagram-arrow" aria-hidden="true">↓</span><span className="diagram-students">Students</span><span className="diagram-arrow" aria-hidden="true">↓</span><span>Graduates</span></div>
                <div className="diagram-foot">Capacity → completion</div>
              </div>
              <div className="study-copy">
                <SectionLabel>01 / Master’s thesis · 2026</SectionLabel>
                <h3><a href="/thesis">What makes university teaching efficient?</a></h3>
                <p>Benchmarking Aalto University School of Business by separating how resources support students from how students progress to graduation.</p>
                <Tags items={["Python", "R", "DEA", "Service operations"]} />
                <a className="row-link" href="/thesis">Explore the research</a>
              </div>
            </article>
            <article className="project-strip">
              <div className="strip-label"><span className="index-number">02</span><span className="project-status">In progress</span></div>
              <div><h3><a href="/projects/helsinki-cycling-infrastructure-analysis">Helsinki cycling infrastructure</a></h3><p>An analysis concept exploring infrastructure investment and cycling volumes using open data.</p></div>
              <a className="row-link" href="/projects/helsinki-cycling-infrastructure-analysis">View the project</a>
            </article>
            <div className="home-note"><span>My approach</span><p>Start with the business question. Build reliable evidence. Make the result clear enough to use.</p></div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
