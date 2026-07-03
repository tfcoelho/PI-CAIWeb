---
tags: ONGOING
date: 2024-07-01
authors: T. F. Coelho, J. S. Bosma, V. Bozgo, C. R. Noordman, R. Grimm, M. de Rooij, M. Maas, H. Huisman
publication_details: 
publication_link: 
---

# Diagnostically Calibrated AI Image-Quality Framework 

## Abstract

### Background and objective

Image quality (IQ) is a critical determinant of clinically significant prostate cancer (csPCa) detection on MRI. High-quality imaging supports accurate diagnosis and is essential for effective clinical decision-making. However, current IQ assessment (IQA) methods rely on subjective visual evaluation and are not scalable for routine use. We propose a diagnostically calibrated deep-learning  classifier that predicts image quality scores aligned with diagnostic performance. The model will be trained on curated, retrospectively labeled T2-weighted scans and evaluated on a large, prospectively collected validation cohort. We hypothesize that predicted image quality will correlate with csPCa detection accuracy, allowing quality thresholding based on diagnostic relevance. If successful, this approach could enable real-time quality feedback in clinical workflows.

### Methods

The training cohort consists of 1,229 T2-weighted prostate MRI scans acquired between 2014–2020 at Radboudumc. These include 679 high-quality and 550 low-quality cases, selected from a larger pool of ~15,000 scans. Intermediate-quality cases were excluded to reduce label noise. Quality labels were defined by a PhD student under radiologist supervision using criteria included in PI-QUAL v2.

The validation cohort will include >1,000 scans from 2021–2025. These scans will reflect real-world quality distributions, with no exclusions based on image quality. Patients must be ≥18 years, with clinical suspicion or follow-up of prostate cancer. Exclusion criteria include prior prostate treatment, prior confirmed csPCa (Gleason grade group ≥2), or incomplete imaging/clinical data. Endo-rectal coil scans will be excluded in both cohorts.

Clinical reference for csPCa will include histopathological confirmation (PI-RADS ≥3) or ≥1 years of negative follow-up for PI-RADS ≤2 cases.

We will train a 3D deep-learning classifier based on Inception I3D, adapted for single-channel T2W input. Preprocessing includes isotropic resampling (0.3×0.3×3 mm³) and fixed central cropping (300×300×15 voxels). No spatial or intensity augmentations will be applied, as preserving original quality is essential. Grad-CAM will be used for interpretability.

The model will be evaluated on two key tasks:
1. **Classification performance** on the training data (5-fold cross-validation) to assess its ability to distinguish clear high- and low-quality scans.
2. **Correlation with diagnostic accuracy** on the prospective validation set. We will compute AUCs of a csPCa detection model before and after iteratively excluding the lowest-quality scans (in 10% increments) as ranked by our model. Bootstrap sampling (n=1,000) will be used to estimate AUC distributions, and Pearson’s r will quantify the relationship between predicted quality and diagnostic accuracy (significance at p < 0.05).

### Expected Outcomes

We expect the model to accurately classify extremes of image quality and to generalize its predictions to intermediate-quality scans in a diagnostically meaningful way. By aligning quality scores with expected diagnostic performance, this tool may support real-time quality control during MRI acquisition—potentially reducing recall rates and enhancing csPCa detection. Upon data access approval, we will begin validation under GDPR-compliant protocols and institutional ethics approvals.
