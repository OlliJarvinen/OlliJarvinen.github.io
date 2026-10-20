# Shooter-baseline selection

The production forecast uses an entry-to-league blend, a 365-day history half-life and 25 pseudo-attempts. It was selected using 2016–17 through 2020–21 for tuning and 2021–22 through 2022–23 for validation. The 2023–24 and 2024–25 audit seasons had already informed the investigation and are not untouched holdouts.

The same model choices are carried into 2000–01 through 2024–25 without retuning. Forecasts are recomputed sequentially from 1999–2000 onward using only completed earlier games. Players present in the first observed season are excluded from entry-prior estimation; later observed entrants are not necessarily NBA rookies. Entry averages use only completed earlier seasons.

For N previous retained attempts, the prior target is `entry_mean × exp(−N/50) + moving_league_mean × (1−exp(−N/50))`. Player evidence decays continuously. The forecast is `(decayed_makes + 25 × prior_target)/(decayed_attempts + 25)`. The moving league mean combines the previous season with earlier-date results using 20,000 prior attempts. Initial fallback is 75%; the entry mean is stabilised with 100 pseudo-attempts at 75%.

This forecasting heuristic is not an exact Bayesian posterior. Small average residuals do not guarantee calibration within every season or shooter group. Downstream intervals condition on forecasts and omit model-selection uncertainty. Superseded numerical baseline experiments are preserved in the local archive, outside the displayed report. See [methodology](methodology.md) for the full design.
