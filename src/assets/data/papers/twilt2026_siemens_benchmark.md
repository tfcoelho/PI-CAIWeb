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

Using the PI-RADS ≥3 operating point of the routine clinical reads as reference, the AI system achieved a sensitivity of 90.3% (87.2, 93.5%) at matched specificity of readers at 69.0%, and a specificity of 42.1% (38.3, 45.8%) at matched sensitivity of readers at 96.1% (94.0, 98.2%). The pairwise difference in specificity between AI and readers was -27.0 percentage points (-31.0, -22.9).

Importantly, the operating point achieving matched sensitivity was available only when the full AI suspicion score range was retained without clipping. Although this operating point is not available in the clinically deployed product, it is reported to enable standardized performance characterization across AI systems.

### Implications and Limitations of Findings

In the observer study cohort, the AI system and radiologists demonstrated similar AUROC point estimates, with a pairwise difference of +0.004 favoring AI. In the full testing cohort, the AI system had lower specificity (42.1% vs 69.0%) when compared at the same sensitivity as routine clinical reads at PI-RADS ≥3. Differences between the observer study and routine clinical assessments may partly reflect the distinct evaluation settings, including access to patient history, peer consultation, and protocol familiarity. Furthermore, biopsy decisions were informed by routine MRI assessments and not by AI findings, potentially introducing bias in favor of routine clinical reads.

The PI-CAI Benchmark provides a standardized and reproducible framework for the independent evaluation of AI systems through adherence to prespecified protocols and evaluation schemes. The present evaluation is limited to standalone diagnostic performance and does not assess the added value of AI in clinical workflows, including its potential effects on workflow efficiency, healthcare equity, or patient outcomes. The clinical impact of AI therefore remains to be established through further clinical evaluation. The PI-CAI Benchmark will continue to evolve alongside developments in AI and changing clinical and regulatory requirements, supporting the generation of meaningful evidence for the validation of prostate MRI AI systems and their translation into clinical practice. This may include the incorporation of additional metrics and more comprehensive comparisons, in consultation with the PI-CAI Scientific Advisory Board and other stakeholders.
