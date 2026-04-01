<template>
  <main class="symposium-page">
    <section class="hero">
      <p class="eyebrow">PI-CAI Symposium</p>
      <h1>
        Artificial Intelligence for Prostate Cancer Diagnosis and Screening on
        MRI: Current Practice, Evidence Gaps, and the Research Agenda
      </h1>
      <p class="meta">June 1 | 08:30 | Theaterzaal C</p>
      <p class="lead">
        Artificial intelligence (AI) is rapidly transforming prostate cancer
        detection on MRI. A growing body of evidence demonstrates the potential
        of AI systems, yet translation into routine clinical practice remains
        limited.
      </p>
      <p class="lead second">
        This symposium brings together experts from radiology, urology,
        epidemiology, and industry to examine the current state of evidence,
        define priorities for future research, and discuss how AI can be
        effectively integrated into clinical workflows.
      </p>
    </section>

    <section class="focus-areas">
      <h2>Focus Areas</h2>
      <ul>
        <li>
          Benchmarking and the retrospective evidence base required for safe and
          effective AI.
        </li>
        <li>
          Harm-to-benefit trade-offs in AI-radiologist clinical workflows.
        </li>
        <li>
          Scaling validation across diverse populations and care settings.
        </li>
        <li>
          Leveraging AI for capacity expansion and cost-effective population
          screening.
        </li>
      </ul>
    </section>

    <section class="program-grid">
      <article class="program-card">
        <h2>Morning Program</h2>

        <div class="slot">
          <p class="time">09:00-10:30</p>
          <h3>
            Session 1: Embedding AI into the Diagnostic Pathway of Prostate
            Cancer Management
          </h3>
          <p>
            Integration of AI systems into the MRI pathway, from decision
            support to selective automation, with emphasis on clinical utility,
            patient impact, and safety.
          </p>
          <p class="speakers">Speakers: To be announced</p>
        </div>

        <div class="slot">
          <p class="time">11:00-12:15</p>
          <h3>
            Session 2: From Diagnostic Practice to Population-Based Screening
          </h3>
          <p>
            Evidence for early detection, lessons from AI-based breast cancer
            screening, and feasibility of scalable MRI-based screening
            strategies for prostate cancer.
          </p>
          <p class="speakers">Speakers: To be announced</p>
        </div>

        <div class="compact-row">
          <p><strong>12:15-12:30</strong> Closing Remarks</p>
          <p><strong>12:30-13:30</strong> Lunch</p>
        </div>
      </article>

      <article class="program-card">
        <h2>Afternoon Program</h2>

        <div class="slot">
          <p class="time">14:30-16:00</p>
          <h3>PhD Defense of Jasper J. Twilt</h3>
          <p>
            Artificial Intelligence and Biparametric MRI in Prostate Cancer
            Detection: From Benchmarking to Workflow Strategies.
          </p>
        </div>

        <div class="slot">
          <p class="time">16:00-16:30</p>
          <h3>Break</h3>
        </div>

        <div class="slot">
          <p class="time">16:30-18:00</p>
          <h3>PhD Defense of Anindo Saha</h3>
          <p>Artificial Intelligence x Prostate Cancer Detection on MRI.</p>
        </div>

        <div class="compact-row">
          <p><strong>18:00</strong> Borrel</p>
        </div>
      </article>
    </section>

    <section class="speakers-section">
      <h2>Speakers</h2>
      <div class="speaker-placeholder-wrap">
        <div class="speaker-placeholder">Headshot + details coming soon</div>
        <div class="speaker-placeholder">Headshot + details coming soon</div>
        <div class="speaker-placeholder">More speakers to be announced</div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";

let originalBackgroundColor;

onMounted(() => {
  originalBackgroundColor = document.body.style.backgroundColor;
  document.body.style.backgroundColor = "#f4f2ef";
});

onUnmounted(() => {
  document.body.style.backgroundColor = originalBackgroundColor;
});
</script>

<style scoped>
.symposium-page {
  min-height: 100vh;
  max-width: 1100px;
  margin: 0 auto;
  padding: 110px 28px 80px;
  color: #1f2733;
  text-align: left;
  font-family: "Nunito-Sans", "Segoe UI", sans-serif;
}

