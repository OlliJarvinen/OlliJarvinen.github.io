# Stage 1 — feasibility gate (16 October 2026)

**Passed before full extraction.** The three first games in the 2023–24 NBA Stats archive contain 133 recorded free throws, including seven nonstandard attempts. All 126 ordinary attempts form complete sequences, have game dates, and reconcile with the scoreboard deltas. Field-goal event counts agree with the separately archived NBA shot-detail feed in all three games. See `outputs/validation_sample.json`.

## Source decision

Selected: [shufinskiy/nba_data](https://github.com/shufinskiy/nba_data), NBA Stats play-by-play (`nbastats`) and shot chart detail (`shotdetail`) archives. Both feeds originate from NBA Stats, so their agreement is a cross-feed consistency check, not an independent accuracy guarantee. Archived season files are more reproducible than thousands of rate-limited API calls. The downloader pins the repository commit, caches archives and records SHA-256 hashes. Season labels use **starting year**, e.g. 2023 is 2023–24.

Alternatives considered: `nba_api` (official statistics endpoints, but historical bulk extraction is rate limited); SportsDataverse/hoopR (accessible ESPN-derived season files, but requires a different event schema and source reconciliation). The chosen archive has explicit NBA action codes, individual player/team IDs and score snapshots.

## Feasible reconstruction

- Preserve feed row order. Event IDs can be revised; numeric sorting is not a safe event-order rule.
- Carry forward the post-event scoreboard within each game, then shift it one event to obtain the pre-event score. Start at 0–0.
- Standard FT action codes 10–15 encode one-, two- and three-attempt sequences.
- Home/away descriptions identify shooter side. Shot detail supplies dates and home/away team abbreviations.
- Validate all scoring deltas; quarantine games with corrections or inconsistent score changes rather than guess.

## Limitations and licensing

The repository is Apache-2.0 licensed; its software license does not establish unrestricted rights in NBA-owned underlying statistics. Raw NBA data are cached locally and excluded from Git. The report distributes derived aggregates and attribution. Recheck NBA data terms before public or commercial redistribution. No attendance analysis is planned: these feeds do not establish crowd presence, and 2020–21 was not uniformly spectator-free.

The sample archive includes three repeated event IDs across the entire season. Full processing will check whether their payloads conflict and log exclusions.
