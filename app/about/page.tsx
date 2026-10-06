import { Footer, Header, SectionLabel } from "../components/site";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="site-shell about-page">
      <Header current="about" />
      <main>
        <section className="page-hero about-hero">
          <div className="container about-hero-grid">
            <div className="about-intro">
              <SectionLabel>A little about me</SectionLabel>
              <h1>Hi, I’m Olli<span className="title-dot">.</span></h1>
              <p className="lede">
                I’m curious about how businesses work, and how data can help
                us understand them better.
              </p>
              <p className="about-intro-note">
                A recent Aalto school of business graduate in ISM, interested in
                understanding the world through the use of data and analytics.
                
              </p>
              <a className="text-link" href="/projects">Explore my work ↗</a>
            </div>
            <figure className="about-portrait">
              <div className="about-portrait-frame">
                <Image
                  src="/images/olli-jarvinen.jpg"
                  alt="Olli Järvinen holding his Aalto University graduation folder"
                  width={1050}
                  height={1400}
                  sizes="(max-width: 700px) 100vw, 360px"
                  priority
                  unoptimized
                />
              </div>
              
            </figure>
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
