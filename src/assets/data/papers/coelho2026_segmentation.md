---
tags: ONGOING
date: 2026-03-01
authors: T. F. Coelho*, V. Bozgo*, F. Hoitsma, S. Roy, A. B. C. D. Ng, A. Asif, K. Magudia, P. Larson, Q. Xie, X. Zhang,
C. P. Minh, S. N. Gitau, I. G. Schoots, M. F. Boomsma, R. Cuocolo, H. D. Patel, U. Bagci, M. Tsiknakis, K. Marias,
D. Regge, N. Papanikolaou, D. Yakar, M. Elschot, J. Veltman, Y. Kirchhoff, B. Kovács, M. C. Maas, R. Grimm,
H. von Busch, A. R. Padhani, H. U. Ahmed, N. Mayor, T. Nordström, M. Eklund, F. Jäderling, J. S. Bosma,
V. Kasivisvanathan, M. de Rooij, A. Saha†, H. Huisman†, on behalf of the PI-CAI—PRIME—STHLM3-MRI—IP1-PROSTAGRAM—ProCAncer-I—COMFORT consortia — *joint first authors, †joint senior authors

publication_details:
publication_link:
---

# Artificial Intelligence for Prostate Segmentation on MRI in Global Populations

## Abstract

### Background and objective

Prostate magnetic resonance imaging is a central component of modern prostate cancer diagnosis, staging, and surveillance due to its high soft tissue contrast and ability to provide functional information non-invasively. Accurate assessment of prostate MRI relies on anatomical delineation of the gland, which underpins tasks such as prostate volume estimation, biopsy targeting, radiation therapy planning, and the development of downstream computational models. When manually performed, prostate segmentation is time-consuming and labor-intensive, and subject to substantial inter-reader variability even among experienced radiologists. These limitations have driven rapid development of artificial intelligence methods designed to automate segmentation and improve the efficiency and consistency of image interpretation.

While many deep learning-based prostate MRI segmentation studies report strong performance on internal datasets or within limited multi-center settings, their generalization to unseen scanners, acquisition protocols, and geographically diverse clinical environments remains insufficiently characterized. Most published models are trained on relatively small, often highly curated datasets, typically ranging from a few dozen to several hundred examinations even in the largest multi-center studies. In this study, we train what is, to our knowledge, the largest prostate MRI segmentation model developed on a highly heterogeneous dataset, and evaluate its robustness using internal and external benchmarks with comparable diversity. Our dataset comprises more than 45,000 prostate MRI examinations collected across 46 cities in 22 countries, encompassing substantial variation in scanner vendors, acquisition protocols, and clinical settings.

### Methods

The central aim of this study is to evaluate the generalization performance of automated whole-gland prostate MRI segmentation across heterogeneous clinical settings, quantified using the Dice similarity coefficient (DSC) and the 95th-percentile Hausdorff distance (HD95) on held-out internal and external test cohorts, and benchmarked head-to-head against other publicly available or available-on-request prostate MRI segmentation models. Secondary analyses assess zonal (peripheral and transition zone) segmentation performance; robustness across clinically distinct presentations (healthy glands, enlarged/benign glands, focal malignant lesions, extraprostatic extension, locally advanced disease, prior prostate surgery, and non-surgical prostate-directed therapy); technical sources of variation (field strength, scanner vendor, endorectal coil use); and the downstream clinical validity of model-predicted prostate volume, including volume agreement and PSA density (PSAD)-based detection of clinically significant prostate cancer (ISUP ≥2).

Training data were assembled from all eligible examinations meeting a single inclusion criterion applied across all cohorts: availability of a transversal T2-weighted MRI sequence of the prostate, with no restrictions on patient age, PSA level, clinical indication, biopsy status, or scanner characteristics. In aggregate, the training dataset comprises more than 45,000 prostate MRI examinations from 50 cities in 22 countries, spanning multiple scanner vendors, field strengths (1.5T and 3T), coil configurations, and acquisition protocols. External testing uses the same three independent prospective trial cohorts established for the SCARLET study — PRIME (476 patients, 18 centers, 11 countries), STHLM3-MRI (1,108 patients, 3 centers in Stockholm, Sweden), and IP1-PROSTAGRAM (390 patients, 2 centers in London and Middlesex, United Kingdom) — adopted without modification so that no case used to evaluate downstream cancer-detection performance has been used to train this segmentation model, which is intended as an upstream component of the PI-CAI-2B cancer detection system. Whole-gland segmentation masks are generated using an automated pipeline and subsequently reviewed and corrected by trained readers, with zonal annotations additionally produced for a subset of cases.
