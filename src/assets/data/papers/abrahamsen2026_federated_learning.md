---
tags: ONGOING
date: 2025-12-01
authors: B. S. Abrahamsen, T. F. Coelho, A. Saha
institutions: ntnu, radboud_university_medical_center
led_by_other: true

publication_details:
publication_link:
---

# Performance Scaling in Federated Learning for Prostate Cancer Detection

## Abstract

### Background and objective

Federated learning (FL) has emerged as a promising approach for training AI models across institutions without centralizing sensitive patient data: each institution trains a local model on its own data, and model updates are periodically aggregated into a global model. While FL has shown performance comparable to centralized training in simulation studies and limited real-world deployments, its scalability and the relative contributions of institutional diversity versus data volume remain insufficiently understood. This study evaluates FL for prostate cancer detection on MRI as it scales, with a focus on whether the diversity of participating institutions yields greater generalization improvements than increasing data volume from already-represented institutions, aiming to provide empirical evidence to inform the design of future large-scale multi-institutional FL collaborations in prostate cancer imaging.

### Methods

This retrospective, multi-institutional simulation study draws on prostate MRI datasets from a diverse set of clinical centers within the PI-CAI consortium — the core data foundation for the federation — comparing two experimental setups with matching amounts of data incrementally added: federated learning, in which institutions are incrementally added to the federation, and centralized learning, in which increasing amounts of data are drawn from a single institution. Both setups use the same deep learning model for prostate cancer detection, with Federated Averaging used for aggregation in the FL setting and consistent hyperparameters and training rounds across both. Performance scaling is characterized using AUROC and average precision as primary and secondary outcomes, with generalization to out-of-distribution data assessed on a held-out external test set (the STHLM3-MRI dataset, used exclusively for external testing and not for training). All experiments are conducted in a simulated federated setting using centrally collected and curated data — a best-case scenario for FL intended to provide an upper bound on achievable performance. This project is supported by grant funding secured by Radboud University Medical Center and the Norwegian University of Science and Technology from the Norwegian Cancer Society and Prostatakreftforeningen under Project FLIP.AI.
