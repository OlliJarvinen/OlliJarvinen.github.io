import { Footer, Header, SectionLabel } from "../components/site";

export default function AboutPage() {
  return (
    <div className="site-shell">
      <Header current="about" />
      <main>
        <section className="page-hero">
          <div className="container">
            <SectionLabel>Profile / about</SectionLabel>
            <h1>About</h1>
            <p className="lede">
              Business analytics, data, and service operations—with a focus on
              making complex questions easier to act on.
            </p>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="profile-grid">
              <h2>Turning business questions into useful evidence.</h2>
              <div>
                <p>
                  I’m Olli, a newly graduated MSc from Aalto University School
                  of Business with a focus on business analytics. I’m interested
                  in the point where data work becomes a better way to see a
                  business, a service, or an operational choice.
                </p>
                <p>
                  My work combines analytical methods with business context:
                  defining the problem, building a reliable view of the data,
                  and communicating what the analysis can — and cannot —
                  support.
                </p>
                <p>
                  I’m exploring data, BI, analytics, and related business roles
                  where curiosity, structure, and clear thinking are valued.
                </p>
                <div className="work-meta">
                  <span className="tag">Business analytics</span>
                  <span className="tag">BI &amp; reporting</span>
                  <span className="tag">Service operations</span>
                  <span className="tag">Data storytelling</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
