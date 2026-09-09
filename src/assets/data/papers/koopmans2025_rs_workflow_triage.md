---
tags: ONGOING
date: 2025-07-10
authors: L. D. Koopmans, F. Verga Lara, J. J. Twilt, S. J. Fransen, H. Huisman, T. C. Kwee, D. Yakar
institutions: umcg, radboud_university_medical_center
led_by_other: true
publication_details: 
publication_link: 
---

# Optimizing Radiologists’ Diagnostic Performance and Workload with Semi-Autonomous Clinically Significant Prostate Cancer Detection on BpMRI: A Multi-Center Reader Study

## Abstract

### Background
Prostate cancer incidence is predicted to increase from 1.46 million new cases per year in 2022 to 2.9 million by 2040. As Prostate MRI is crucial in identifying clinically significant prostate cancer (csPCa), this will increase the burden on radiologists, who already face a high workload from a global shortage, and may compromise the quality of care. State-of-the-art Artificial Intelligence (AI) models for patient-level csPCa detection have been shown to maintain radiologists’ diagnostic performance and could significantly reduce radiologists’ workload.  Retrospective studies have shown such an AI model may reduce workload by up to 49% in a semi-autonomous workflow, where cases prone to AI failure are identified with uncertainty quantification and referred to radiologists. However, due to their retrospective nature, these studies could not account for factors that may arise when actually prospectively working with a semi-autonomous workflow or with computer-aided diagnosis (CAD) when the predictions are uncertain. Moreover, analysis was limited as workload reduction has only been measured as the number of cases automatically read, missing nuances in reading times due to case difficulty.

### Purpose
This study investigates the impact of semi-autonomous AI-based csPCa detection on radiologists’ workload and diagnostic performance in a mutlireader, multicase (MRMC) observer study through a comparison of reading times and diagnostic performances (as defined as the area under the receiver operating characteristic curve (AUROC)).

### Methods
An estimated total of 280 unique, consecutive patient visits from two Dutch medical centers were included. Patients were included if they had a suspicion of prostate cancer and underwent bpMRI. Patients were excluded if their data had been used to train a previously developed AI csPCa detection model, if they had received previous treatment of the prostate gland, or had incomplete data. CsPCa cases with ISUP ≥ 2 were considered positive, and negative cases were defined as having no positive follow-up of three years as confirmed with PALGA, the national pathology database of the Netherlands.  Of these 280 cases, 100 cases (36%, 50 cases from each center) were used to calibrate the uncertainty threshold based on the AI model’s sensitivity and specificity to determine which cases can be automatically read and which cases should be referred to radiologists. Exper t radiologists are invited to read the remaining 180 cases (64%, 90 cases from each center) through the Grand Challenge platform.

The study follows a split-plot design, with readers and cases stratified over three splits. Within each split, all cases are first read according to the standard protocol (PIRADS v 2.1., without AI involvement), in accordance with current clinical practice. After a 4-week washout period to minimize memory bias, readers are evenly divided among two different semi-autonomous reading protocols. In the first semi-autonomous reading protocol, radiologists read cases for which the AI model was uncertain as they would in current clinical practice, without knowledge of the AI output. In the other semi-autonomous reading protocol, radiologists read these uncertain cases with the added information of the AI model’s patient-level suspicion score and csPCa detection map. For each case, readers are asked to mark suspected lesions and assign for each lesion suspicion scores (0 – 100) and a PI-RADS score in accordance with PI-RADS v2.1. To measure reading time as accurately as possible, readers will be instructed to read each case without interruption. 