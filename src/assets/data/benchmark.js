// Benchmark results shown on /benchmark.
//
// Everything on the page is driven from this file — to update a number or add
// an entry, edit it here; BenchmarkView.vue needs no changes.
//
// Conventions
// - `auc` is the AUROC as a number (e.g. 0.91). Use `null` while unknown — the
//   page then shows "—" instead of a value.
// - Values show with at least two decimals, or as many as entered. To force
//   a fixed precision for a list (so 0.900 doesn't show as 0.90), set
//   `contributorsDecimals` / `decimals` on the block.
// - `ci` is the uncertainty as [lower, upper] (e.g. a 95% CI), or `null`.
//   `ciLabel` says what that interval is (shown as a small caption).
// - Author strings follow the site's paper convention: initials, then surname
//   ("A. Saha"). Use "et al." for long author lists.
//
// TODO: every entry marked `placeholder: true` still needs its real names and
// numbers (take them from the Grand Challenge leaderboards). The page shows a
// subtle "to be confirmed" badge on placeholders so they are easy to spot.

export const benchmark = {
  academic: [
    {
      id: "pi-cai-study",
      kind: "ensemble",
      title: "PI-CAI Study",
      description:
        "International, paired, non-inferiority, confirmatory study comparing an AI system with 62 radiologists using PI-RADS (2.1) on biparametric MRI.",
      paperId: "saha2024_lancet_oncology",
      // Numbers from Saha et al., Lancet Oncol 2024 (Results, p 884; Figure).
      system: {
        name: "PI-CAI AI system",
        detail: "Ensemble of the five top-ranked algorithms",
        cohort: "All 1,000 cases of the hidden testing cohort",
        auc: 0.93,
        ci: [0.91, 0.94],
        ciLabel: "95% CI",
      },
      // Secondary comparison on the subset read by the radiologists.
      readerStudy: {
        label: "Reader study · 400-case subset",
        rows: [
          { name: "PI-CAI AI system", auc: 0.91, ci: [0.87, 0.94] },
          {
            name: "62 radiologists (PI-RADS 2.1)",
            auc: 0.86,
            ci: [0.83, 0.89],
          },
        ],
      },
      // The five algorithms that make up the ensemble, in final ranking order.
      // Source: Closed Testing Phase - Final Ranking leaderboard (ranks 1, 4,
      // 5, 7 and 8; the other rows are later submissions and baselines):
      // https://pi-cai.grand-challenge.org/evaluation/closed-testing-phase-final-ranking/leaderboard/
      // Authors are as listed in each algorithm's leaderboard title.
      contributorsNote:
        "AUROC (95% CI) of each algorithm on the same 1,000 cases",
      contributorsDecimals: 3,
      contributors: [
        {
          team: "DataScientX",
          authors: "N. Debs, A. Routier, et al.",
          country: "France",
          auc: 0.934,
          ci: [0.918, 0.95],
        },
        {
          team: "BDAV_Y",
          authors: "Y. Yuan, et al.",
          country: "Australia",
          auc: 0.909,
          ci: [0.89, 0.928],
        },
        {
          team: "Swangeese",
          authors: "H. Kan, et al.",
          country: "China",
          auc: 0.904,
          ci: [0.884, 0.923],
        },
        {
          team: "PIMed-Stanford",
          authors: "X. Li, S. Vesal, S. Saunders, et al.",
          country: "USA",
          auc: 0.9,
          ci: [0.879, 0.919],
        },
        {
          team: "HeviAI",
          authors: "A. Karagoz, et al.",
          country: "Turkey",
          auc: 0.892,
          ci: [0.87, 0.913],
        },
      ],
    },
    {
      id: "post-study",
      kind: "list",
      title: "Post-Study Submissions",
      description:
        "AI systems submitted for masked evaluation on the same hidden testing data after the PI-CAI study.",
      decimals: 3,
      // Sources (Grand Challenge leaderboards):
      // - Closed Testing Phase - Final Ranking, rank 2 (best-ranked SCALE
      //   submission): .../evaluation/closed-testing-phase-final-ranking/leaderboard/
      // - Open Development Phase - Testing, ranks 1 and 2 (NTNU - PROPERMED):
      //   .../evaluation/challenge/leaderboard/
      // Authors from the SCALE paper (bosma2025_scale) and the NTNU
      // submissions' supporting documents.
      entries: [
        {
          name: "SCALE (supervised)",
          authors: "J. S. Bosma, L. Builtjes, et al.",
          note: "Closed testing phase",
          auc: 0.921,
          ci: [0.902, 0.938],
        },
        {
          name: "UMamba-ProSSL",
          authors: "S. F. Abbas, M. S. Larsen, et al.",
          note: "Open development phase",
          auc: 0.905,
          ci: [0.885, 0.924],
        },
        {
          name: "U-MambaMTL",
          authors: "M. S. Larsen, S. F. Abbas, et al.",
          note: "Open development phase",
          auc: 0.896,
          ci: [0.875, 0.916],
        },
      ],
    },
  ],

  industry: [
    {
      id: "siemens",
      kind: "list",
      title: "Siemens Healthineers",
      description:
        "Commercial AI systems evaluated under the same masked, standardised protocol.",
      decimals: 3,
      // Source: Open Development Phase - Testing leaderboard, team
      // "Siemens Healthineers Prostate AI" (.../evaluation/challenge/leaderboard/).
      entries: [
        {
          name: "Prostate AI Research",
          authors: null,
          note: "Open development phase · trained on an external private dataset",
          auc: 0.892,
          ci: [0.87, 0.913],
        },
      ],
    },
  ],
};
