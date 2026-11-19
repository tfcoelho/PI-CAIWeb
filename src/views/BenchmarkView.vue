<template>
  <div class="benchmark-page">
    <div class="benchmark-header">
      <div class="logo-and-title">
        <router-link
          to="/"
          class="header-logo-glass"
          aria-label="Go to home page"
        >
          <img
            src="@/assets/images/logo_dark.png"
            alt="PI-CAI logo"
            class="header-logo"
          />
        </router-link>
        <h1 class="page-title">Benchmark</h1>
      </div>
    </div>

    <div ref="tabBar" class="tab-filter" role="tablist" :style="indicatorStyle">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        :ref="(el) => (tabButtons[tab.key] = el)"
        :class="['tab-btn', { active: activeTab === tab.key }]"
        role="tab"
        :aria-selected="activeTab === tab.key"
        @click="selectTab(tab.key)"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="benchmark-wrapper">
      <section
        v-for="block in activeBlocks"
        :key="block.id"
        class="benchmark-card"
      >
        <header class="card-header">
          <h2 class="card-title">{{ block.title }}</h2>
          <p v-if="block.description" class="card-description">
            {{ block.description }}
          </p>
        </header>

        <!-- Study with an ensemble AI system and its contributing algorithms -->
        <template v-if="block.kind === 'ensemble'">
          <div class="system-box">
            <div class="system-head">
              <div class="system-info">
                <span class="system-name">{{ block.system.name }}</span>
                <span v-if="block.system.detail" class="system-detail">
                  {{ block.system.detail }}
                </span>
                <span v-if="block.system.cohort" class="card-meta">
                  {{ block.system.cohort }}
                </span>
              </div>
              <div class="score score-large">
                <span class="score-label">AUROC</span>
                <span class="score-value">{{
                  formatAuc(block.system.auc)
                }}</span>
                <span v-if="block.system.ci" class="score-ci">
                  {{ block.system.ciLabel }} {{ formatCi(block.system.ci) }}
                </span>
              </div>
            </div>

            <!-- What the AI system is made of: nested inside its box -->
            <div class="system-members">
              <div class="members-head">
                <h3 class="list-heading">Ensemble members</h3>
                <span v-if="block.contributorsNote" class="list-note">
                  {{ block.contributorsNote }}
                </span>
              </div>
              <ol class="result-list ranked">
                <li
                  v-for="(member, i) in block.contributors"
                  :key="i"
                  class="result-row"
                >
                  <span class="rank">{{ i + 1 }}</span>
                  <span class="result-main">
                    <span class="result-name">{{ member.authors }}</span>
                    <span v-if="member.placeholder" class="tbc">
                      To be confirmed
                    </span>
                  </span>
                  <span class="result-score">
                    {{ formatAuc(member.auc, block.contributorsDecimals) }}
                    <span v-if="member.ci" class="score-ci">
                      ({{ formatCi(member.ci, block.contributorsDecimals) }})
                    </span>
                  </span>
                </li>
              </ol>
            </div>
          </div>

          <div v-if="block.readerStudy" class="reader-study">
            <span class="reader-study-label">{{
              block.readerStudy.label
            }}</span>
            <div
              v-for="row in block.readerStudy.rows"
              :key="row.name"
              class="reader-study-row"
            >
              <span>{{ row.name }}</span>
              <span class="reader-study-score">
                {{ formatAuc(row.auc) }}
                <span v-if="row.ci" class="score-ci">
                  ({{ formatCi(row.ci) }})
                </span>
              </span>
            </div>
          </div>
        </template>

        <!-- Plain list of evaluated submissions -->
        <template v-else>
          <div class="list-columns">
            <span>System</span>
            <span>AUROC</span>
          </div>
          <ul class="result-list">
            <li
              v-for="(entry, i) in sortedEntries(block.entries)"
              :key="i"
              class="result-row"
            >
              <span class="result-main">
                <span class="result-name">{{ entry.name }}</span>
                <span v-if="entry.authors" class="result-authors">
                  {{ entry.authors }}
                </span>
                <span v-if="entry.note" class="result-note">
                  {{ entry.note }}
                </span>
                <span v-if="entry.placeholder" class="tbc">
                  To be confirmed
                </span>
              </span>
              <span class="result-score">
                {{ formatAuc(entry.auc, block.decimals) }}
                <span v-if="entry.ci" class="score-ci">
                  ({{ formatCi(entry.ci, block.decimals) }})
                </span>
              </span>
            </li>
          </ul>
        </template>

        <footer v-if="block.paperId" class="card-footer">
          <router-link
            :to="{ name: 'paper', params: { id: block.paperId } }"
            class="card-link"
            >Read the paper &rarr;</router-link
          >
        </footer>
      </section>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  computed,
  watch,
  nextTick,
  onMounted,
  onUnmounted,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import { benchmark } from "@/assets/data/benchmark";

