---
tags: ONGOING
date: 2026-06-19
authors: W. Yi, T. F. Coelho, A. B. C. D. Ng, A. Asif, F. Giganti, V. Kasivisvanathan, Y. Hu
institutions: imperial, radboud_university_medical_center
led_by_other: true

publication_details:
publication_link:
---

# T2-Only Artificial Intelligence for Clinically Significant Prostate Cancer Detection on MRI: A Global, Multiethnic, Non-Inferiority Study Protocol

## Abstract

### Background and objective

Prostate cancer diagnostic pathways aim to detect clinically significant prostate cancer (csPCa, Gleason grade group [GG] ≥2) while limiting unnecessary biopsy and overdiagnosis of GG1 disease. Multiparametric MRI (mpMRI) includes T2-weighted (T2w), diffusion-weighted (DWI/ADC), and dynamic contrast-enhanced imaging; biparametric MRI (bpMRI) retains T2w and DWI while omitting contrast. However, DWI acquisition and interpretation remain highly variable, affected by artefact, geometric distortion, scanner implementation, and image-quality variation. T2-weighted imaging is routinely acquired and provides anatomical information on gland morphology and zonal anatomy; a T2-only AI assessment tests whether patient-level GG ≥2 risk can be estimated from T2 imaging alone, potentially enabling T2-first triage strategies ahead of DWI acquisition. This study evaluates whether, in external diagnostic and screening cohorts, a locked T2-only AI system achieves standard-of-care agreement non-inferior to a radiologist benchmark, and AUROC non-inferior to a bpMRI AI comparator (PI-CAI-2B).

### Methods

This is a retrospective, global, multiethnic, paired diagnostic non-inferiority study using deidentified imaging, radiology, clinical, and reference-standard data from the SCARLET cohort (22,445 prostate MRI examinations from 21,252 patients across 46 cities in 22 countries). The primary endpoint is agreement between T2-only AI and the standard-of-care diagnosis, compared against prevalence-adjusted average radiologist agreement derived from a published 62-radiologist observer study; non-inferiority is defined as the lower bound of the 95% CI for the agreement difference exceeding −0.05. The secondary endpoint is paired AUROC non-inferiority of T2-only AI to the locked bpMRI AI comparator (PI-CAI-2B), using the same −0.05 margin. All preprocessing rules, model checkpoints, exclusion rules, operating points, and analysis code are fixed before final external-test inference, with no threshold selection, retraining, or reader adjudication performed on external-test outcomes.

Three independent, held-out external testing cohorts serve as the evaluation set: PRIME (476 patients, primary-diagnostic setting, 18 centres in 11 countries), STHLM3-MRI (1,108 patients, organised second-stage screening, Stockholm, Sweden), and IP1-PROSTAGRAM (390 patients, organised first-stage screening, London and Middlesex, United Kingdom). Prespecified subgroup analyses stratify performance by patient age, ethnicity, primary tumour site, PI-QUAL v2 image quality, PSA density, and clinical site.
