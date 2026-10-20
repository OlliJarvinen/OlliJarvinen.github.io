# Methodology

## 1. Scope and interpretation

The analysis covers all 2000–01 through 2024–25 NBA regular seasons, using the same 25-season sample for descriptions, leverage and primary regressions. Season integers denote starting years. The acquired 1999–2000 season is used only to initialise shooter histories, Elo and the first chronological win model; it is excluded from all displayed summaries and inferential fits. Playoffs, play-in games and the NBA Cup championship (which does not count toward regular-season statistics) are outside scope. Cup games that count as regular season are included.

This is an observational performance investigation. “Pressure” is an interpretation of game circumstances, not an observed psychological state. None of the make/miss contrasts identifies a causal effect of felt pressure. Intentional fouling, strategic final-shot misses, fatigue, injuries and unobserved selection can affect both circumstances and performance.

## 2. Source, ordering and score reconstruction

See `data/raw/manifest.json` for immutable archive URLs, commit and SHA-256 hashes. `scripts/acquire.py` downloads cached, commit-pinned NBA Stats play-by-play and shot-detail archives from shufinskiy/nba_data. Raw files are ignored in Git. Shot detail supplies dates and home/visitor abbreviations; NBA play-by-play supplies the FT event and player/team IDs.

Feed row order is retained. Event IDs are identifiers, not a reliable sorting key after corrections. Repeated identifiers with identical payloads are deduplicated. Conflicting duplicates quarantine the game. Scores in the NBA Stats feed are visitor–home **after** an event. Carry scores forward within game, initialise at 0–0, then shift by one event to get the pre-attempt score. Convert to the shooting team’s perspective: positive means leading. Never use the current made-FT score as the pre-shot margin.

For periods 1–4, seconds left in regulation = (4 − period) × 720 + period-clock seconds. In overtime, use the current five-minute period clock. This is a local horizon; future overtime periods are unknown. Overtime is separately indicated in models. All FT outcomes are parsed using the recorded MISS marker, and reconciled with score increments.

## 3. Exclusions and validation

Retain ordinary FT action codes 10–15 only, encoding 1-of-1, 1/2-of-2 and 1/2/3-of-3. Exclude technicals and other action codes. Also exclude ordinary attempts at a clock with descriptions mentioning flagrant, clear-path, away-from-play or transition-take fouls. This is conservative and may remove an ordinary set at the same clock as an unusual foul.

A sequence key is game × period × clock × shooter. Retain only complete sequences with one occurrence of each expected attempt number, a consistent total, and the exact 1, 2, 3 order. Ambiguous same-clock sets, replaced attempts and incomplete/out-of-order sets are excluded rather than guessed. Previous-attempt outcome is then shifted within a validated sequence.

Quarantine a whole game if a scoring event has an unexpected score increment, a score decreases, a conflicting identifier exists, or field-goal event counts disagree with shot detail. This sacrifices coverage to preserve score reliability and can introduce selection bias. Quarantine IDs and all exclusion counts appear in `outputs/validation.json`. Exclusion categories overlap and should not be summed as mutually exclusive counts.

