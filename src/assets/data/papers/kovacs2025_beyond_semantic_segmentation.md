---
tags: ONGOING
organizations: DKFZ
date: 2025-12-01
authors: B. Kovacs, Y. Kirchhoff, A. Saha
publication_details: 
publication_link: 
---

# Beyond Semantic Segmentation for Prostate Cancer Detection

## Abstract

### Concept

Current AI approaches to prostate cancer detection on MRI predominantly rely on semantic segmentation to incorporate spatial information. While effective under controlled conditions, segmentation models are sensitive to annotation noise and inter-reader variability, particularly in the presence of ambiguous lesion boundaries. This limits robustness in heterogeneous, real-world clinical environments. Alternative task formulations, such as object detection and classification, may provide more robust approaches by reducing reliance on precise pixel-level annotations. This study systematically benchmarks these approaches within a large-scale multi-center cohort and investigates whether large-scale anatomical pretraining can further improve generalization.

### Objectives

- Benchmark semantic segmentation, object detection, and classification approaches for prostate cancer detection on MRI within a unified patient-level evaluation framework.
- Evaluate robustness across centers and acquisition settings using stratified performance analyses.
- Assess the impact of large-scale anatomical pretraining on diagnostic performance.
- Identify model formulations that improve clinical utility and generalizability across heterogeneous multi-center datasets.

### Methods

The study uses the extended PI-CAI cohort (approximately 20,000 prostate MRI examinations from 20 centers) for model training and internal evaluation. Three model formulations are compared: semantic segmentation, object detection, and classification. All models are trained or fine-tuned using the same dataset and evaluated within a unified patient-level framework. In a second stage, the best-performing models are compared to architecturally equivalent models initialized with large-scale anatomical pretraining. Patient-level AUROC is the primary outcome measure. External testing is performed on independent cohorts to evaluate the generalization of models trained on the PI-CAI cohort. Stratified analyses assess performance variability across centers and imaging characteristics.
