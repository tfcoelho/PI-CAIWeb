<template>
  <main class="symposium-page">
    <section class="hero">
      <p class="eyebrow">PI-CAI Symposium</p>
      <h1>
        Artificial Intelligence for Prostate Cancer Diagnosis and Screening on
        MRI: Current Practice, Evidence Gaps, and the Research Agenda
      </h1>
      <p class="meta">June 1 | Radboud University, Nijmegen</p>
      <p class="lead">
        Artificial intelligence (AI) is rapidly transforming prostate cancer
        detection on MRI. A growing body of evidence demonstrates the potential
        of AI systems, yet their translation into routine clinical practice
        remains limited. Key challenges include critically appraising the
        current evidence base, identifying gaps between research settings and
        real-world clinical environments, and determining how efficacy observed
        in studies can be reliably translated into clinical benefit.
      </p>
      <p class="lead second">
        This symposium brings together experts from radiology, urology,
        epidemiology, and industry to examine the current state of evidence,
        define priorities for future research, and discuss how AI can be
        effectively integrated into clinical workflows. We will focus on
        benchmarking and the retrospective evidence base required for safe and
        effective AI; quantifying the harm-to-benefit trade-offs associated with
        different AI–radiologist clinical workflows; scaling validation across
        diverse populations and care settings; and leveraging AI for capacity
        expansion and cost-effective population-level screening.
      </p>
      <button class="register-btn" @click="scrollToRegister">
        Register Now
      </button>
    </section>

    <section class="venue-section">
      <h2>Venue</h2>
      <div class="venue-grid">
        <a
          v-for="venue in venues"
          :key="venue.name"
          :href="venue.mapsUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="venue-card"
        >
          <p class="venue-label">{{ venue.label }}</p>
          <p class="venue-name">{{ venue.name }}</p>
          <p class="venue-address">
            <template v-for="(line, i) in venue.address" :key="i"
              >{{ line }}<br v-if="i < venue.address.length - 1"
            /></template>
          </p>
          <p class="venue-cta">Open in Maps ↗</p>
        </a>
      </div>
    </section>

    <section class="program-grid">
      <article class="program-card">
        <h2>Morning Program</h2>

        <div class="compact-row compact-row--divider">
          <p><strong>08:30-09:00</strong> Walk-in</p>
        </div>

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
        </div>

        <div class="compact-row compact-row--divider">
          <p><strong>10:30-11:00</strong> Break</p>
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

        <div class="compact-row compact-row--divider">
          <p><strong>16:00-16:30</strong> Break</p>
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

    <section id="register" class="register-section">
      <h2>Register</h2>
      <p class="register-lead">
        Attendance is free. Fill in the form below to reserve your spot.
      </p>
      <div data-fs-success class="form-success">
        Thanks for registering! We'll be in touch closer to the event.
      </div>
      <div data-fs-error class="form-error"></div>
      <form id="symposium-register" class="register-form">
        <div class="form-row">
          <div class="form-group">
            <label for="name">Full name</label>
            <input
              id="name"
              type="text"
              name="name"
              required
              placeholder="Jane Smith"
              data-fs-field
            />
            <span data-fs-error="name" class="field-error"></span>
          </div>
          <div class="form-group">
            <label for="email">Email address</label>
            <input
              id="email"
              type="email"
              name="email"
              required
              placeholder="jane@institution.edu"
              data-fs-field
            />
            <span data-fs-error="email" class="field-error"></span>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="affiliation">Institution / Affiliation</label>
            <input
              id="affiliation"
              type="text"
              name="affiliation"
              required
              placeholder="Radboud University"
              data-fs-field
            />
            <span data-fs-error="affiliation" class="field-error"></span>
          </div>
          <div class="form-group">
            <label for="role">Role</label>
            <select id="role" name="role" required data-fs-field>
              <option value="" disabled selected>Select your role</option>
              <option>Clinician</option>
              <option>Researcher</option>
              <option>Industry</option>
              <option>Student</option>
              <option>Other</option>
            </select>
            <span data-fs-error="role" class="field-error"></span>
          </div>
        </div>
        <div class="form-group">
          <span class="form-group-label">I plan to attend</span>
          <div class="checkbox-grid">
            <label class="checkbox-item checkbox-item--all">
              <input
                type="checkbox"
                :checked="allSelected"
                @change="toggleAll"
              />
              Full program
            </label>
            <label
              class="checkbox-item"
              v-for="option in attendOptions"
              :key="option"
            >
              <input
                type="checkbox"
                name="attend[]"
                :value="option"
                v-model="selected"
              />
              {{ option }}
            </label>
          </div>
        </div>
        <button
          type="submit"
          class="register-btn register-btn--submit"
          data-fs-submit-btn
        >
          Submit Registration
        </button>
      </form>
    </section>

    <section class="speakers-section">
      <h2>Speakers</h2>
      <div class="speaker-placeholder-wrap">
        <div v-for="i in 3" :key="i" class="speaker-placeholder">
          Speakers to be announced
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed } from "vue";
import { initForm } from "@formspree/ajax/dist/index.mjs";

