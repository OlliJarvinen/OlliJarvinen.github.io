export type Project = {
  slug: string;
  number: string;
  title: string;
  question: string;
  summary: string;
  methods: string[];
  problem: string;
  data: string;
  method: string;
  results: string;
  implementation: string;
  demoUrl?: string;
  demoLabel?: string;
  demoNote?: string;
  demoDescription?: string;
  hero?: {src: string; alt: string; caption: string};
  visuals?: {src: string; alt: string; caption: string}[];
  validation?: string;
};
export const projects: Project[] = [{
  slug: "nba-free-throws",
  number: "01",
  title: "When Are NBA Free Throws Hardest?",
  question: "How do shooter ability, attempt order and game situation relate to free-throw accuracy?",
  summary: "An interactive investigation of 1.33 million NBA free throws: attempt order, late-game accuracy and the predictive value of win leverage.",
  methods: ["Python", "statistical modelling", "React", "data visualization"],
  problem: "A missed free throw in a close game is easy to attribute to pressure. But shooters differ, later attempts can be easier, and late-game strategy affects which shots are taken. This project separates those comparisons before asking whether a shot’s impact on winning adds useful information.",
  data: "NBA Stats play-by-play and shot detail via shufinskiy/nba_data: 1,332,428 eligible standard attempts, 29,236 retained games and 2,324 shooters across 2000–01 through 2024–25. The 1999–2000 season initializes shooter histories and win models. Three expected archive games are missing in 2019–20; exclusions and source checks are documented in the report.",
  method: "A reproducible Python pipeline estimates shooter expectations using only information available before each game. Matched trips isolate attempt order; situation comparisons use player- and game-clustered uncertainty. Chronological win models estimate make-versus-miss leverage, and later-season prediction checks compare leverage with flexible clock and score controls. A strategic-opportunity screen removes final attempts in the last 15 seconds while trailing by at least two, regardless of outcome.",
  results: "Second attempts are 4.65 percentage points more accurate than first attempts within the same complete two-shot trips (95% interval: 4.47 to 4.83). After screening potential strategic misses, accuracy in the last 15 seconds within two points is 1.61 percentage points below shooter expectation (95% interval: −2.44 to −0.78). Adding win leverage produces mixed predictive results across 2023–24 and 2024–25, so a consistent gain is not established.",
  implementation: "React presents an interactive court explorer, time-and-score heatmap, sequence comparisons and downloadable research results. The static report runs entirely in the browser with precomputed public data. Python handles acquisition, engineering, estimation and validation; source hashes and reproduction instructions accompany the report.",
  validation: "The research verification records 22 passing automated tests covering temporal leakage, sample scope, sequence integrity, coverage and export consistency. These observational associations do not establish a causal pressure effect. Strategy, fatigue and shooter selection remain possible explanations; intervals condition on estimated shooter and win-model features, and the two evaluation seasons have been inspected repeatedly.",
  demoUrl: "/nba-free-throws/",
  demoLabel: "Open interactive report",
  demoNote: "25 seasons · 1.33 million attempts",
  demoDescription: "Explore real game situations, compare accuracy with shooter expectations, and download the results and methodology.",
  hero: { src: "/images/nba-free-throws/situations.svg", alt: "Accuracy relative to shooter expectation: non-clutch +0.29, clutch −0.35, and last 15 seconds within two points −1.61 percentage points, after the strategic-opportunity screen", caption: "Situation comparisons after screening potential strategic misses. Points show the observed-minus-expected gap; bars show 95% intervals accounting for player and game clustering." },
  visuals: [{ src: "/images/nba-free-throws/sequence.svg", alt: "Second attempts in complete two-shot trips are 4.65 percentage points more accurate than first attempts, with a 95% interval of 4.47 to 4.83", caption: "Matched two-shot trips hold the shooter and pregame expectation constant. This comparison measures attempt order and differs from the situation comparisons above." }],
}, {
  slug: 'finland-fiscal-lab',
  number: '02',
  title: 'Finland Fiscal Lab',
  question: 'How do policy choices and economic assumptions change Finland’s deficit and public-debt trajectory?',
  summary: 'Why closing Finland’s deficit takes more than a savings target: a data story about interest, debt and the trade-offs behind fiscal adjustment.',
  methods: ['Python', 'SQL', 'TypeScript', 'React', 'fiscal modelling', 'open data'],
  problem: 'Public-finance debate combines historical observations, forecasts and policy estimates that often use different years, scopes and assumptions. This project makes those distinctions visible and lets users explore the accounting consequences of alternative policy packages.',
  data: 'Preserved Statistics Finland accounts and debt observations, the Ministry of Finance Autumn 2026 forecast, a 2024 Eurostat comparison for 15 EU countries and two aggregates, and a structured policy evidence registry. Queries, dates, checksums and forecast workbook coordinates preserve provenance.',
  method: 'A reproducible Python preparation pipeline produces public data snapshots. An annual accounting model projects revenue, primary spending, interest and gross debt against either the dated official forecast or a frozen-2025 experiment. The browser implementation is compared directly with the Python reference model across 594 scenarios. Policy timing, overlaps, baseline inclusion and pension assets are handled explicitly.',
  results: 'The prototype reconstructs the normalized Ministry of Finance baseline through 2030 and lets users inspect five illustrative packages and a 45-record policy catalogue. It shows how interest, growth and retained pension assets change the link between fiscal adjustment and gross debt. Model outputs are exploratory accounting scenarios; gross savings and historical policy transfers are not validated net reform costings.',
  implementation: 'React and TypeScript provide bilingual charts, category histories, policy controls, proposal reports and CSV exports. All visitor calculations run in the browser using bundled public inputs, allowing static GitHub Pages hosting without a calculation server. Python remains the data preparation and validation reference.',  demoUrl: '/finland-fiscal-lab/',
  hero: {
    src: '/images/fiscal-lab/portfolio-overview.png',
    alt: 'Finnish-language Fiscal Lab overview with historical revenue and expenditure chart',
    caption: 'A guided overview connects official observations with the fiscal outlook. Available in English and Finnish.',
  },
  visuals: [{
    src: '/images/fiscal-lab/portfolio-packages.png',
    alt: 'Fiscal Lab package comparison with shared assumptions and protection controls',
    caption: 'Compare illustrative policy packages under the same baseline, then open and edit their measures.',
  }],
  validation: '31 Python tests and 27 frontend tests pass. Browser projections match the independent Python reference across 594 scenarios, including both baselines, policy controls and protected packages. These checks validate accounting and software behaviour; they do not establish the economic assumptions as causal forecasts.',
}];
export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
