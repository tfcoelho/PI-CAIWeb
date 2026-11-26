// Benchmark results shown on the unlisted /benchmark-test-page: the working
// copy of benchmark.js (which drives the public /benchmark). Edit here first;
// when it's ready to go public, copy it over benchmark.js.
//
// Everything on the page is driven from this file — to update a number or add
// an entry, edit it here; BenchmarkView.vue needs no changes.
//
// Every box is a table with the two analyses in `columns` side by side:
// the full 1000-case testing cohort and the 400-case reader study against
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
// - `marker` (optional, "*") is added after a row's name; explain it in
//   one of the block's `footnotes` starting with the same sign.
// - `source` (optional) adds a small file icon after the authors, linking to
//   their write-up: `{ paper: "<id>" }` for a paper on our Research page, or
//   `{ href: "/docs/benchmark/<file>.pdf" }` for a method description kept in
//   public/docs/benchmark/.
//   Add `label` to name the link (shown on hover, unless `tooltip` gives
//   other hover text). On a box, `source` puts the icon after its title.
// - `links` (optional) lists further links, shown under the name, e.g.
//   `{ label: "Model", href: "<url>" }` for its Grand Challenge algorithm page
//   (or `{ label: "…", paper: "<id>" }` for a paper on our Research page).
// - `href` (optional) links a row's name, e.g. to the system's product page.
// - `logo` (optional) shows the developer's logo left of a row's name, e.g.
//   "/img/logos/<company>.svg" in public/img/logos/, with `company` as its
//   alt text.
// - Author strings follow the site's paper convention: initials, then surname
//   ("A. Saha"). Use "et al." for long author lists.

// The test page shows every AUROC and CI at two decimals (`decimals: 2` on
// each box), rounded half up from the values entered here.

export const columns = [
  { key: "testing", title: "1000 patients", subtitle: "Complete set" },
  {
    key: "reader",
    title: "400 patients",
    subtitle: "Reader study subset",
    // Optional: `marker` is added to the column header and `note` explains
    // it under every table.
  },
];

// Notes shown under every table, then the block's own `footnotes`, then the
// column `note`s (e.g. "* …").
export const tableNotes = ["AUROC with 95% CI."];

// The 62 radiologists of the PI-CAI reader study (Saha et al., Lancet Oncol
// 2024), shown as a reference row in more than one box.
const radiologists = {
  name: "62 radiologists",
  detail:
    "PI-RADS 2.1 · median 7 (IQR 5–10) years of experience in reading prostate MRI · 45 centres in 20 countries",
  decimals: 2,
  reader: { auc: 0.86, ci: [0.83, 0.89] },
};

