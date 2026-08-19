---
tags: PUBLISHED
order: 3
date: 2026-08-18
authors: T. F. Coelho, J. S. Bosma, V. Bozgo, C. R. Noordman, R. Grimm, M. de Rooij, M. C. Maas, H. Huisman
publication_details: Radiology
publication_link: https://pubs.rsna.org/doi/10.1148/radiol.253360
---

# Diagnostically Calibrated AI Image Quality Framework Applied to Prostate Cancer Detection at MRI

## Abstract

### Background
Image quality affects diagnostic performance; however, current quality metrics rely on subjective reader labels rather than diagnostic outcomes.

### Purpose
To develop and evaluate a diagnostically calibrated artificial intelligence (AI) framework using deep learning (DL) for image quality assessment, linking prostate MRI quality scores to diagnostic performance.

### Materials and Methods
This single-center retrospective study analyzed 12,496 consecutive prostate multiparametric MRI examinations performed between January 2014 and December 2023 at Radboud University Medical Center. A two-step framework was implemented: First, a DL model was trained on the most reliable low-quality (artifact-degraded structures) and high-quality (clear delineated zones) axial T2-weighted images to produce a continuous image quality score. Second, this score was applied in an independent internal test set and calibrated with diagnostic performance measured as (a) area under the receiver operating characteristic curve (AUC) for clinically significant prostate cancer (csPCa) detection by an AI model and (b) accuracy of csPCa detection by radiologists in routine clinical practice. The reference standard was histopathologic findings at biopsy. Diagnostic performance was calculated for quality score 10-percentile thresholds from 10% to 80%. Linear trend between performance and threshold was assessed using a permutation test on the regression slope.

### Results
A total of 1229 T2-weighted series were used for training, and 568 multiparametric MRI examinations for diagnostic testing (1638 male patients; median age, 67 years [IQR, 62–71 years]). The DL model achieved a mean AUC of 0.99 for distinguishing low- versus high-quality images in the training set during fivefold cross-validation. For csPCa detection in the test set, the AI model AUC improved from 0.92 (95% CI: 0.89, 0.94) to 0.99 (95% CI: 0.97, 1.00) (P = .005) across thresholds of DL model image quality score; radiologist accuracy improved from 77% (95% CI: 73, 80) to 85% (95% CI: 78, 91) (P = .01).

### Conclusion
The AI framework provided a standardized method to derive an objective image quality score that correlated with improved AI diagnostic performance and radiologist accuracy.
