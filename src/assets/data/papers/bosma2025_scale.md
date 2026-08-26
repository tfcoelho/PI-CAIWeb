---
tags: PUBLISHED
order: 6
date: 2025-12-01
authors: J. S. Bosma, L. Builtjes, A. Saha, J. J. Twilt, M. Tsiknakis, K. Marias, D. Regge, N. Papanikolaou, I. G. Schoots, J. Veltman, M. Elschot, D. Yakar, N. A. Obuchowski, M. P. Heinrich, A. Hering, M. de Rooij, H. Huisman
publication_details: Comput Biol Med
publication_link: https://doi.org/10.1016/j.compbiomed.2025.111321
study_protocol_link: https://doi.org/10.5281/zenodo.14888094
---

# Scalable Clinical Annotation with Location Evidence (SCALE)

## Abstract

Deep learning can mitigate the global radiologist shortage but its development requires large-scale annotated datasets. This study introduces SCALE (Scalable Clinical Annotation with Location Evidence), a fully automated method for generating voxel-level annotations. It uses location priors that are automatically extracted from medical reports, tracked biopsy coordinates, or provided anatomical sectors. We annotated a large-scale dataset comprising 17,896 cases from 16,562 patients across 24 hospitals in 10 countries and 2 continents, using both SCALE and a count-based weakly semisupervised learning (CWSSL) method. An optimized algorithm was developed and trained on these datasets. Evaluation with 1,561 cases from 1,561 patients across 19 hospitals in 3 countries and 1 continent showed the superiority of the model trained on the dataset with SCALE annotations, achieving a case-level area under the receiver operating characteristic curve of 0.856. This is +0.012 compared to supervised learning (p=0.02), +0.007 compared to training with CWSSL (p=0.12), and +0.006 compared to the Prostate Imaging: Cancer AI (PI-CAI) Ensemble AI System. These results demonstrate that automated, location-guided annotation enables scalable development of AI for clinically significant prostate cancer detection on MRI, surpassing previous methods, and paving the way for broader clinical deployment.
