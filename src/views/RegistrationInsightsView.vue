<template>
  <main class="insights-dashboard">
    <div class="orb orb-a"></div>
    <div class="orb orb-b"></div>
    <div class="orb orb-c"></div>

    <section v-if="!isAuthorized" class="gate-wrap">
      <article class="gate-card">
        <p class="eyebrow">Private Analytics</p>
        <h1>Restricted Dashboard</h1>
        <p>
          This page is intentionally hidden from the website navigation and can
          only be opened with the private URL.
        </p>
        <p class="hint">
          Ask for the full link that includes the access query key.
        </p>
      </article>
    </section>

    <section v-else class="dash-content">
      <header class="hero reveal">
        <p class="eyebrow">Symposium Registration Insights</p>
        <h1>Registration Insights Dashboard</h1>
        <p class="sub">
          Snapshot based on deduplicated exports, with affiliation normalization
          and attendance behavior metrics.
        </p>
        <p class="stamp">Updated: {{ stats.meta.updatedOn }}</p>
      </header>

      <section class="kpis reveal" style="--delay: 120ms">
        <article class="kpi-card">
          <p class="kpi-label">Unique submissions</p>
          <p class="kpi-value">{{ stats.meta.totalSubmissions }}</p>
        </article>
        <article class="kpi-card">
          <p class="kpi-label">Radboud UMC share</p>
          <p class="kpi-value">{{ radboudShare }}%</p>
        </article>
        <article class="kpi-card">
          <p class="kpi-label">Unknown affiliation</p>
          <p class="kpi-value">{{ stats.meta.missingAffiliations }}</p>
        </article>
        <article class="kpi-card">
          <p class="kpi-label">Both defenses</p>
          <p class="kpi-value">{{ bothDefenses }}</p>
        </article>
      </section>

      <section class="grid">
        <article class="panel reveal" style="--delay: 180ms">
          <h2>Role Distribution</h2>
          <ul class="bar-list">
            <li v-for="item in stats.roleDistribution" :key="item.label">
              <div class="bar-meta">
                <span>{{ item.label }}</span>
                <strong>{{ item.count }}</strong>
              </div>
              <div class="bar-track">
                <div
                  class="bar-fill pink"
                  :style="{
                    '--target': `${percent(item.count, maxRoleCount)}%`,
                  }"
                ></div>
              </div>
            </li>
          </ul>
        </article>

        <article class="panel reveal" style="--delay: 230ms">
          <h2>Defense Interest</h2>
          <div class="defense-wrap">
            <div class="donut" :style="{ background: defenseGradient }"></div>
            <ul class="legend">
              <li
                v-for="(item, idx) in stats.defenseInterest"
                :key="item.label"
                class="legend-row"
              >
                <span
                  class="dot"
                  :style="{ background: defenseColors[idx] }"
                ></span>
                <span>{{ item.label }}</span>
                <strong>{{ item.count }}</strong>
              </li>
            </ul>
          </div>
        </article>

        <article class="panel reveal" style="--delay: 280ms">
          <h2>Event Choices</h2>
          <ul class="bar-list">
            <li v-for="item in stats.eventSelections" :key="item.label">
              <div class="bar-meta">
                <span>{{ item.label }}</span>
                <strong>{{ item.count }}</strong>
              </div>
              <div class="bar-track">
                <div
                  class="bar-fill orange"
                  :style="{
                    '--target': `${percent(
                      item.count,
                      stats.meta.totalSubmissions
                    )}%`,
                  }"
                ></div>
              </div>
            </li>
          </ul>
        </article>

        <article class="panel reveal" style="--delay: 330ms">
          <h2>Top Affiliations (Normalized)</h2>
          <ul class="aff-list">
            <li v-for="item in stats.topAffiliations" :key="item.label">
              <span>{{ item.label }}</span>
              <strong>{{ item.count }}</strong>
            </li>
          </ul>
        </article>

        <article class="panel reveal" style="--delay: 380ms">
          <h2>Selections Per Person</h2>
          <ul class="hist-list">
            <li
              v-for="bucket in stats.selectionHistogram"
              :key="bucket.selected"
            >
              <p>{{ bucket.selected }} picks</p>
              <div class="bar-track">
                <div
                  class="bar-fill violet"
                  :style="{
                    '--target': `${percent(bucket.count, maxHistogramCount)}%`,
                  }"
                ></div>
              </div>
              <strong>{{ bucket.count }}</strong>
            </li>
          </ul>
        </article>

        <article class="panel reveal heatmap-panel" style="--delay: 430ms">
          <h2>Role vs Event Heatmap</h2>
          <div class="heatmap">
            <div class="heat-head empty"></div>
            <div
              v-for="event in stats.roleEventHeatmap.events"
              :key="event"
              class="heat-head"
            >
              {{ event }}
            </div>
            <template
              v-for="row in stats.roleEventHeatmap.rows"
              :key="`row-${row.role}`"
            >
              <div class="heat-role">{{ row.role }}</div>
              <div
                v-for="(value, idx) in row.counts"
                :key="`${row.role}-${idx}`"
                class="heat-cell"
                :style="{
                  backgroundColor: heatColor(value),
                }"
              >
                {{ value }}
              </div>
            </template>
          </div>
        </article>
      </section>

      <section class="panel reveal submissions-panel" style="--delay: 500ms">
        <div class="submissions-head">
          <div>
            <h2>Submission Details (Cleaned)</h2>
            <p>
              Normalized affiliation labels with full event choices per
              submission.
            </p>
          </div>
          <a
            class="download-btn"
            href="/data/registration_submissions_raw.csv"
            download
          >
            Download Raw CSV
          </a>
        </div>

        <div class="filters">
          <input
            v-model.trim="search"
            type="text"
            placeholder="Search name, email, or affiliation"
          />
          <select v-model="roleFilter">
            <option value="All">All roles</option>
            <option v-for="role in roleOptions" :key="role" :value="role">
              {{ role }}
            </option>
          </select>
        </div>

        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Affiliation</th>
                <th>Events</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in filteredSubmissions" :key="row.id">
                <td>{{ row.name || "-" }}</td>
                <td>{{ row.email || "-" }}</td>
                <td>{{ row.role || "-" }}</td>
                <td>
                  <div class="aff-cell">
                    <strong>{{ row.affiliation || "-" }}</strong>
                    <span v-if="row.affiliationRaw" class="aff-raw">
                      Raw: {{ row.affiliationRaw }}
                    </span>
                  </div>
                </td>
                <td>
                  <div class="chips">
                    <span
                      v-for="event in row.events"
                      :key="`${row.id}-${event}`"
                      class="chip"
                    >
                      {{ event }}
                    </span>
                    <span
                      v-if="row.events.length === 0"
                      class="chip chip-muted"
                    >
                      No event selected
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </section>
  </main>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import stats from "@/assets/data/registrationInsightsStats.json";
