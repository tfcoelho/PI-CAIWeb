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

The Prostate Imaging–Cancer AI (PI-CAI) Challenge is a large-scale, international confirmatory study designed to evaluate and compare state-of-the-art artificial intelligence (AI) algorithms for prostate cancer detection on MRI against the performance of 62 radiologists, using a pre-specified study design and evaluation framework and a sequestered test set of 1,000 prostate MRI examinations. Building on this foundation, the PI-CAI Benchmark establishes a standardized and sustainable framework for the transparent, reproducible, and independent evaluation of AI systems against radiologists. This report assesses the performance of the independently developed Prostate MR AI VA10A (Siemens Healthineers, Forchheim, Germany) for detecting clinically significant prostate cancer (csPCa; Gleason grade group ≥2) on MRI using the PI-CAI Benchmark.

### Methods

The AI system was evaluated on the PI-CAI hidden testing cohort of 1,000 biparametric prostate MRI examinations from three Dutch centers and one Norwegian center, provided in their original DICOM format. The primary outcome was standalone patient-level diagnostic performance for csPCa detection, compared with the 62 radiologists of the PI-CAI observer study (400 examinations, pairwise difference in AUROC) and with radiological assessments made during clinical routine (all 1,000 examinations, pairwise difference in specificity at the same sensitivity as PI-RADS ≥3). All analyses followed the procedures and outcome definitions of the PI-CAI study, using its publicly available evaluation code.

### Results

In the observer study cohort (n=400; 133 with csPCa), the AI system achieved an AUROC of 0.863 (95% CI: 0.824, 0.900); the pairwise difference with the pool of radiologists was +0.004 (−0.027 to 0.034). In the full testing cohort (n=1,000; 332 with csPCa), the AI system achieved an AUROC of 0.887 (95% CI: 0.865, 0.909). At the same sensitivity as routine clinical reads at PI-RADS ≥3 (96.1%), the AI system had a specificity of 42.1% versus 69.0%, a pairwise difference of −27.0 percentage points (−31.0, −22.9); this operating point was available only when the full AI suspicion score range was retained, which the clinically deployed product does not offer.

### Implications and Limitations

The AI system and radiologists showed similar AUROC point estimates in the observer study, whereas the AI system had lower specificity than routine clinical reads at matched sensitivity. Differences between the two settings may partly reflect access to patient history, peer consultation and protocol familiarity during clinical routine, and biopsy decisions informed by routine MRI assessments may favor routine clinical reads. The evaluation is limited to standalone diagnostic performance; the clinical impact of AI remains to be established through further clinical evaluation.