const tabs = [
  { key: "academic", label: "Academic" },
  { key: "industry", label: "Industry" },
];

const route = useRoute();
const router = useRouter();

// The active tab lives in the URL (?tab=industry) so it can be linked to
// directly and survives a refresh.
const activeTab = computed(() =>
  tabs.some((t) => t.key === route.query.tab) ? route.query.tab : "academic"
);
const activeBlocks = computed(() => benchmark[activeTab.value] || []);

function selectTab(key) {
  if (key === activeTab.value) return;
  router.replace({
    query: { ...route.query, tab: key === "academic" ? undefined : key },
  });
}

// Sliding pink underline under the active tab (same look as ResearchView).
const tabBar = ref(null);
const tabButtons = reactive({});
const indicator = reactive({ left: 0, width: 0, visible: false });
const indicatorStyle = computed(() => ({
  "--active-left": `${indicator.left}px`,
  "--active-width": `${indicator.width}px`,
  "--active-opacity": indicator.visible ? 1 : 0,
}));

function updateIndicator() {
  const btn = tabButtons[activeTab.value];
  if (!btn || !tabBar.value) return;
  indicator.left = btn.offsetLeft;
  indicator.width = btn.offsetWidth;
  indicator.visible = true;
}

watch(activeTab, () => nextTick(updateIndicator));

// Highest AUROC first; entries still without a value go last.
function sortedEntries(entries) {
  return [...entries].sort((a, b) => {
    if (a.auc == null && b.auc == null) return 0;
    if (a.auc == null) return 1;
    if (b.auc == null) return -1;
    return b.auc - a.auc;
  });
}

// With a fixed `decimals`, always use it (0.9 -> "0.900"). Otherwise keep the
// precision the value was entered with, but never fewer than two decimals
// (0.9 -> "0.90", 0.8875 -> "0.8875").
function formatAuc(value, decimals) {
  if (value == null) return "—";
  if (decimals != null) return value.toFixed(decimals);
  const entered = (String(value).split(".")[1] || "").length;
  return value.toFixed(Math.max(2, entered));
}

function formatCi(ci, decimals) {
  return `${formatAuc(ci[0], decimals)}–${formatAuc(ci[1], decimals)}`;
}

let originalBackgroundColor;

onMounted(() => {
  // Match the body to the page background so the dark app background doesn't
  // show on either side of the centered column (same as About/Research).
  originalBackgroundColor = document.body.style.backgroundColor;
  document.body.style.backgroundColor = "#EBEBF5";
  nextTick(updateIndicator);
  window.addEventListener("resize", updateIndicator);
});

onUnmounted(() => {
  document.body.style.backgroundColor = originalBackgroundColor;
  window.removeEventListener("resize", updateIndicator);
});
</script>

<style scoped>
.benchmark-page {
  min-height: 100vh;
  padding-top: 60px;
  padding-bottom: 100px;
  max-width: 920px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif;
  background-color: #ebebf5;
}

/* ---- Header (shared look with About / Research) ---- */
.benchmark-header {
  display: flex;
  justify-content: flex-start;
  padding: 20px 20px 24px;
  padding-top: 80px;
}

