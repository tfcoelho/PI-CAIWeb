---
tags: ONGOING
date: 2025-12-01
authors: V. Bozgo, T. F. Coelho, M. de Rooij, H. Huisman

publication_details:
publication_link:
---

# Post-Market Surveillance of Artificial Intelligence for Prostate Cancer Detection on MRI

## Abstract

### Background and objective

Artificial intelligence (AI) systems for prostate cancer detection on MRI have demonstrated high diagnostic accuracy in retrospective validation studies. However, AI performance may deteriorate after deployment due to changes in patient populations, imaging protocols, scanner hardware, clinical workflows, and disease prevalence. Regulatory frameworks, including the European AI Act, increasingly emphasize the need for continuous post-market performance monitoring, yet practical methodologies for detecting clinically meaningful performance drift remain limited. This study develops and evaluates a post-market surveillance framework for AI systems for prostate cancer detection on MRI, monitoring agreement between AI predictions and expert radiologists rather than relying solely on repeated ground-truth verification, to enable scalable surveillance of AI performance in routine clinical practice while identifying changes in model behavior that may indicate clinically relevant drift.

### Methods

This retrospective, multicenter simulation study uses prostate MRI examinations and AI predictions for clinically significant prostate cancer detection, with training data drawn from the PI-CAI public and private training datasets and the tolerance margin defined on the PI-CAI tuning set. The STHLM3-MRI dataset is used exclusively as an external test set to evaluate drift in a screening setting, with sample size determined by a priori statistical analysis. Agreement between AI and radiologists is evaluated against a prespecified tolerance margin, with secondary analyses including Cohen's kappa and patient-level AUROC, using multiple imputation to account for incomplete histopathological verification. Detected drift is characterized using positive and negative agreement, the proximity of discordant AI scores to the predefined decision threshold, and multivariable logistic regression to identify factors associated with AI–radiologist disagreement.