import submissions from "@/assets/data/registrationSubmissions.json";

const route = useRoute();
const defaultAccessKey = "cai-symposium-94";
const configuredAccessKey =
  process.env.VUE_APP_INSIGHTS_KEY || defaultAccessKey;

const isAuthorized = computed(() => route.query.k === configuredAccessKey);
const search = ref("");
const roleFilter = ref("All");

const maxRoleCount = Math.max(...stats.roleDistribution.map((x) => x.count));
const maxHistogramCount = Math.max(
  ...stats.selectionHistogram.map((x) => x.count)
);
const maxHeatValue = Math.max(
  ...stats.roleEventHeatmap.rows.flatMap((row) => row.counts)
);

const radboudCount =
  stats.topAffiliations.find((x) => x.label === "Radboud UMC")?.count || 0;
const radboudShare = Math.round(
  (radboudCount / stats.meta.totalSubmissions) * 100
);
const bothDefenses =
  stats.defenseInterest.find((x) => x.label === "Both defenses")?.count || 0;
const roleOptions = Array.from(
  new Set(submissions.map((row) => row.role).filter(Boolean))
).sort((a, b) => a.localeCompare(b));

const defenseColors = ["#e02090", "#ff7a00", "#16a34a", "#64748b"];
const defenseGradient = computed(() => {
  const total = stats.meta.totalSubmissions || 1;
  let start = 0;
  const parts = stats.defenseInterest.map((item, idx) => {
    const slice = (item.count / total) * 100;
    const end = start + slice;
    const out = `${defenseColors[idx]} ${start}% ${end}%`;
    start = end;
    return out;
  });
  return `conic-gradient(${parts.join(", ")})`;
});

function percent(value, max) {
  if (!max) return 0;
  return Math.round((value / max) * 100);
}

function heatColor(value) {
  const ratio = maxHeatValue ? value / maxHeatValue : 0;
  const start = [248, 236, 245];
  const end = [224, 32, 144];
  const mixed = start.map((s, i) => Math.round(s + (end[i] - s) * ratio));
  return `rgb(${mixed[0]}, ${mixed[1]}, ${mixed[2]})`;
}