.logo-and-title {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.header-logo-glass {
  position: fixed;
  top: 20px;
  left: 6%;
  padding: 4px;
  border-radius: 6px;
  background: transparent;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 11;
  text-decoration: none;
  line-height: 0;
}

.header-logo {
  width: 132px;
  height: auto;
  display: block;
}

.page-title {
  font-size: 42px;
  font-weight: 600;
  margin: 0 0 0 20px;
  text-align: left;
  color: #111;
}

/* ---- Tabs (same look as Research tag filter) ---- */
.tab-filter {
  display: flex;
  gap: 10px;
  margin: 0 20px 30px;
  padding-bottom: 4px;
  border-bottom: 1px solid #666666;
  position: relative;
}

.tab-filter::after {
  content: "";
  position: absolute;
  bottom: 0;
  height: 2px;
  background-color: #e02090;
  left: var(--active-left, 0);
  width: var(--active-width, 0);
  opacity: var(--active-opacity, 0);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.tab-btn {
  background: none;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #666;
  cursor: pointer;
  border-radius: 4px;
  transition: color 0.2s ease;
  text-transform: uppercase;
  letter-spacing: -0.01em;
  line-height: 20px;
  font-family: inherit;
}

.tab-btn:hover,
.tab-btn.active {
  color: #333;
}

/* ---- Cards ---- */
.benchmark-wrapper {
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.benchmark-card {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 36px 44px;
  text-align: left;
}

.card-header {
  margin-bottom: 24px;
}

.card-title {
  font-size: 24px;
  font-weight: 600;
  color: #111;
  margin: 0 0 8px;
}

.card-description {
  font-size: 16px;
  line-height: 1.6;
  color: #444;
  margin: 0;
}

.card-meta {
  font-size: 13px;
  color: #777;
  margin: 10px 0 0;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

/* Highlighted AI system box */
.system-box {
  padding: 20px 24px;
  border: 1px solid #e0209044;
  border-left: 4px solid #e02090;
  border-radius: 6px;
  background: #e020900a;
}

.system-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

/* The algorithms the AI system is built from: nested inside its box,
   indented behind a thin pink rule so they read as its components. */
.system-members {
  margin: 20px 0 4px 8px;
  padding: 4px 0 0 20px;
  border-left: 2px solid #e0209033;
}

.members-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 2px 16px;
  margin-bottom: 2px;
}

.system-members .list-heading {
  margin: 0;
}

.system-members .list-note {
  margin: 0;
  font-size: 12px;
}

.system-members .result-row {
  padding: 10px 0;
  border-bottom-color: #e0209018;
}

.system-members .result-name,
.system-members .result-score {
  font-size: 15px;
}

.system-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.system-name {
  font-size: 20px;
  font-weight: 600;
  color: #111;
}

.system-detail {
  font-size: 14px;
  color: #666;
}

.score {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  flex-shrink: 0;
}

.score-label {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #999;
}

.score-large .score-value {
  font-size: 34px;
  font-weight: 600;
  color: #e02090;
  line-height: 1.1;
  font-feature-settings: "tnum";
}

.score-ci {
  font-size: 13px;
  color: #777;
  font-weight: 400;
}

/* Secondary reader-study comparison under the AI system box */
.reader-study {
  margin-top: 12px;
  padding: 12px 24px 12px 28px;
  border-radius: 6px;
  background: #f6f6fa;
  font-size: 14px;
  color: #555;
}

.reader-study-label {
  display: block;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #999;
  margin-bottom: 6px;
}

.reader-study-row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 3px 0;
}

.reader-study-score {
  font-feature-settings: "tnum";
  font-weight: 600;
  color: #333;
  white-space: nowrap;
}

/* Result lists */
.list-heading {
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #999;
  margin: 32px 0 4px;
}

.list-note {
  font-size: 13px;
  color: #777;
  margin: 0 0 4px;
}

.system-info .card-meta {
  margin-top: 6px;
  font-size: 11px;
}

.list-columns {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #999;
  padding: 0 0 8px;
  border-bottom: 1px solid #eee;
}

.result-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.result-row {
  display: flex;
  align-items: baseline;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid #eee;
}

.result-row:last-child {
  border-bottom: none;
}

.rank {
  width: 22px;
  flex-shrink: 0;
  font-size: 14px;
  font-weight: 600;
  color: #e02090;
  font-feature-settings: "tnum";
}

.result-main {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px 12px;
}

.result-name {
  font-size: 16px;
  color: #222;
}

.result-authors {
  font-size: 14px;
  color: #777;
}

/* In plain submission lists, the system name gets its own line with the
   authors and the leaderboard phase underneath. */
.result-list:not(.ranked) .result-name {
  flex-basis: 100%;
  font-weight: 500;
}

.result-note {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #999;
}

.result-score {
  font-size: 16px;
  font-weight: 600;
  color: #111;
  font-feature-settings: "tnum";
  white-space: nowrap;
}

.tbc {
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 2px 8px;
  border-radius: 4px;
  background: #e0a72e22;
  color: #a0741c;
}

.card-footer {
  margin-top: 24px;
}

.card-link {
  font-size: 15px;
  color: #333;
  text-decoration: underline;
}

.card-link:hover {
  color: #e02090;
}

@media (max-width: 750px) {
  .benchmark-page {
    padding-top: 40px;
  }

  .header-logo-glass {
    display: none;
  }

  .benchmark-header {
    justify-content: center;
    padding-top: 40px;
  }

  .logo-and-title {
    align-items: center;
  }

  .page-title {
    font-size: 32px;
    margin-left: 0;
  }

  .tab-filter {
    margin: 0 16px 24px;
    justify-content: center;
  }

  .benchmark-wrapper {
    padding: 0 16px;
  }

  .benchmark-card {
    padding: 24px 20px;
  }

  .system-box {
    padding: 16px 18px;
  }

  .system-head {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .system-members {
    margin-left: 0;
    padding-left: 14px;
  }

  .system-members .result-row {
    flex-wrap: wrap;
  }

  .system-members .result-score {
    width: 100%;
    padding-left: 38px;
  }

  .score {
    align-items: flex-start;
  }

  .reader-study {
    padding: 12px 16px;
  }

  .reader-study-row {
    flex-direction: column;
    gap: 0;
    padding: 4px 0;
  }
}
</style>
