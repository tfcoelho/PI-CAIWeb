---
tags: ONGOING
date: 2025-03-27
authors: C. Grisi, M. Stegeman, J. Lefkes, M. D'Amato, L. Builtjes, L. Philipp, F. van der Graaf, J. Bosma, J. Kather, M. Ligero Hernandez, L. Wee, A. Dekker, G. Campanella, B. van Ginneken, A. Hering, F. Ciompi
organizations: Radboud University Medical Center
publication_details: MICCAI 2025 Lighthouse Challenge, Zenodo
publication_link: https://doi.org/10.5281/zenodo.15123616
---

# Unified beNchmarks for Imaging in COmputational pathology, Radiology and Natural language (UNICORN)

## Abstract

### Background and objective
Challenges have undoubtedly shaped the field of medical image analysis and deep learning in the last decade, following a "many-to-one" approach, where numerous models competed on a specific single (narrow) task. But the emergence of (multimodal) foundation models powered by (vision) transformers comes with a paradigm change in benchmarking towards a "one-to-many" approach, where a single model is benchmarked across a selection of (multimodal) tasks. We propose UNICORN, a challenge to provide a unified set of benchmarks to assess the performance of multimodal foundation models. We focus on both image data in the fields of radiology and digital pathology, text data, using medical reports, and images + text, focusing on multi-modal approaches. We release multi-modal public data that can be used by participants to fine-tune existing (pre-trained) foundation models or to develop a strategy based on few-shot learning, and establish a battery of benchmarks based on sequestrated test data. 

### Methods
UNICORN is a large-scale challenge designed to evaluate the generalizability and adaptability of multimodal foundation models across vision, language, and vision-language tasks. The challenge includes over 20 tasks derived from real-world clinical practice, such as whole-slide pathology image analysis, CT scan interpretation, and clinical report understanding. 

In UNICORN, we will put together multiple teams from one Dutch medical center (Radboudumc), one Dutch onology center (Maastro), a precision oncology group from Germany (TU Dresden), with multidisciplinary expertise and a strong track on challenge organization. 

Participants will use public, limited-size datasets for few-shot fine-tuning, while final evaluation will occur on sequestered, previously unused test sets (including PI-CAI). Tasks span vision (e.g., prostate biopsy grading), language (e.g., report classification), and combined vision-language domains (e.g., image captioning).

Performance is evaluated using standardized metrics (e.g., quadratic weighted kappa, AUC) and summarized via task-specific and global leaderboards.