const filteredSubmissions = computed(() => {
  const q = search.value.toLowerCase();
  return submissions
    .filter(
      (row) => roleFilter.value === "All" || row.role === roleFilter.value
    )
    .filter((row) => {
      if (!q) return true;
      const haystack = [
        row.name,
        row.email,
        row.affiliation,
        row.affiliationRaw,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    })
    .sort((a, b) => a.name.localeCompare(b.name));
});
</script>

<style scoped>
@font-face {
  font-family: "Nunito Sans Local";
  src: url("@/assets/fonts/nunito-sans/NunitoSans-Regular.ttf")
    format("truetype");
  font-weight: 400;
}

@font-face {
  font-family: "Nunito Sans Local";
  src: url("@/assets/fonts/nunito-sans/NunitoSans-Bold.ttf") format("truetype");
  font-weight: 700;
}

.insights-dashboard {
  position: relative;
  min-height: 100vh;
  padding: 6.5rem 1.25rem 3rem;
  background: radial-gradient(circle at 10% 10%, #2b1835 0, #111820 35%),
    linear-gradient(140deg, #111820 0%, #1d2430 42%, #151b24 100%);
  color: #f3f5f9;
  overflow: hidden;
  font-family: "Nunito Sans Local", "Segoe UI", sans-serif;
}

.dash-content {
  position: relative;
  z-index: 2;
  max-width: 1200px;
  margin: 0 auto;
}

.orb {
  position: absolute;
  border-radius: 999px;
  filter: blur(6px);
  opacity: 0.5;
  animation: floaty 8s ease-in-out infinite;
}

.orb-a {
  width: 220px;
  height: 220px;
  top: 70px;
  right: 7%;
  background: rgba(224, 32, 144, 0.28);
}

.orb-b {
  width: 280px;
  height: 280px;
  bottom: 80px;
  left: -90px;
  background: rgba(255, 122, 0, 0.2);
  animation-delay: 1.6s;
}

.orb-c {
  width: 180px;
  height: 180px;
  top: 40%;
  right: 34%;
  background: rgba(59, 130, 246, 0.16);
  animation-delay: 3.2s;
}

.hero h1 {
  margin: 0.2rem 0 0.6rem;
  font-size: clamp(1.8rem, 4vw, 3rem);
  line-height: 1.05;
}

.eyebrow {
  margin: 0;
  color: #f5a6d4;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.78rem;
  font-weight: 700;
}

.sub {
  margin: 0;
  max-width: 720px;
  color: rgba(248, 250, 252, 0.84);
}

.stamp {
  margin-top: 0.9rem;
  font-size: 0.9rem;
  color: rgba(248, 250, 252, 0.65);
}

.kpis {
  margin-top: 1.5rem;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.8rem;
}

.kpi-card,
.panel,
.gate-card {
  background: linear-gradient(
    160deg,
    rgba(255, 255, 255, 0.12),
    rgba(255, 255, 255, 0.04)
  );
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 14px;
  backdrop-filter: blur(10px);
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.24);
}

.kpi-card {
  padding: 0.9rem 1rem;
}

.kpi-label {
  margin: 0;
  font-size: 0.8rem;
  color: rgba(241, 245, 249, 0.74);
}

.kpi-value {
  margin: 0.3rem 0 0;
  font-size: clamp(1.4rem, 3vw, 2rem);
  font-weight: 700;
  color: #fff;
}

.grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.panel {
  padding: 1rem;
}

.panel h2 {
  margin: 0 0 0.8rem;
  font-size: 1rem;
  color: #fff;
}

.panel:nth-child(1),
.panel:nth-child(2),
.panel:nth-child(3),
.panel:nth-child(4) {
  grid-column: span 6;
}

.panel:nth-child(5),
.panel:nth-child(6) {
  grid-column: span 12;
}

.bar-list,
.aff-list,
.legend,
.hist-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.bar-list li,
.hist-list li {
  margin-bottom: 0.65rem;
}

.bar-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.bar-track {
  height: 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.14);
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  width: var(--target);
  transform-origin: left center;
  animation: loadBar 1.2s cubic-bezier(0.19, 1, 0.22, 1) both;
}

.bar-fill.pink {
  background: linear-gradient(90deg, #ff6bc0, #e02090);
}

.bar-fill.orange {
  background: linear-gradient(90deg, #ffd166, #ff7a00);
}

.bar-fill.violet {
  background: linear-gradient(90deg, #8b5cf6, #6366f1);
}

.defense-wrap {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 1rem;
  align-items: center;
}

.donut {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  margin: 0 auto;
  position: relative;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.14);
}

.donut::after {
  content: "";
  position: absolute;
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background: #1a202b;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.legend-row {
  display: grid;
  grid-template-columns: 14px 1fr auto;
  gap: 0.55rem;
  align-items: center;
  font-size: 0.9rem;
  padding: 0.2rem 0;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
}

.aff-list li,
.hist-list li {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.8rem;
  align-items: center;
  padding: 0.45rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.aff-list li:last-child {
  border-bottom: 0;
}

.hist-list li {
  grid-template-columns: 78px 1fr auto;
}

.heatmap {
  display: grid;
  grid-template-columns: 150px repeat(5, minmax(100px, 1fr));
  gap: 0.45rem;
  align-items: stretch;
}

.heat-head,
.heat-role,
.heat-cell {
  border-radius: 8px;
  padding: 0.55rem 0.45rem;
  font-size: 0.8rem;
}

.heat-head {
  background: rgba(255, 255, 255, 0.08);
  font-weight: 700;
}

.empty {
  background: transparent;
}

.heat-role {
  background: rgba(255, 255, 255, 0.14);
  font-weight: 700;
}

.heat-cell {
  color: #111820;
  font-weight: 700;
  text-align: center;
}

.gate-wrap {
  position: relative;
  z-index: 2;
  min-height: 72vh;
  display: grid;
  place-items: center;
}

.gate-card {
  max-width: 540px;
  padding: 1.5rem;
  text-align: left;
}

.gate-card h1 {
  margin: 0.35rem 0 0.6rem;
}

.submissions-panel {
  margin-top: 1rem;
}

.submissions-head {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  margin-bottom: 0.75rem;
}

.submissions-head p {
  margin: 0.35rem 0 0;
  color: rgba(248, 250, 252, 0.75);
  font-size: 0.92rem;
}

.download-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.55rem 0.9rem;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(90deg, #e02090, #ff7a00);
  border: 1px solid rgba(255, 255, 255, 0.24);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.download-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 8px 22px rgba(224, 32, 144, 0.32);
}

.filters {
  display: grid;
  grid-template-columns: 1fr 200px;
  gap: 0.7rem;
  margin-bottom: 0.8rem;
}

.filters input,
.filters select {
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(17, 24, 32, 0.5);
  color: #fff;
  padding: 0.55rem 0.7rem;
  font: inherit;
}

.table-wrap {
  overflow: auto;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.14);
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 880px;
  background: rgba(9, 13, 18, 0.35);
}

thead th {
  text-align: left;
  padding: 0.7rem 0.65rem;
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(241, 245, 249, 0.8);
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

tbody td {
  vertical-align: top;
  padding: 0.7rem 0.65rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 0.92rem;
}

.aff-cell {
  display: grid;
  gap: 0.2rem;
}

.aff-raw {
  color: rgba(248, 250, 252, 0.64);
  font-size: 0.75rem;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.chip {
  display: inline-flex;
  padding: 0.18rem 0.45rem;
  border-radius: 999px;
  font-size: 0.75rem;
  color: #ffe8f7;
  background: rgba(224, 32, 144, 0.24);
  border: 1px solid rgba(224, 32, 144, 0.35);
}

.chip-muted {
  color: rgba(241, 245, 249, 0.8);
  background: rgba(148, 163, 184, 0.2);
  border-color: rgba(148, 163, 184, 0.4);
}

.hint {
  margin: 0.8rem 0 0;
  color: rgba(249, 250, 251, 0.7);
}

.reveal {
  animation: liftIn 0.9s cubic-bezier(0.19, 1, 0.22, 1) both;
  animation-delay: var(--delay, 0ms);
}

@keyframes floaty {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-14px);
  }
}

@keyframes liftIn {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes loadBar {
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
}

@media (max-width: 1024px) {
  .kpis {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .panel:nth-child(1),
  .panel:nth-child(2),
  .panel:nth-child(3),
  .panel:nth-child(4),
  .panel:nth-child(5),
  .panel:nth-child(6) {
    grid-column: span 12;
  }
}

@media (max-width: 760px) {
  .insights-dashboard {
    padding-top: 5.8rem;
  }

  .kpis {
    grid-template-columns: 1fr;
  }

  .defense-wrap {
    grid-template-columns: 1fr;
    justify-items: center;
  }

  .hist-list li {
    grid-template-columns: 64px 1fr auto;
  }

  .heatmap {
    grid-template-columns: 120px repeat(5, minmax(88px, 1fr));
    overflow-x: auto;
  }

  .submissions-head {
    flex-direction: column;
    align-items: flex-start;
  }

  .filters {
    grid-template-columns: 1fr;
  }
}
</style>
