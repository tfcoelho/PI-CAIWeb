// Benchmark results shown on /benchmark.
//
// Everything on the page is driven from this file — to update a number or add
// an entry, edit it here; BenchmarkView.vue needs no changes.
//
// Every box is a table with the two analyses in `columns` side by side:
// the full 1,000-case testing cohort and the 400-case reader study against
// radiologists. A row gives a score per column under that column's `key`
// (`testing` / `reader`); leave one out and the page shows "—" (not
// evaluated) in that cell.
//
// Conventions
// - A score is `{ auc, ci }`: the AUROC as a number (e.g. 0.91) and its 95%
//   CI as [lower, upper] (or leave `ci` out).
// - Values show with at least two decimals, or as many as entered. To force a
//   fixed precision (so 0.900 doesn't show as 0.90), set `decimals` on the
//   block or row, or `membersDecimals` on a row with `members`.
// - `members` lists what a system is made of (e.g. an ensemble's algorithms);
//   they show indented under it.
// - `pending: true` shows "Pending" in both columns, for evaluations in progress.
// - Rows show in the order given here: keep them sorted by AUROC.
// - Author strings follow the site's paper convention: initials, then surname
//   ("A. Saha"). Use "et al." for long author lists.

export const columns = [
  { key: "testing", title: "1,000 cases", subtitle: "Standalone AI" },
  {
    key: "reader",
    title: "400 cases",
    subtitle: "Reader study",
    // `marker` is added to the column header; `note` explains it under
    // every table.
    marker: "*",
    note: "The 400 reader-study cases are a subset of the 1,000 testing cases.",
  },
];

// Notes shown under every table; a block's own `footnote` follows them.
export const tableNotes = ["AUROC with 95% CI."];

export const benchmark = {
  academic: [
    {
      id: "pi-cai-study",
      title: "PI-CAI Study",
      description:
        "International, paired, non-inferiority, confirmatory study comparing an AI system with 62 radiologists using PI-RADS on biparametric MRI.",
      paperId: "saha2024_lancet_oncology",
      // Numbers from Saha et al., Lancet Oncol 2024 (Results, p 884; Figure):
      // AI system on all 1,000 testing cases, and AI system vs the 62
      // radiologists on the 400-case reader-study subset.
      rows: [
        {
          name: "PI-CAI AI system",
          detail: "Ensemble of the five top-ranked algorithms",
          testing: { auc: 0.93, ci: [0.91, 0.94] },
          reader: { auc: 0.91, ci: [0.87, 0.94] },
          // The five algorithms that make up the ensemble, in final ranking
          // order, each on the same 1,000 cases. Source: Closed Testing Phase -
          // Final Ranking leaderboard (ranks 1, 4, 5, 7 and 8; the other rows
          // are later submissions and baselines):
          // https://pi-cai.grand-challenge.org/evaluation/closed-testing-phase-final-ranking/leaderboard/
          // Authors are as listed in each algorithm's leaderboard title.
          membersLabel: "Ensemble members",
          membersDecimals: 3,
          members: [
            {
              team: "DataScientX",
              name: "N. Debs, A. Routier, et al.",
              country: "France",
              testing: { auc: 0.934, ci: [0.918, 0.95] },
            },
            {
              team: "BDAV_Y",
              name: "Y. Yuan, et al.",
              country: "Australia",
              testing: { auc: 0.909, ci: [0.89, 0.928] },
            },
            {
              team: "Swangeese",
              name: "H. Kan, et al.",
              country: "China",
              testing: { auc: 0.904, ci: [0.884, 0.923] },
            },
            {
              team: "PIMed-Stanford",
              name: "X. Li, S. Vesal, S. Saunders, et al.",
              country: "USA",
              testing: { auc: 0.9, ci: [0.879, 0.919] },
            },
            {
              team: "HeviAI",
              name: "A. Karagoz, et al.",
              country: "Turkey",
              testing: { auc: 0.892, ci: [0.87, 0.913] },
            },
          ],
        },
        {
          name: "62 radiologists",
          detail:
            "Using PI-RADS · median 7 (IQR 5–10) years of experience in reading prostate MRI · 45 centres in 20 countries",
          reader: { auc: 0.86, ci: [0.83, 0.89] },
        },
      ],
    },
    {
      id: "post-study",
      title: "Post-Study Submissions",
      decimals: 3,
      footnote:
        "— Post-study submissions were not submitted for the reader study.",
      // Sources (Grand Challenge leaderboards):
      // - Closed Testing Phase - Final Ranking, rank 2 (best-ranked SCALE
      //   submission): .../evaluation/closed-testing-phase-final-ranking/leaderboard/
      // - Open Development Phase - Testing, ranks 1 and 2 (NTNU - PROPERMED):
      //   .../evaluation/challenge/leaderboard/
      // Authors from the SCALE paper (bosma2025_scale) and the NTNU
      // submissions' supporting documents.
      rows: [
        {
          name: "SCALE (supervised)",
          authors: "J. S. Bosma, L. Builtjes, et al.",
          testing: { auc: 0.921, ci: [0.902, 0.938] },
        },
        {
          name: "UMamba-ProSSL",
          authors: "S. F. Abbas, M. S. Larsen, et al.",
          testing: { auc: 0.905, ci: [0.885, 0.924] },
        },
        {
          name: "U-MambaMTL",
          authors: "M. S. Larsen, S. F. Abbas, et al.",
          testing: { auc: 0.896, ci: [0.875, 0.916] },
        },
      ],
    },
  ],

  industry: [
    {
      id: "siemens",
      title: "Siemens Healthineers",
      description:
        "Commercial AI systems evaluated under the same masked, standardised protocol.",
      // A dedicated submission is being evaluated on both the 1,000 cases and
      // the reader study. Replace `pending` with its scores once known.
      rows: [
        {
          name: "AI system",
          detail: "Dedicated submission under evaluation",
          pending: true,
        },
      ],
    },
  ],
};