const attendOptions = [
  "Morning program",
  "Lunch (included)",
  "PhD defense Jasper",
  "PhD defense Anindo",
  "Borrel (included)",
];
const selected = ref([]);
const allSelected = computed(
  () => selected.value.length === attendOptions.length
);
function toggleAll() {
  selected.value = allSelected.value ? [] : [...attendOptions];
}

const venues = [
  {
    label: "Morning Program",
    name: "Theaterzaal C",
    address: ["Heyendaalseweg 141", "6525 AJ, Nijmegen", "The Netherlands"],
    mapsUrl: "https://maps.google.com/?q=Heyendaalseweg+141,+6525+AJ+Nijmegen",
  },
  {
    label: "Afternoon Program",
    name: "De Aula",
    address: ["Comeniuslaan 2", "6525 HP, Nijmegen", "The Netherlands"],
    mapsUrl: "https://maps.google.com/?q=Comeniuslaan+2,+6525+HP+Nijmegen",
  },
];

function scrollToRegister() {
  document.getElementById("register").scrollIntoView({ behavior: "smooth" });
}

let originalBackgroundColor;

onMounted(() => {
  originalBackgroundColor = document.body.style.backgroundColor;
  document.body.style.backgroundColor = "#EBEBF5";
  initForm({ formElement: "#symposium-register", formId: "mojpkqyl" });
});

onUnmounted(() => {
  document.body.style.backgroundColor = originalBackgroundColor;
});
</script>

<style scoped>
.symposium-page {
  --research-bg: #ebebf5;
  --research-card: #ffffff;
  --research-border: #d8d8e6;
  --research-text: #111111;
  --research-muted: #666666;
  --research-accent: #e02090;

  min-height: 100vh;
  max-width: 1100px;
  margin: 0 auto;
  padding: 110px 28px 80px;
  color: var(--research-text);
  text-align: left;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif;
  background-color: var(--research-bg);
}

.hero {
  background: linear-gradient(140deg, #ffffff, #f7f5ff);
  border: 1px solid var(--research-border);
  border-radius: 20px;
  padding: 34px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.eyebrow {
  margin: 0;
  font-size: 12px;
  letter-spacing: 1.6px;
  text-transform: uppercase;
  color: var(--research-accent);
  font-weight: 800;
}

h1 {
  margin: 14px 0 16px;
  font-size: 38px;
  line-height: 1.15;
  color: var(--research-text);
}

.meta {
  margin: 0 0 22px;
  font-size: 17px;
  font-weight: 700;
  color: #333333;
  display: inline-block;
  background: #f7f5ff;
  border: 1px solid var(--research-border);
  border-radius: 999px;
  padding: 8px 14px;
}

.register-btn {
  display: inline-block;
  margin-top: 24px;
  padding: 12px 28px;
  background: var(--research-accent);
  color: #ffffff;
  font-size: 15px;
  font-weight: 700;
  border-radius: 999px;
  text-decoration: none;
  outline: none;
  border: none;
  transition: opacity 0.15s;
}

.register-btn:hover {
  opacity: 0.85;
}

.register-btn:focus,
.register-btn:focus-visible {
  outline: none;
  box-shadow: none;
}

.register-btn--submit {
  border: none;
  cursor: pointer;
  font-family: inherit;
  margin-top: 0;
}

.register-section {
  margin-top: 26px;
  background: var(--research-card);
  border-radius: 16px;
  border: 1px solid var(--research-border);
  padding: 32px 28px;
}

.register-section h2 {
  margin: 0 0 6px;
  font-size: 24px;
}

.register-lead {
  margin: 0 0 24px;
  color: var(--research-muted);
  font-size: 15px;
}

.form-success {
  display: none;
  padding: 14px 18px;
  background: #edfaf3;
  border: 1px solid #6fcf97;
  border-radius: 10px;
  color: #1a7a45;
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 16px;
}

.form-error {
  display: none;
  padding: 14px 18px;
  background: #fff0f0;
  border: 1px solid #f87171;
  border-radius: 10px;
  color: #b91c1c;
  font-size: 14px;
  margin-bottom: 16px;
}

.field-error {
  font-size: 12px;
  color: #b91c1c;
}

.form-group-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--research-text);
  display: block;
  margin-bottom: 10px;
}