Expected season game counts are 1,189 through 2003–04 and 1,230 from 2004–05 onward, except 2011–12 (990), 2012–13 (1,229), 2019–20 (1,059) and 2020–21 (1,080). The archive contains 1,056 of the expected 1,059 games in 2019–20: MIA at IND (0021901316), OKC at LAC (0021901317) and DEN at TOR (0021901318), all on 14 August 2020, are absent from play-by-play but present in shot detail. Of the 25 analysis seasons, 24 have complete archive game counts. Missing games are documented gaps, not imputed observations. Coverage claims refer to 30,021 of 30,024 expected analysis-period games; validated retention is lower after quarantine. The [Boston–Indiana game scheduled for 16 April 2013 was cancelled and never rescheduled](https://pr.nba.com/pacers-celtics-game-canceled/), so 2012–13 has 1,229 expected games and complete coverage. These gaps limit completeness; the 2019–20 gap may affect final bubble-game coverage. Validate duplicate attempt IDs, missing values, sequence ordering, binary outcomes and attempt totals. Cross-feed comparison uses two NBA-origin feeds and is not independent verification. External checks compare two SGA season totals with official Thunder media guides and both teams in one 2023 game with ESPN's independent boxscore. These spot checks do **not** establish league-wide official-statistic equality. The official historical CDN boxscore endpoint returned HTTP 403; no claim of full official boxscore reconciliation is made.

## 4. Shooter expectation available before the attempt

Shooter expectations use an experience-aware prior estimated from strictly earlier seasons. For players first observed after the dataset's initial 1999–2000 season, use their first 50 retained attempts to estimate an entry average. Only outcomes from completed earlier seasons enter that estimate. Stabilise the population entry average with 100 pseudo-attempts at 75%; use 75% when no entry history is available. Dataset entry is not verified rookie status.

Let N be a player's unweighted number of earlier retained attempts. The prior target is `entry_mean × exp(−N/50) + league_mean × (1−exp(−N/50))`. The league mean blends the previous season with current-season results from strictly earlier dates using 20,000 prior attempts. Before the first observed season, its fallback is 75%.

Player evidence decays continuously with a 365-day half-life. Before each game, `ability = (decayed_previous_makes + 25 × target)/(decayed_previous_attempts + 25)`. All attempts by the player in that game share the same expectation. Player totals update only after completed games. There is no January reset. Prior strengths of 10 and 50 attempts are sensitivity checks.

The fixed method was originally selected using modern seasons (2016–17 through 2022–23) and was carried into the full sample without retuning; final 2023–24/2024–25 audits have been inspected repeatedly and are not untouched validation. See `entry-baseline-comparison.md` for the fixed selection design and prior formula. This is a forecasting heuristic rather than an exact hierarchical posterior. Entry definitions, transition strength and partial pooling remain approximations; sparse shooter groups have wide intervals. Baseline uncertainty is not propagated through downstream intervals. Expected success is not an intent classifier.

Pregame team strength uses Elo, updated after completed retained games: K = 20, 60-point home increment, and 25% regression toward 1500 at calendar-year changes. The home increment is zero for the dated Orlando bubble. Elo begins equal, uses only retained games, and is a rough nuisance control rather than a betting-quality team rating.

## 5. Win probability and finite shot leverage

For each season from 2000–01, fit a logistic win model on FT observations from **earlier seasons only**. The label is whether the shooting team eventually won. Observations are weighted inversely by that game's FT count, so each training game has equal total weight.

Features describe the state immediately after a hypothetical current attempt:

- Shooting-team margin after that branch, divided by sqrt(seconds + c), for c = 5, 60 and 600; score coefficients are constrained nonnegative.
- Home status and pregame Elo difference, with their effects scaled by sqrt((seconds + 5) / 2885).
- Pending FT count × pregame shooter ability, divided by sqrt(seconds + c), for c = 5 and 120.
- A final-miss transition indicator divided by the same two time scales.
- Overtime indicator.

Training uses historically observed branch states. For a focal attempt, construct **both** branches from the same known pre-shot state: add one point for make, zero for miss, and reduce pending attempts by one in either branch. The final-miss indicator distinguishes the average missed-final-FT transition from the made-final-FT transition. With more shots pending, no final-miss indicator is activated. No realised next shot, rebound, final margin, realised outcome of the current attempt, future team record or current-game result is passed into the focal prediction.

`leverage = WP_make − WP_miss`.

This is a reduced-form, sequence-aware **approximation**, not an exact possession simulator. The final-miss term learns an average rebound/transition association from historical misses, conditional on available features. It does not explicitly model the rebounder, intentional-miss strategy, lineups, timeouts, bonus state or next possession. With shots pending, historical average future FT performance is represented through the ability feature. These limitations matter most at the very end of games; leverage uncertainty is not fully captured by outcome-model intervals. Conditioning on a hypothetical outcome does not turn an observational win model into an identified causal intervention model.

Validate pre-attempt win prediction using `ability × WP_make + (1 − ability) × WP_miss`. Report later-season, game-normalised Brier score, log loss and AUC. Attempt-weighted calibration bins are also exported. Record leverage range and negative estimates rather than silently clipping them. Negative values, if any, are excluded from the main leverage model and counted. These checks assess observed predictive calibration, not the correctness of individual counterfactual differences.

## 6. Free-throw models

Fit logistic models with an intercept, logit past-game shooter ability, home status, second/third attempt indicators, one-/three-shot set indicators, previous-make indicator, quarter indicators, overtime and a linear season trend. A two-shot first attempt is the sequence reference; the combination of attempt indicators and previous-make indicator separates previous misses from previous makes. Include a conventional clutch flag (period ≥ 4, ≤ 300 seconds, absolute pre-attempt margin ≤ 5).

The flexible specification adds a truncated-linear spline in log(1 + seconds) with knots at 15, 60, 120, 300, 720 and 1440 seconds, a clipped margin basis (±25, linear, absolute, quadratic, and absolute-margin hinges at five and ten points), selected time-by-margin tensor interactions, and final-15-second close/tied indicators. The leverage specification adds leverage per 0.10 win probability and interactions with shooter ability and home status. A small ridge penalty (1e-6 on non-intercept coefficients) stabilises correlated directions. The free-throw fit uses exact-Hessian Newton/IRLS with objective-decreasing steps. The primary estimands are predicted probabilities and marginal contrasts, not individual spline coefficients.

Leverage is largely determined by time and margin. A standalone leverage association does not demonstrate extra information. The incremental comparison therefore uses the same flexible controls with and without leverage. Remaining-shot state, shooter ability, home and Elo may account for what additional information leverage contains; a gain cannot be attributed purely to psychological pressure.

Broad clutch effects are average marginal contrasts from the coarse logistic model, setting the clutch indicator to 1 versus 0 while retaining the empirical control distribution. They are conditional associations; this coarse model deliberately does not add the detailed time–margin basis used for the incremental leverage test. The leverage coefficient is conditional on the flexible situation model and interacts with ability/home, so there is no universal pressure coefficient.

## 7. Evaluation, intervals and robustness

Fit free-throw models on analysis seasons from 2000–01 strictly before each of the two evaluation seasons, 2023–24 and 2024–25. Do not select a narrative from the test performance. Report probability log loss and Brier score; paired differences in attempt log loss compare situation-plus-leverage against the identical situation model. Negative difference favours leverage. The two evaluation years are separate chronological checks, not independent replications because training overlaps.

Descriptive residual intervals and paired-loss intervals use a two-way player + game − player×game sandwich for means. Regression uncertainty uses the analogous two-way score sandwich and a delta method for average marginal contrasts. Sequence dependence is covered within game clustering; cross-game player dependence is covered by player clustering. Finite-sample covariance estimates may have negative eigenvalues; regression covariance is projected to a positive semidefinite matrix and the original minimum eigenvalue is recorded. Mean-variance estimates are truncated at zero if negative. Wald intervals and sparse tail samples have limits.

All intervals **condition on the generated ability and leverage estimates**, do not propagate first-stage estimation uncertainty, and do not correct for multiple exploratory comparisons. Marginal contrasts and intervals are approximate with weak ridge regularisation. Read exploratory heatmap cells alongside sample sizes; avoid declaring a single cell a discovery based on its sign. Robustness checks alter shooter prior strength, restrict to final attempts, and fit a within-player-season linear probability model with the same coarse sequence/quarter/home controls. This last sensitivity uses full-season player means only for explanatory inference; it never supplies predictive features. Its two-way sandwich uses demeaned regressors. An exploratory tail check, prompted by the heatmap, separates shots with more attempts pending from final shots trailing by one or two. A sensitivity excludes final attempts while down exactly two with at most 15 seconds left, regardless of observed outcome. The feed does not identify intent; opportunity for a deliberate miss is not evidence that a particular miss was intentional. This check was selected after seeing the heatmap and should not be treated as preregistered. Season-specific clutch residuals are exported as exploratory context, without an attendance interpretation.

## 8. Presentation contract

The report reads `web/public/data/report.json`, exported from the analysis. Raw heatmap mode shows observed accuracy; baseline mode shows observed minus mean pre-game ability. Neither is a causal effect or the fully adjusted regression. All numbers, samples and intervals must come from the outputs, never hand-entered or synthetic observations. Real-attempt leverage examples are chosen by deterministic rules and use earlier-season win models. The report is static-hostable and requires no live API or Python backend.

## 9. What remains uncertain

Full official game-by-game reconciliation, explicit rebound/possession simulation, first-stage bootstrap uncertainty, broader temporal cross-validation, and selection effects from quarantined games remain useful further work. They limit the strength of conclusions; they do not justify inventing findings. Crowd and playoffs are intentionally outside this project's primary scope.

## Strategic misses and matched attempt-order comparisons

The heatmap and situation interval plot exclude final attempts in the last 15 seconds while trailing by at least two, irrespective of the shot outcome. Alternative 5-, 10- and 30-second screens are exported. This is an opportunity screen, not observed intent. The descriptive leverage bins now use this same screen, with excluded counts and Holm-adjusted baseline-gap tests across their five bins. Unfiltered bins remain in the downloadable JSON for auditing. Existing fitted regression and leverage models retain these opportunities and are labelled accordingly.

Sequence comparisons use matched complete trips, split by two or three attempts, excluding whole trips with a screened final attempt. The shooter and pregame expectation are identical across positions, so paired outcome differences also equal differences in residuals. Cluster intervals account for player and game dependence. Evolving score and within-trip events remain possible explanations; order associations are not causal warm-up estimates.


### Matrix margins and exploratory significance

The strategy-screened time–score matrix includes pooled summaries by time, by margin, and overall. These summaries weight individual attempts equally; confidence intervals are recomputed from attempt-level residuals with the same two-way player/game clustering, rather than averaging cell intervals. Two-sided normal Wald tests compare each baseline gap with zero. Holm step-down adjusted p-values control the family-wise error rate separately across the 42 displayed cells and the 14 pooled summaries. Stars denote adjusted p < 0.05 in both display modes and always refer to the baseline gap, not raw accuracy relative to the overall rate. Displayed 95% intervals remain pointwise and uncorrected. These tests condition on generated ability estimates and do not test differences between cells or identify causal pressure effects. Other exploratory report intervals remain uncorrected as described above.


### Pooled close-game comparison

The alternative below the matrix pools attempts into nine disjoint groups: trailing by 1–5, tied, and leading by 1–5; crossed with 0–60 seconds, more than 60 through 300 seconds, and more than 300 seconds. It retains the primary inference sample and the same strategic-opportunity screen. Overtime uses its current clock. Pooled statistics and two-way player/game clustered residual intervals are recomputed from individual attempts. Holm correction treats the nine baseline-gap tests as one family; displayed 95% intervals remain pointwise. Time-window averages pool all three score groups. Groups were chosen after inspecting the finer matrix, making this exploratory rather than a preregistered confirmation. These are baseline-gap tests, not direct tests of late-versus-earlier or trailing-versus-leading differences.


## Full-sample promotion

The 25-season sample replaces the earlier ten-season report throughout, including win-model fits, sequence comparisons, sensitivities and downloads. Model definitions, shooter-baseline hyperparameters, strategic screens and comparison families remain fixed. The two modern evaluation seasons remain chronological prediction checks, but have been inspected repeatedly and are not untouched holdouts. Earlier results and the earlier/recent comparison are preserved under `outputs/archive/recent_2015_2025/`, outside the public report. The expansion was motivated by earlier results and is not a preregistered replication.
