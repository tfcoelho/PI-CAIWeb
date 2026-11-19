// Benchmark results shown on /benchmark.
//
// Everything on the page is driven from this file — to update a number or add
// an entry, edit it here; BenchmarkView.vue needs no changes.
//
// Conventions
// - `auc` is the AUROC as a number (e.g. 0.91). Use `null` while unknown — the
//   page then shows "—" instead of a value.
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
      cohort: "Hidden testing cohort · 400-case reader-study subset",
      paperId: "saha2024_lancet_oncology",
      system: {
        name: "PI-CAI AI system",
        detail: "Ensemble of the five top-ranked algorithms",
        auc: 0.91,
        ci: [0.87, 0.94],
        ciLabel: "95% CI",
      },
      reference: {
        name: "Radiologists (n = 62, PI-RADS 2.1)",
        auc: 0.86,
        ci: [0.83, 0.89],
        ciLabel: "95% CI",
      },
      // The five algorithms that make up the ensemble, in final ranking order.
      contributors: [
        { authors: "Team 1 authors", auc: null, placeholder: true },
        { authors: "Team 2 authors", auc: null, placeholder: true },
        { authors: "Team 3 authors", auc: null, placeholder: true },
        { authors: "Team 4 authors", auc: null, placeholder: true },
        { authors: "Team 5 authors", auc: null, placeholder: true },
      ],
    },
    {
      id: "post-study",
      kind: "list",
      title: "Post-Study Submissions",
      description:
        "AI systems submitted for masked evaluation on the same hidden testing data after the PI-CAI study.",
      entries: [
        {
          name: "Submission name",
          authors: "Author et al.",
          auc: null,
          placeholder: true,
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
      entries: [
        {
          name: "Product / algorithm name",
          authors: null,
          auc: null,
          placeholder: true,
        },
      ],
    },
  ],
};