.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}

.checkbox-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  padding: 10px 14px;
  border: 1px solid var(--research-border);
  border-radius: 8px;
  cursor: pointer;
  background: #fafafa;
  transition: border-color 0.15s, background 0.15s;
}

.checkbox-item:hover {
  border-color: var(--research-accent);
  background: #fff;
}

.checkbox-item--all {
  font-weight: 700;
  border-color: var(--research-accent);
  color: var(--research-accent);
}

.checkbox-item input[type="checkbox"] {
  accent-color: var(--research-accent);
  width: 15px;
  height: 15px;
  flex-shrink: 0;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 13px;
  font-weight: 600;
  color: var(--research-text);
}

.form-group input,
.form-group select {
  padding: 10px 14px;
  border: 1px solid var(--research-border);
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  background: #fafafa;
  color: var(--research-text);
  transition: border-color 0.15s;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--research-accent);
}

.meta-link {
  color: inherit;
  text-decoration: underline;
  text-decoration-color: rgba(0, 0, 0, 0.3);
  text-underline-offset: 2px;
}

.meta-link:hover {
  text-decoration-color: currentColor;
}

.lead {
  margin: 0;
  font-size: 18px;
  line-height: 1.5;
  color: var(--research-muted);
  text-align: justify;
}

.lead strong {
  color: var(--research-text);
}

.lead.second {
  margin-top: 12px;
}

.focus-areas {
  margin-top: 26px;
  background: var(--research-card);
  border-radius: 16px;
  border: 1px solid var(--research-border);
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

.venue-section {
  margin-top: 26px;
  background: var(--research-card);
  border-radius: 16px;
  border: 1px solid var(--research-border);
  padding: 24px 28px;
}

.venue-section h2 {
  margin: 0 0 16px;
  font-size: 24px;
}

.venue-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.venue-card {
  display: block;
  text-decoration: none;
  color: var(--research-text);
  background: #f7f5ff;
  border: 1px solid var(--research-border);
  border-radius: 12px;
  padding: 18px 20px;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.venue-card:hover {
  border-color: var(--research-accent);
  box-shadow: 0 2px 8px rgba(224, 32, 144, 0.1);
}

.venue-label {
  margin: 0 0 6px;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  color: var(--research-accent);
}

.venue-name {
  margin: 0 0 8px;
  font-size: 20px;
  font-weight: 700;
}

.venue-address {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--research-muted);
}

.venue-cta {
  margin: 12px 0 0;
  font-size: 13px;
  font-weight: 600;
  color: var(--research-accent);
}

.program-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  margin-top: 24px;
}

.program-card {
  background: var(--research-card);
  border: 1px solid var(--research-border);
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.program-card h2 {
  margin: 0 0 20px;
  font-size: 24px;
}

.slot {
  margin-bottom: 18px;
  padding-bottom: 18px;
  border-bottom: 1px solid #ececf5;
}

.slot:last-of-type {
  margin-bottom: 10px;
}

.time {
  margin: 0;
  font-size: 13px;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  color: var(--research-accent);
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
  color: #333333;
  font-weight: 700;
}

.compact-row p {
  margin: 8px 0 0;
}

.compact-row--divider {
  padding-bottom: 18px;
  margin-bottom: 18px;
  border-bottom: 1px solid #ececf5;
}

.speakers-section {
  margin-top: 26px;
  background: var(--research-card);
  border: 1px solid var(--research-border);
  border-radius: 16px;
  padding: 24px 28px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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
  border: 1px dashed #b7b7d1;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  color: var(--research-muted);
  min-height: 84px;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 980px) {
  .program-grid,
  .venue-grid,
  .speaker-placeholder-wrap {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .checkbox-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
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
