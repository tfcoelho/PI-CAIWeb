---
tags: PUBLISHED
order: 1
date: 2026-11-26
authors: J. J. Twilt, A. Saha, A. Bjartell, A. R. Padhani, D. Bonekamp, G. Villeirs, G. Salomon, G. Giannarini, J. Kalpathy-Cramer, J. Barentsz, K. H. Maier-Hein, M. Rusu, O. Rouvière, R. van den Bergh, V. Panebianco, V. Kasivisvanathan, N. A. Obuchowski, D. Yakar, M. Elschot, J. Veltman, I. G. Schoots, M. de Rooij, H. Huisman, on behalf of the PI-CAI consortium
publication_details: Zenodo 2026, PI-CAI Benchmarking Report
publication_link: https://doi.org/10.5281/zenodo.24552810
---

# Evaluation of Siemens Healthineers Prostate MR AI VA10A for Prostate Cancer Detection Using the PI-CAI Benchmark

## Abstract

### Overview

The Prostate Imaging–Cancer AI (PI-CAI) Challenge is a large-scale, international confirmatory study designed to evaluate and compare state-of-the-art artificial intelligence (AI) algorithms for prostate cancer (PCa) detection on MRI against the performance of 62 radiologists. The challenge employed a pre-specified study design and evaluation framework and a sequestered test set comprising 1,000 prostate MRI examinations. Building on this foundation, the PI-CAI Benchmark establishes a standardized and sustainable framework for the transparent, reproducible, and independent evaluation of AI systems against radiologists.

In the present report, we assess the performance of the independently developed Prostate MR AI VA10A (Siemens Healthineers, Forchheim, Germany) model for detecting clinically significant prostate cancer (csPCa; defined as Gleason grade group ≥2) on MRI using the PI-CAI Benchmark.

### Validation and Performance

The observer study cohort consisted of a subset of 400 examinations (133/400, 33% csPCa prevalence) from the hidden testing cohort, which were independently assessed by 62 radiologists in a controlled setting. In this subset, the AI system achieved an AUROC of 0.863 (95% CI: 0.824, 0.900). The pairwise difference between the AUROC of the AI system and the pool of radiologists was +0.004 (-0.027 to 0.034).

The full hidden testing cohort comprised prostate MRI examinations from 1,000 patients acquired across four clinical centers with 33% (332/1000) csPCa prevalence. In this cohort, the AI system demonstrated an AUROC of 0.887 (95% CI: 0.865, 0.909).

### Implications and Limitations of Findings

In the observer study cohort, the AI system and radiologists demonstrated similar AUROC point estimates, with a pairwise difference of +0.004 favoring AI. In the full testing cohort, the AI system had lower specificity (42.1% vs 69.0%) when compared at the same sensitivity as routine clinical reads at PI-RADS ≥3. Differences between the observer study and routine clinical assessments may partly reflect the distinct evaluation settings, including access to patient history, peer consultation, and protocol familiarity. Furthermore, biopsy decisions were informed by routine MRI assessments and not by AI findings, potentially introducing bias in favor of routine clinical reads.