export const benchmark = {
  academic: [
    {
      id: "pi-cai-study",
      title: "The PI-CAI Study",
      paperId: "saha2024_lancet_oncology",
      // File icon after the title, straight to the paper in Lancet Oncology.
      // Hovering it shows the study's description (no longer in the box).
      source: {
        href: "https://doi.org/10.1016/S1470-2045(24)00220-1",
        label: "Paper in Lancet Oncology",
        tooltip:
          "International, paired, non-inferiority, confirmatory study on biparametric MRI. The AI system was evaluated on a sequestered testing cohort of 1000 patients (33% csPCa prevalence), and compared head-to-head with 62 radiologists using PI-RADS on 400 of these patients.",
      },
      decimals: 2,
      // Training data: Saha et al., Lancet Oncol 2024 (Methods) — the five
      // algorithms were retrained at the coordinating centre on 9,107 cases
      // (7,607 sequestered + 1,500 public) before being ensembled.
      footnotes: [
        "* All algorithms were retrained on the same PI-CAI training data: 9,107 cases (7,607 private and 1,500 public).",
      ],
      // Numbers from Saha et al., Lancet Oncol 2024 (Results, p 884; Figure):
      // AI system on all 1000 testing cases, and AI system vs the 62
      // radiologists on the 400-case reader-study subset.
      rows: [
        {
          name: "PI-CAI-1 AI system",
          marker: "*",
          detail: "Ensemble of the five top-ranked algorithms",
          testing: { auc: 0.93, ci: [0.91, 0.94] },
          reader: { auc: 0.91, ci: [0.87, 0.94] },
          // The five algorithms that make up the ensemble, in final ranking
          // order, each on the same 1000 cases. Source: Closed Testing Phase -
          // Final Ranking leaderboard (ranks 1, 4, 5, 7 and 8; the other rows
          // are later submissions and baselines):
          // https://pi-cai.grand-challenge.org/evaluation/closed-testing-phase-final-ranking/leaderboard/
          // Authors are as listed in each algorithm's leaderboard title: all
          // first authors, then "et al.". DataScientX (Debs, Routier) and
          // PIMed-Stanford (Li, Vesal, Saunders) have shared first authors who
          // contributed equally, per their Grand Challenge algorithm pages.
          // Scores on the 400 reader-study patients, with 95% CIs: from a table
          // of computed scores shared on 25 Nov 2026, which also reproduces
          // the 1000-patient scores and CIs below. The AUROCs match
          // the supplementary appendix, Figure S7 (top left, ROC legend;
          // printed page 11), which gives no CIs. That legend gives the
          // ensemble 0.904 on these 400, where the main paper reports 0.91
          // (0.87–0.94).
          // https://ars.els-cdn.com/content/image/1-s2.0-S1470204524002201-mmc1.pdf
          // Each member's `institution`, `city` and `country` are its first
          // authors' affiliation, from the team's write-up in the same
          // appendix (section S4.4); shown under the authors. Its `logo` (from
          // Wikimedia Commons / Wikipedia) shows before them.
          membersLabel: "Ensemble members",
          membersDecimals: 2,
          members: [
            {
              team: "DataScientX",
              source: { href: "/docs/benchmark/datascientx.pdf" },
              name: "N. Debs, A. Routier, et al.",
              institution: "Guerbet Research",
              logo: "/img/logos/guerbet.png",
              // A bit larger than the usual 72px: it's a thin wordmark.
              logoWidth: 84,
              city: "Villepinte",
              country: "France",
              testing: { auc: 0.934, ci: [0.918, 0.95] },
              reader: { auc: 0.9089, ci: [0.8765, 0.9378] },
            },
            {
              team: "BDAV_Y",
              source: { href: "/docs/benchmark/bdav_y.pdf" },
              name: "Y. Yuan, et al.",
              institution: "The University of Sydney",
              logo: "/img/logos/university-of-sydney.svg",
              city: "Sydney",
              country: "Australia",
              testing: { auc: 0.909, ci: [0.89, 0.928] },
              reader: { auc: 0.8969, ci: [0.863, 0.9271] },
            },
            {
              team: "Swangeese",
              source: { href: "/docs/benchmark/swangeese.pdf" },
              name: "H. Kan, et al.",
              institution: "University of Science and Technology of China",
              logo: "/img/logos/ustc.svg",
              // The seal's own name is unreadable this small.
              logoText: { text: "USTC", color: "#1f3f8f" },
              city: "Hefei",
              country: "China",
              testing: { auc: 0.904, ci: [0.884, 0.923] },
              reader: { auc: 0.8847, ci: [0.8455, 0.9204] },
            },
            {
              team: "PIMed-Stanford",
              source: { href: "/docs/benchmark/pimed-stanford.pdf" },
              name: "C. X. Li, S. Vesal, S. Saunders, et al.",
              institution: "Stanford University",
              // Stanford Medicine logo (English Wikipedia). Wide, so it gets
              // the full logo slot.
              logo: "/img/logos/stanford-medicine.svg",
              logoWidth: 94,
              city: "Stanford",
              country: "United States",
              testing: { auc: 0.9, ci: [0.879, 0.919] },
              reader: { auc: 0.8756, ci: [0.8367, 0.912] },
            },
            {
              team: "HeviAI",
              // All eight authors contributed equally (per their report); the
              // first three in its author list, then "et al.".
              source: { href: "/docs/benchmark/heviai.pdf" },
              name: "A. Karagöz, M. E. Şeker, M. Yergin, et al.",
              institution: "Istanbul Technical University",
              logo: "/img/logos/istanbul-technical-university.svg",
              city: "Istanbul",
              country: "Turkey",
              testing: { auc: 0.892, ci: [0.87, 0.913] },
              reader: { auc: 0.8614, ci: [0.8186, 0.9006] },
            },
          ],
        },
        radiologists,
      ],
    },
    {
      id: "post-study",
      title: "Post-Study Submissions",
      decimals: 2,
      // `*` on every row: each developer chose their own training data.
      footnotes: [
        "* Training data is chosen by each model's developers, so it differs between submissions and from the PI-CAI study.",
      ],
      // Sources (Grand Challenge leaderboards):
      // - Closed Testing Phase - Testing (Final Ranking), position 3 (PI-CAI-2A:
      //   "SCALE algorithm for clinically significant prostate cancer
      //   detection", the final, semi-supervised SCALE; submitted 7 May 2025):
      //   .../evaluation/closed-testing-phase-final-ranking/leaderboard/
      // - Open Development Phase - Testing, ranks 1 and 2 (NTNU - PROPERMED):
      //   .../evaluation/challenge/leaderboard/
      // Scores on the 400 reader-study patients (`reader`): from the table of
      // computed scores shared on 25 Nov 2026 (400 cases, 133 positive),
      // which also reproduces the 1000-patient scores here. PI-CAI-2B's came
      // separately (see its row).
      // Authors from the SCALE paper (bosma2025_scale) and the NTNU
      // submissions' supporting documents.
      rows: [
        {
          name: "PI-CAI-2A",
          marker: "*",
          authors: "J. S. Bosma, L. Builtjes, et al.",
          source: { paper: "bosma2025_scale" },
          detail: "SCALE, semi-supervised",
          testing: { auc: 0.924, ci: [0.906, 0.94] },
          reader: { auc: 0.8928, ci: [0.8583, 0.9239] },
        },
        {
          // Scores of pi-cai-2b_mednext-3xl-b2, shared on 25 Nov 2026: 1000
          // patients (332 positive) and the 400 reader-study patients (133
          // positive). The 1000-patient score matches the SCARLET-1
          // manuscript's 0.92 (95% CI 0.90–0.94) in its primary internal
          // testing cohort. The file icon opens the SCARLET-1 paper on our
          // Research page.
          name: "PI-CAI-2B",
          marker: "*",
          authors: "A. Saha, J. S. Bosma, et al.",
          source: { paper: "saha2025_picai2_sd" },
          detail: "SCARLET-1 study",
          testing: { auc: 0.9189, ci: [0.9, 0.9359] },
          reader: { auc: 0.9, ci: [0.8662, 0.9299] },
        },
        {
          // Open Development Phase - Testing leaderboard, position 1 (NTNU,
          // submitted 25 Nov 2026): "ProZone: UMamba-based SSL pretraining on
          // unlabeled St. Olav's/ NTNU data, fine-tuned on PI-CAI data".
          // Authors and PDF from its supporting document.
          name: "ProZone",
          marker: "*",
          authors: "S. F. Abbas, M. S. Larsen, et al.",
          source: { href: "/docs/benchmark/prozone.pdf" },
          testing: { auc: 0.905, ci: [0.886, 0.924] },
          reader: { auc: 0.8772, ci: [0.8392, 0.9112] },
        },
        {
          name: "UMamba-ProSSL",
          marker: "*",
          authors: "S. F. Abbas, M. S. Larsen, et al.",
          source: { href: "/docs/benchmark/umamba-prossl.pdf" },
          testing: { auc: 0.905, ci: [0.885, 0.924] },
          reader: { auc: 0.8832, ci: [0.8471, 0.9157] },
        },
        {
          name: "U-MambaMTL",
          marker: "*",
          authors: "M. S. Larsen, S. F. Abbas, et al.",
          // MIDL 2025 full paper
          source: { href: "/docs/benchmark/u-mambamtl.pdf" },
          testing: { auc: 0.896, ci: [0.875, 0.916] },
          reader: { auc: 0.8655, ci: [0.8246, 0.9031] },
        },
        {
          // Open Development Phase - Testing leaderboard, position 4:
          // "E. Pooch et al.: nnUNet fully-supervised (trained with additional
          // manual annotations)".
          name: "nnUNet fully-supervised",
          marker: "*",
          authors: "E. Pooch, et al.",
          detail: "Trained with additional manual annotations",
          testing: { auc: 0.888, ci: [0.866, 0.908] },
          reader: { auc: 0.8621, ci: [0.8205, 0.8995] },
        },
      ],
    },
  ],

  certified: [
    {
      id: "certified",
      title: "Certified Submissions",
      description:
        "Certified AI systems evaluated under the same masked, standardised protocol as the PI-CAI study. Tested on the same 1000 patients as all other submissions.",
      decimals: 2,
      // Scores as reported for the dedicated submission: AUROC (95% CI) on
      // the full hidden testing cohort and on the reader-study subset.
      rows: [
        {
          // Scores match the public evaluation report (Twilt, Saha, et al.,
          // Zenodo, 26 Nov 2026); the file icon after the name opens its
          // entry on our Research page.
          name: "Prostate MR AI VA10A",
          company: "Siemens Healthineers",
          logo: "/img/logos/siemens-healthineers.svg",
          href: "https://www.siemens-healthineers.com/fr-lu/infrastructure-it/artificial-intelligence/ai-campaign/mr-prostate",
          source: { paper: "twilt2026_siemens_benchmark" },
          marker: "*",
          testing: { auc: 0.887, ci: [0.865, 0.909] },
          reader: { auc: 0.863, ci: [0.824, 0.9] },
        },
        radiologists,
      ],
      footnotes: ["* Training data is chosen by the model's developers."],
    },
  ],
};
