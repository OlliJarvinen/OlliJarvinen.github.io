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
  hero?: {src: string; alt: string; caption: string};
  visuals?: {src: string; alt: string; caption: string}[];
  validation?: string;
};
export const projects: Project[] = [{
  slug: "helsinki-cycling-infrastructure-analysis",
  number: "01",
  title: "Helsinki Cycling Infrastructure Analysis",
  question:
    "Are cycling infrastructure investments associated with increased cycling volumes in Helsinki?",
  summary:
    "A reproducible analysis concept for combining infrastructure investment data with cycling counts, with a clear path from exploratory work to a decision-ready dashboard.",
  methods: ["Python", "pandas", "SQL", "Power BI", "statistical modelling"],
  problem:
    "Cities need to understand whether infrastructure investments are reaching the outcomes they are intended to support. This project frames the question around Helsinki and keeps the causal claim deliberately modest: association first, explanation second.",
  data:
    "Placeholder for the final data inventory: cycling counter observations, infrastructure project locations and dates, municipal open data, weather controls, and any spatial or seasonal harmonisation decisions.",
  method:
    "Placeholder for the analysis plan. The intended workflow includes data cleaning in Python, a queryable SQL layer, exploratory time-series and spatial comparisons, and a statistical model that makes assumptions visible.",
  results:
    "Results placeholder — insert validated findings, uncertainty ranges, and any limitations after the analysis is complete. No substantive findings are claimed on this portfolio page yet.",
  implementation:
    "The final project can be organised as a notebook for exploration, a small Python pipeline for repeatable transformations, a SQL data model for analysis-ready tables, and a Power BI report for communicating the result.",
}, {
  slug: 'finland-fiscal-lab',
  number: '02',
  title: 'Finland Fiscal Lab',
  question: 'How do policy choices and economic assumptions change Finland’s deficit and public-debt trajectory?',
  summary: 'A bilingual public-finance explorer and interactive fiscal-policy simulator combining official Finnish and European data with transparent assumptions and source-backed policy scenarios.',
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
