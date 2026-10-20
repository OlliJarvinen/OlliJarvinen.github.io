# When Are NBA Free Throws Hardest?

A reproducible NBA research project and standalone interactive report. All displayed analyses cover 2000–01 through 2024–25: 1,332,428 eligible standard attempts across 29,236 retained games. The archives contain 30,021 of 30,024 expected analysis-period games; three games are missing in 2019–20. The 1999–2000 season is acquired only to initialise shooter histories, team ratings and the first chronological win model. The report investigates shooter-adjusted situation patterns and whether sequence-aware win leverage adds information beyond conventional time–score controls.

## Review locally

The generated analytical results are already included. You do **not** need to download raw data or rerun Python to view the report.

```sh
cd web
npm ci
npm run dev
```

Open **http://127.0.0.1:5173/**. To preview the production build:

```sh
npm run build
npm run preview
```

Vite prints the production-preview port (normally 4173). The build is a static directory at `web/dist/`. It contains the report, precomputed data, CSV downloads, methodology and source audit. There is no Python backend or live NBA request.

## Reproduce the research

Requirements: Python 3.12+, Node.js 22.13+ (or a supported newer Node), and enough disk space for 26 seasons of cached archives and processed data. Normal scientific-library wheels and internet access are required only for installation/acquisition. Use a separate environment:

```sh
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt

# Feasibility gate: three real games, before full extraction
.venv/bin/python scripts/acquire.py --years 2023
.venv/bin/python scripts/engineer.py --years 2023 --sample

# Full extraction: 1999–2000 initialisation plus 25 analysis seasons
.venv/bin/python scripts/acquire.py
.venv/bin/python scripts/engineer.py
.venv/bin/python -m scripts.validate_external
.venv/bin/python -m unittest discover -s tests -v

# Rolling-origin win models and FT analysis
OPENBLAS_NUM_THREADS=1 VECLIB_MAXIMUM_THREADS=1 .venv/bin/python scripts/enrich.py
OPENBLAS_NUM_THREADS=1 VECLIB_MAXIMUM_THREADS=1 .venv/bin/python scripts/analyze.py
OPENBLAS_NUM_THREADS=1 .venv/bin/python scripts/fixed_effects_check.py
OPENBLAS_NUM_THREADS=1 .venv/bin/python scripts/conditional_leverage.py
OPENBLAS_NUM_THREADS=1 .venv/bin/python scripts/tail_check.py
.venv/bin/python scripts/strategy_sequence_check.py
.venv/bin/python scripts/clutch_sequence_check.py
.venv/bin/python scripts/export_report.py

# Package the standalone report
cd web
npm ci
npm run build
```

`validate_external` reads cached ESPN data when available, otherwise retrieves one historical boxscore. Official media-guide reference totals are documented in its source and in `outputs/external_validation.json`. These are spot checks, not exhaustive reconciliation. A full analysis typically takes several minutes on a laptop; hardware and installed numerical libraries affect timing.

The committed manifest pins the upstream source commit and checksums. Cached files are checked on reruns, and downloads always use the pinned commit. To intentionally refresh upstream data, archive the old manifest and create a new research version; do not silently overwrite it. The downloader writes files atomically.

## Project layout

```text
data/raw/          Ignored season archives; tracked immutable manifest
data/processed/    Ignored attempt-level and enriched Parquet files
scripts/           Acquisition, engineering, validation, fitting, export
analysis/models.py Logistic estimators, feature design, clustered covariance
outputs/           Tracked results, diagnostics, validation and compact CSVs
docs/              Feasibility, research background, methodology, findings
tests/             Leakage, counterfactual-state and dataset-contract tests
web/               React + Vite static report and precomputed public assets
```

## Reading the analysis

- [Findings](docs/findings.md)
- [Methodology and limitations](docs/methodology.md)
- [Feasibility decision](docs/feasibility.md)
- [Research background](docs/research-background.md)
- [Delivery verification](docs/verification.md)
- [Validation audit](outputs/validation.json)
- [External reference checks](outputs/external_validation.json)
- [All displayed results](outputs/report.json)
- [Win-model diagnostics](outputs/win_model.json)

The raw heatmap, shooter-baseline residuals, adjusted regression contrasts and held-out model scores answer different questions and are labelled separately. Confidence intervals account for player and game dependence, conditional on generated features. They do not propagate all ability/win-model uncertainty or identify causal pressure effects. See the methodology for selection, sparse-tail and possession-model limitations.

## Portfolio integration — deliberately deferred

The existing portfolio at `/Users/olli/Desktop/portfolio` uses Next/React (via Vinext). This project uses React with no server dependence or routing assumption. The existing portfolio has not been edited.

After review, either serve the contents of `web/dist/` under `/projects/nba-free-throws/` with that trailing slash, or extract the React report into the portfolio's route and scope its CSS. Asset paths in the build are relative (`base: './'`), and the data fetch resolves against the document URL. A static subdirectory deployment must redirect the non-trailing-slash URL to the directory URL; otherwise relative assets resolve at the wrong level. Test anchors, research downloads and the data URL under the chosen route before publication. Google Fonts are optional: local serif/sans-serif fallbacks keep the page usable offline.

## Data provenance and rights

Source: [shufinskiy/nba_data](https://github.com/shufinskiy/nba_data), NBA Stats play-by-play plus shot detail. Upstream code is Apache-2.0 licensed; this does not establish unrestricted redistribution rights for NBA statistics. Raw data are not committed. Derived results retain attribution. Check NBA and archive terms before public/commercial redistribution. This project is independent and is not affiliated with the NBA.

No synthetic observations, invented findings or raw-data API calls are used by the report. SQL was not added because columnar Python processing already supports the single-table joins and summaries; a database would not improve this workflow.

## Archived earlier results

The former ten-season report, inputs and the earlier/recent/combined situation comparison were preserved before the full-sample promotion. Results, documentation and source snapshots live under `outputs/archive/recent_2015_2025/`; the matching attempt and enriched inputs live under ignored `data/processed/archive/recent_2015_2025/`. They are not packaged or linked in the public report. The production pipeline above uses the full 25-season sample; `scripts/historical_extension.py` is retained only as a legacy comparison utility.
