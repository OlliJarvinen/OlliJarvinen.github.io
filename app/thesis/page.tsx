import Image from "next/image";
import { Footer, PageIntro, Tags } from "../components/site";

const sections = [
  ["contribution", "My contribution"],
  ["framework", "Two-stage model"],
  ["data-method", "Data & method"],
  ["findings", "Key findings"],
  ["productivity", "Productivity over time"],
  ["implications", "Decision support"],
  ["documents", "Full thesis"],
];

function ThesisFigure({ src, alt, width, height, children }: {
  src: string;
  alt: string;
  width: number;
  height: number;
  children: React.ReactNode;
}) {
  return (
    <figure className="thesis-figure">
      <a href={src} aria-label="Open thesis figure at full size">
        <Image src={src} alt={alt} width={width} height={height} />
      </a>
      <figcaption>{children} <a href={src}>View full size ↗</a></figcaption>
    </figure>
  );
}

export default function ThesisPage() {
  return (
    <div className="site-shell thesis-page">
      <PageIntro
        label="Master’s thesis / Aalto University / 2026"
        title="Benchmarking teaching efficiency at Aalto BIZ"
        current="thesis"
      >
        I combined service operations theory with European university data to
        distinguish two questions: how efficiently resources support students,
        and how efficiently those students progress to graduation.
      </PageIntro>
      <main className="section">
        <div className="container">
          <div className="case-body">
            <nav className="case-index" aria-label="Thesis sections">
              {sections.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
            </nav>
            <div>
              <section className="case-section" id="contribution">
                <h2>My contribution</h2>
                <p>
                  Conducted as part of Aalto University School of Business’s
                  work to understand resource efficiency, my thesis connects
                  the design of a teaching-efficiency measure to the decisions
                  it can support.
                </p>
                <ol className="thesis-contributions">
                  <li><h3>Developed the conceptual framework</h3><p>
                    I synthesised service operations literature into a taxonomy
                    based on how customers participate in production. Applied to
                    education, it explains why students are customers, suppliers
                    of effort and knowledge, and the people transformed by learning.
                  </p></li>
                  <li><h3>Built and tested the empirical analysis</h3><p>
                    I prepared the data in Python and estimated two-stage DEA
                    models in R, with bootstrap bias correction, peer comparisons,
                    sensitivity checks, and productivity decomposition.
                  </p></li>
                  <li><h3>Translated results into operational priorities</h3><p>
                    I identified the contrast between strong capacity efficiency
                    and weaker completion, focusing attention on master’s
                    progression and the support needed as intake expands.
                  </p></li>
                </ol>
                <Tags items={["Python", "R / deaR", "DEA", "Bootstrap", "Malmquist index", "Service operations"]} />
                <details className="thesis-details">
                  <summary>Explore the service operations framework</summary>
                  <ThesisFigure
                    src="/images/thesis/service-operations-taxonomy.png"
                    alt="Service taxonomy moving from customer-selected to customer-supplied and customer-defined production, with increasing participation and decreasing standardisation potential."
                    width={1230} height={464}
                  >
                    Thesis Figure 1. My synthesis of service operations literature:
                    the mode of customer participation shapes efficiency potential
                    and quality evaluation.
                  </ThesisFigure>
                </details>
              </section>

              <section className="case-section" id="framework">
                <h2>Two stages reveal different strengths</h2>
                <p>
                  Rather than treating students only as an output, I modelled
                  enrolled students as the link between resources and degrees.
                  The contribution is the service-theory explanation for this
                  modelling choice and its application to Aalto BIZ benchmarking.
                </p>
                <div className="framework">
                  <div className="framework-step">
                    <small>01 / CAPACITY EFFICIENCY</small>
                    <strong>Resources → students</strong>
                    <p>Staff FTE and PPP-adjusted non-staff spending → enrolled bachelor’s,
                      master’s, and doctoral students. Input-oriented DEA.</p>
                  </div>
                  <div className="framework-step">
                    <small>02 / COMPLETION EFFICIENCY</small>
                    <strong>Students → graduates</strong>
                    <p>Enrolled students → graduates at the same three degree
                      levels. Output-oriented DEA.</p>
                  </div>
                </div>
                <p className="thesis-note">
                  Both stages use variable returns to scale. Overall efficiency
                  is their geometric mean. Student counts measure enrolled stocks,
                  so longer study times can raise capacity scores while lowering completion scores.
                </p>
              </section>

              <section className="case-section" id="data-method">
                <h2>Data &amp; method</h2>
                <p>
                  I combined European Tertiary Education Register (ETER) data
                  with internal Aalto BIZ data, grouping institutions into four
                  disciplinary clusters. Pure business schools and three groups of increasingly broader and more heterogeneous peers. 
                  Nordic business schools provide particularly
                  relevant peers for Aalto BIZ.
                </p>
                <div className="two-col">
                  <div className="info-card"><h3>Comparable time windows</h3><p>
                    Resources and students averaged over 2015–2019; graduates
                    over 2017–2021. A two-year lag approximates the time needed
                    to produce degrees.
                  </p></div>
                  <div className="info-card"><h3>Robustness checks</h3><p>
                    1,000 bootstrap draws per stage; alternative lags of 0–3
                    years, input specifications, peer groups, and a one-stage model.
                    The main interpretation remained consistent.
                  </p></div>
                </div>
              </section>

              <section className="case-section" id="findings">
                <h2>Strong capacity. Weaker completion.</h2>
                <p>
                  Aalto BIZ ranked at the 82nd percentile in overall efficiency
                  across the full sample, but was close to the median of specialised
                  business schools. Its strong enrolment relative to resources
                  was offset by lower graduate throughput.
                </p>
                <div className="metric-grid" aria-label="Aalto BIZ bias-corrected efficiency scores">
                  <div className="metric"><strong>0.87</strong><span>Capacity efficiency</span></div>
                  <div className="metric"><strong>0.62</strong><span>Completion efficiency</span></div>
                  <div className="metric"><strong>0.73</strong><span>Overall · business-school median 0.74</span></div>
                </div>
                <p className="thesis-note">Source: <a href="/documents/olli-jarvinen-thesis.pdf#page=55">thesis Table 4</a>. Relative, bias-corrected scores on a 0–1 scale; higher is closer to the estimated frontier.</p>
                <ThesisFigure
                  src="/images/thesis/capacity-completion-efficiency.png"
                  alt="Bias-corrected efficiency scatterplot across four institutional groups. Aalto BIZ has capacity efficiency 0.87 and completion efficiency 0.62, above the sample capacity median and below its completion median."
                  width={1871} height={1143}
                >
                  Thesis Figure 5. Separating the stages makes Aalto BIZ’s
                  uneven efficiency profile visible.
                </ThesisFigure>
                <p>
                  The master’s graduate-to-enrolled-student ratio was 26.3%,
                  compared with 38.2% at Copenhagen Business School, 45.9% at
                  Stockholm School of Economics, and 52.3% at the Norwegian School
                  of Economics. 
                  Aalto BIZ is resource efficient in student intake, but its students, particularly in master's programmes, take longer to graduate than peers.
                </p>
                <p className="thesis-note">Source: <a href="/documents/olli-jarvinen-thesis.pdf#page=59">thesis Table 5</a>. Aggregate data cannot separate delayed completion from dropout.</p>
              </section>

              <section className="case-section" id="productivity">
                <h2>Did performance improve over time?</h2>
                <p>
                  I used the Malmquist index to distinguish Aalto BIZ’s own
                  productivity development from changes in its peers. Over
                  input years 2011–2020, gains were concentrated in capacity;
                  completion productivity was broadly unchanged. 
                  This compares favorably to other business schools, which saw declining capacity and modestly improving completion while in the full sample, both productivity measures fell.
                </p>
                <div className="thesis-table-wrap">
                  <table className="thesis-table">
                    <caption>Average annual productivity change · <a href="/documents/olli-jarvinen-thesis.pdf#page=64">thesis Table 6</a></caption>
                    <thead><tr><th scope="col">Group</th><th scope="col">Capacity</th><th scope="col">Completion</th></tr></thead>
                    <tbody>
                      <tr><th scope="row">Aalto BIZ</th><td>+2.24%</td><td>+0.06%</td></tr>
                      <tr><th scope="row">Business schools</th><td>−1.90%</td><td>+0.89%</td></tr>
                      <tr><th scope="row">Full sample</th><td>−1.66%</td><td>−0.63%</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="thesis-note">Calculated as (geometric-mean MPI − 1) × 100. Each input year is paired with graduates two years later.</p>
                <ThesisFigure
                  src="/images/thesis/productivity-ratios.png"
                  alt="Aalto BIZ productivity ratios relative to 2011. Graduates per total spending fall initially, then recover to approximately 20 percent above baseline by input year 2022."
                  width={831} height={491}
                >
                  Thesis Figure 9. The extended Aalto BIZ series shows graduates
                  per spending approximately 20% above the 2011 baseline by input
                  year 2022, using 2024 graduation outcomes.
                </ThesisFigure>
                <p className="thesis-note">
                  These descriptive ratios complement DEA; they do not use its optimised weights across degree levels.
                  They show the results of Aalto BIZ's productivity growth over time where the number of graduates per total spending improved ~20% between 2011 and 2022.
                </p>
              </section>

              <section className="case-section" id="implications">
                <h2>From data analysis to decision support</h2>
                <p>
                  My recommendations focus on master’s progression and thesis
                  supervision, planning intake alongside downstream completion
                  capacity, and monitoring capacity, progression, completion,
                  and educational quality together.
                </p>
                <div className="info-card"><h3>What the analysis can tell us</h3><p>
                  The model does not directly measure learning quality or overall managerial
                  performance. It shows where Aalto BIZ is relatively strong and where it is weaker, and how its strengths, weaknesses, and overall performance have changed over time.
                </p></div>
              </section>

              <section className="case-section" id="documents">
                <h2>Full thesis</h2>
                <p>
                  <cite>A Service Operations Perspective on Educational Efficiency:
                    Benchmarking Aalto University School of Business</cite>
                </p>
                <p className="thesis-note">Olli Järvinen · Information and Service Management · Aalto University School of Business · 2026</p>
                <div className="doc-row">
                  <span>Master’s thesis</span><small>PDF · 92 pages</small>
                  <a className="row-link" href="/documents/olli-jarvinen-thesis.pdf">Open PDF</a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
