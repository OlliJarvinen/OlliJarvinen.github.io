import { Footer, Header, SectionLabel } from "../components/site";

export default function CvPage() {
  return (
    <div className="site-shell">
      <Header current="cv" />
      <main>
        <section className="page-hero">
          <div className="container">
            <SectionLabel>Profile / one-page summary</SectionLabel>
            <h1>CV</h1>
            <p className="lede">
              A compact overview of experience, education, skills, and contact
              details.
            </p>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="cv-card">
              <div className="cv-preview" aria-label="CV preview">
                <strong>Olli Järvinen</strong>
                <div className="cv-lines" aria-hidden="true">
                  {Array.from({ length: 10 }).map((_, i) => <span key={i} />)}
                </div>
                <div
                  className="placeholder-box"
                  style={{ marginTop: 40, minHeight: 120 }}
                >
                  CV CONTENT<br />Add the final PDF when ready.
                </div>
              </div>
              <div className="cv-info">
                <h2>Data &amp; business analytics</h2>
                <p>
                  Newly graduated MSc candidate for data, BI, analytics, and
                  related business roles.
                </p>
                <p>
                  Contact details and a downloadable CV will live here once the
                  final document is added.
                </p>
                <a className="button" href="/about">
                  Read the profile <span>↗</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
