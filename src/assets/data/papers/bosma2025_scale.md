---
tags: STUDY PROTOCOL
date: 2025-02-18
authors: J.S. Bosma, N. Obuchowski, M. de Rooij, H. Huisman
publication_details: Zenodo
publication_link: https://doi.org/10.5281/zenodo.14888094
---

# Scalable Clinical Annotation with Location Evidence (SCALE) Statistical Analysis Plan

## Abstract

### Background and objective
The SCALE (Scalable Clinical Annotation with Location Evidence) study investigates the diagnostic performance of prostate cancer detection models trained using different annotation strategies. The primary goal is to evaluate whether semi-supervised training using AI-derived labels, using the proposed location-based SCALE method, can match or surpass the performance of fully supervised models. 

### Methods

#### Study Design
SCALE compares an algorithm trained supervised on cases with manual annotations, to algorithms trained semisupervised on cases with manual annotations supplemented with additional cases annotated using AI-derived labels. The AI-derived annota1ons strategies we compare are the count-based Report-guided Pseudo Labels (1) method and the proposed location-based SCALE method. These algorithms are evaluated against the PI-CAI ensemble model.

#### Study Cohorts
Training data includes the PI-CAI Public and Private Training dataset, the ProstateNet dataset, a dataset from University of California Los Angeles (UCLA), and a dataset from the Antoni van Leeuwenhoek (AVL) hospital.

For testing, the PI-CAI Hidden Testing cohort, the PROMIS cohort, and a combined set of both are included.

#### Statitical Analysis
The study aims to establish whether the SCALE annotation method leads to statistically superior or non-inferior diagnostic performance compared to traditional manual and alternative AI-based annotations, while maintaining statistical rigor and controlling for type I error inflation. 
The study employs a hierarchical hypothesis testing framework, where each hypothesis is tested sequentially only if preceding comparisons are statistically significant. The primary endpoint is case-level area under the ROC curve (AUROC), and secondary metrics include lesion-level average precision (AP). Statistical significance is determined using permutation tests, with correction for multiple comparisons via the Holm–Bonferroni method. A non-inferiority margin of 0.05 is applied for relevant tests.
