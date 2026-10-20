# Findings — full 2000–2025 sample

## Scope and expectation

All displayed analyses cover 2000–01 through 2024–25: 1,332,428 eligible standard attempts, 29,236 retained games and 2,324 shooters. The 1999–2000 season supplies initialisation only. Win models are fitted on strictly earlier seasons. Shooter-baseline choices and model definitions were carried forward without retuning.

Observed accuracy is 76.04% versus 75.81% predicted: a residual of +0.23 pp (95% interval +0.13 to +0.33).

## Unfiltered descriptive situations

These residuals are observed minus pregame expectation and retain possible strategic misses. They are associations rather than causal pressure effects.

- Non-clutch: +0.29 pp (95% interval +0.18 to +0.39); 1,236,274 observations.
- Clutch: last 5 min, within 5: -0.52 pp (95% interval -0.81 to -0.24); 96,154 observations.
- Last 15 sec, within 2: -2.71 pp (95% interval -3.55 to -1.87); 9,859 observations.

## Strategic-opportunity-screened situations

Exclude final attempts in the last 15 seconds while trailing by at least two, removing makes and misses alike. The feed does not observe intent.

- Non-clutch: +0.29 pp (95% interval +0.18 to +0.39); 1,235,107 observations.
- Clutch: last 5 min, within 5: -0.35 pp (95% interval -0.64 to -0.06); 94,688 observations.
- Last 15 sec, within 2: -1.61 pp (95% interval -2.44 to -0.78); 9,245 observations.

## Adjusted unfiltered regression

Broad clutch contrast: -0.58 pp (95% interval -0.91 to -0.24). The model controls for shooter expectation, home status, sequence, previous result, quarter, overtime and a linear season trend. Strategic opportunities remain included.

## Later-season predictive leverage comparison

- 2023–24: leverage-minus-situation log loss -0.000019; 95% paired cluster interval -0.000034 to -0.000004.
- 2024–25: leverage-minus-situation log loss +0.000002; 95% paired cluster interval -0.000016 to +0.000021.

Negative favours leverage. Training uses analysis seasons strictly before each evaluation season. These repeatedly inspected years are chronological prediction checks, not untouched holdouts.

## Matched attempt order

Complete matched trips, excluding entire trips with a screened final attempt. The shooter and pregame expectation are identical across positions.

- 2-shot trips · 1 → 2: +4.65 pp (95% interval +4.47 to +4.83); 579,543 observations.
- 3-shot trips · 1 → 2: +4.97 pp (95% interval +4.11 to +5.83); 12,312 observations.
- 3-shot trips · 2 → 3: +1.31 pp (95% interval +0.46 to +2.16); 12,312 observations.
- 3-shot trips · Extra boost: (2 → 3) − (1 → 2): -3.66 pp (95% interval -5.08 to -2.25); 12,312 observations.

## Strategic-opportunity-screened leverage bins

- <1 pp: +0.24 pp (95% interval +0.08 to +0.40); 345,888 observations.
- 1–2.5 pp: +0.06 pp (95% interval -0.09 to +0.21); 405,918 observations.
- 2.5–5 pp: +0.47 pp (95% interval +0.33 to +0.62); 476,914 observations.
- 5–10 pp: +0.01 pp (95% interval -0.29 to +0.31); 81,745 observations.
- 10+ pp: -0.70 pp (95% interval -1.32 to -0.08); 19,330 observations.

Pointwise intervals condition on forecasts. Holm correction across the five baseline-gap tests is supplied in the report JSON; a pointwise interval excluding zero need not pass correction.

## Limits

Dataset entry is not verified rookie status. Small average residuals can conceal subgroup errors. Player/game clustering does not propagate all shooter-forecast and win-model uncertainty. The full-period expansion was motivated by earlier results and is exploratory. Score-feed exclusions can affect representativeness. Sequence, situation and leverage associations do not establish causal pressure effects. Earlier results are archived locally and are not displayed in the report.

## Summary

Second attempts in complete two-shot trips are 4.65 percentage points more accurate than first attempts within the same trips. Attempt order therefore matters when comparing game situations.

After screening plausible strategic misses, accuracy in the last 15 seconds within two points remains 1.61 percentage points below shooter expectation (95% interval -2.44 to -0.78). The adjusted broad clutch association is -0.58 pp. These are different comparisons, both indicating a modest shortfall.

Adding win leverage to shooter, sequence and flexible clock/score controls has mixed results across the two evaluation seasons; a consistent predictive gain is not established.

The remaining late-game deficit is consistent with a pressure effect, but these observational data cannot separate pressure from fatigue, strategy and shooter selection. They do not establish that pressure causes the shortfall.