.hero {
  background: linear-gradient(140deg, #ffffff, #f7f5f2);
  border: 1px solid #e7e3dc;
  border-radius: 20px;
  padding: 34px;
  box-shadow: 0 12px 40px rgba(20, 27, 36, 0.08);
}

.eyebrow {
  margin: 0;
  font-size: 12px;
  letter-spacing: 1.6px;
  text-transform: uppercase;
  color: #c11672;
  font-weight: 800;
}

h1 {
  margin: 14px 0 16px;
  font-size: 38px;
  line-height: 1.15;
  color: #0f1b2b;
}

.meta {
  margin: 0 0 22px;
  font-size: 17px;
  font-weight: 700;
  color: #263950;
  display: inline-block;
  background: #f0ece6;
  border: 1px solid #e1dacf;
  border-radius: 999px;
  padding: 8px 14px;
}

.lead {
  margin: 0;
  font-size: 18px;
  line-height: 1.5;
}

.lead.second {
  margin-top: 12px;
}

.focus-areas {
  margin-top: 26px;
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #e7e3dc;
  padding: 24px 28px;
}

.focus-areas h2 {
  margin: 0 0 12px;
  font-size: 24px;
}

.focus-areas ul {
  margin: 0;
  padding-left: 20px;
  display: grid;
  gap: 10px;
  line-height: 1.45;
}

.program-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  margin-top: 24px;
}

.program-card {
  background: #ffffff;
  border: 1px solid #e7e3dc;
  border-radius: 16px;
  padding: 24px;
}

.program-card h2 {
  margin: 0 0 20px;
  font-size: 24px;
}

.slot {
  margin-bottom: 18px;
  padding-bottom: 18px;
  border-bottom: 1px solid #ece8e1;
}

.slot:last-of-type {
  margin-bottom: 10px;
}

.time {
  margin: 0;
  font-size: 13px;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  color: #c11672;
  font-weight: 800;
}

.slot h3 {
  margin: 7px 0 8px;
  font-size: 20px;
  line-height: 1.25;
}

.slot p {
  margin: 0;
  line-height: 1.45;
  overflow-wrap: anywhere;
}

.speakers {
  margin-top: 8px !important;
  color: #425367;
  font-weight: 700;
}

.compact-row p {
  margin: 8px 0 0;
}

.speakers-section {
  margin-top: 26px;
  background: #ffffff;
  border: 1px solid #e7e3dc;
  border-radius: 16px;
  padding: 24px 28px;
}

.speakers-section h2 {
  margin: 0 0 14px;
  font-size: 24px;
}

.speaker-placeholder-wrap {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.speaker-placeholder {
  border: 1px dashed #c9c3b9;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  color: #566375;
  min-height: 84px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 980px) {
  .program-grid,
  .speaker-placeholder-wrap {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 750px) {
  .symposium-page {
    padding: 76px 12px 40px;
  }

  .hero,
  .focus-areas,
  .program-card,
  .speakers-section {
    padding: 16px;
  }

  h1 {
    margin: 12px 0 12px;
    font-size: 24px;
    line-height: 1.2;
  }

  .meta {
    margin: 0 0 14px;
    font-size: 14px;
    padding: 7px 11px;
  }

  .eyebrow {
    font-size: 10px;
    letter-spacing: 1.3px;
  }

  .lead {
    font-size: 15px;
    line-height: 1.42;
  }

  .focus-areas {
    margin-top: 16px;
  }

  .focus-areas h2,
  .program-card h2,
  .speakers-section h2 {
    font-size: 20px;
    margin-bottom: 12px;
  }

  .focus-areas ul {
    gap: 8px;
    font-size: 14px;
    padding-left: 18px;
  }

  .slot h3 {
    font-size: 16px;
    line-height: 1.32;
  }

  .time {
    font-size: 12px;
  }

  .slot p,
  .compact-row p {
    font-size: 14px;
  }

  .slot {
    margin-bottom: 14px;
    padding-bottom: 14px;
  }

  .speaker-placeholder {
    min-height: 64px;
    padding: 14px;
    font-size: 14px;
  }
}

@media (max-width: 420px) {
  .symposium-page {
    padding-top: 70px;
  }

  h1 {
    font-size: 22px;
  }
}
</style>
