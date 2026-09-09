---
tags: ONGOING
under_review: true
date: 2026-08-21
authors: R. N. Spaans, C. Chia, T. Wang, A. Kowalewski, P. Khachatryan, D. Oliveira, K. Faryna, J. van Basten, G. Litjens, N. Khalili, on behalf of the CHIMERA Consortium
publication_details: Arxiv
publication_link: https://arxiv.org/abs/2608.21497
---

# CHIMERA Challenge: Biochemical Recurrence Prediction in Prostate Cancer Patients using Multimodal Datasets

## Abstract

### Background and objective

Biochemical recurrence (BCR), defined as any detectable prostate-specific antigen level after prostatectomy with confirmatory elevation, is widely used as a surrogate endpoint and is typically assessed using clinical and pathological variables. Despite advances in multimodal modeling, no standardized benchmark exists for multimodal prognostic modeling in urological cancers, partly because curating heterogeneous multimodal data remains challenging. We developed the CHIMERA Challenge, a multimodal benchmark integrating preoperative multiparametric MRI (mpMRI), post-prostatectomy histopathology, patient characteristics, and clinician-derived variables from 267 patients across two institutions, to provide the first standardized benchmark for multimodal prognostic modeling of BCR after radical prostatectomy.

### Methods

The released dataset comprises 801 MRI sequences, 13 clinical variables per case, and 942 whole-slide images (WSIs). Training (n=95), validation (n=23), and test (n=149) splits were established and hosted on the Grand Challenge platform, with baseline clinical and pathological characteristics not differing significantly across splits. Submitted models were evaluated on predicting time to BCR using the concordance index (C-index). Post-challenge analyses tested how robustly each model type performed when clinician-derived variables were withheld or randomized.

Unimodal clinical models achieved the highest test C-index of 0.7402 but proved highly sensitive to the integrity of these variables, with performance collapsing toward chance (C≈0.50) when they were randomized. Multimodal models retained near-baseline performance when these variables were withheld (ΔC≤0.04), indicating their ability to recover prognostic signal directly from imaging data. CHIMERA is the first public, standardized multimodal benchmark for prostate cancer prognosis. Although models using only patient characteristics and clinician-derived variables yielded the highest leaderboard performance, multimodal models combining mpMRI and WSIs demonstrated greater robustness in clinically realistic scenarios where complete expert annotation is not guaranteed.
