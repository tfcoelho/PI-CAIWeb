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

    <!-- No tab bar while there is only one tab (the public /benchmark) -->
    <div
      v-if="tabs.length > 1"
      ref="tabBar"
      class="tab-filter"
      role="tablist"
      :style="indicatorStyle"
    >
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
          <h2 class="card-title">
            <!-- A company's logo stands in for its name -->
            <img
              v-if="block.logo"
              :src="block.logo"
              :alt="block.title"
              class="card-logo"
            />
            <template v-else>{{ block.title }}</template>
          </h2>
          <p v-if="block.description" class="card-description">
            {{ block.description }}
          </p>
        </header>

        <!-- Both analyses side by side: every system gets a score per column
             (1,000-case testing cohort | 400-case reader study). -->
        <div class="results" role="table" :aria-label="block.title">
          <div class="results-head" role="row">
            <span class="cell-name" role="columnheader">System</span>
            <span
              v-for="col in columns"
              :key="col.key"
              class="cell-score"
              role="columnheader"
            >
              <span class="col-title">{{ col.title }}{{ col.marker }}</span>
              <span class="col-subtitle">{{ col.subtitle }}</span>
            </span>
          </div>

          <div
            v-for="(row, r) in block.rows"
            :key="r"
            class="row-group"
            role="rowgroup"
          >
            <div class="result-row" role="row">
              <span class="cell-name" role="cell">
                <span class="row-name"
                  >{{ row.name
                  }}<sup v-if="row.marker" class="row-marker">{{
                    row.marker
                  }}</sup></span
                >
                <!-- A small file icon after the authors opens their write-up
                     (paper or PDF) -->
                <span v-if="row.authors" class="row-authors">
                  <span class="authors-full">{{ row.authors }}</span>
                  <span class="authors-short">{{
                    shortAuthors(row.authors)
                  }}</span>
                  <component
                    :is="sourceLink(row.source).is"
                    v-if="row.source"
                    v-bind="sourceLink(row.source).attrs"
                    class="source-icon"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"
                      />
                      <path d="M14 3v5h5M9 13h6M9 17h6" />
                    </svg>
                  </component>
                </span>
                <span v-if="row.detail" class="row-detail">
                  {{ row.detail }}
                </span>
                <span v-if="row.links" class="row-links">
                  <template v-for="(link, l) in row.links" :key="l">
                    <router-link
                      v-if="link.paper"
                      :to="{ name: 'paper', params: { id: link.paper } }"
                      >{{ link.label }}</router-link
                    >
                    <a
                      v-else
                      :href="link.href"
                      target="_blank"
                      rel="noopener"
                      >{{ link.label }}</a
                    >
                  </template>
                </span>
              </span>
              <span
                v-for="col in columns"
                :key="col.key"
                class="cell-score"
                role="cell"
                :data-title="`${col.title}${col.marker || ''}`"
                :data-subtitle="col.subtitle"
              >
                <span v-if="row.pending" class="score-pending">Pending</span>
                <template v-else-if="row[col.key]">
                  <span class="score-value">{{
                    formatAuc(row[col.key].auc, decimalsFor(row, block))
                  }}</span>
                  <span v-if="row[col.key].ci" class="score-ci">
                    {{ formatCi(row[col.key].ci, decimalsFor(row, block)) }}
                  </span>
                </template>
                <span v-else class="score-missing" title="Not evaluated">
                  —
                </span>
              </span>
            </div>

            <!-- What the AI system is made of: nested inside its box -->
            <div v-if="row.members" class="members">
              <div class="members-label">{{ row.membersLabel }}</div>
              <div
                v-for="(member, i) in row.members"
                :key="i"
                class="result-row member-row"
                role="row"
              >
                <span class="cell-name" role="cell">
                  <span class="rank">{{ i + 1 }}</span>
                  <span class="member-text">
                    <span class="row-name">
                      <span class="authors-full">{{ member.name }}</span>
                      <span class="authors-short">{{
                        shortAuthors(member.name)
                      }}</span>
                      <component
                        :is="sourceLink(member.source).is"
                        v-if="member.source"
                        v-bind="sourceLink(member.source).attrs"
                        class="source-icon"
                      >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path
                            d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"
                          />
                          <path d="M14 3v5h5M9 13h6M9 17h6" />
                        </svg>
                      </component>
                    </span>
                    <span v-if="member.links" class="row-links">
                      <template v-for="(link, l) in member.links" :key="l">
                        <router-link
                          v-if="link.paper"
                          :to="{ name: 'paper', params: { id: link.paper } }"
                          >{{ link.label }}</router-link
                        >
                        <a
                          v-else
                          :href="link.href"
                          target="_blank"
                          rel="noopener"
                          >{{ link.label }}</a
                        >
                      </template>
                    </span>
                  </span>
                </span>
                <span
                  v-for="col in columns"
                  :key="col.key"
                  :class="['cell-score', { 'is-empty': !member[col.key] }]"
                  role="cell"
                >
                  <template v-if="member[col.key]">
                    <span class="score-value">{{
                      formatAuc(member[col.key].auc, row.membersDecimals)
                    }}</span>
                    <span v-if="member[col.key].ci" class="score-ci">
                      {{ formatCi(member[col.key].ci, row.membersDecimals) }}
                    </span>
                  </template>
                  <span v-else class="score-missing" title="Not evaluated">
                    —
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="results-footnote">
          <p v-for="(note, n) in tableNotes" :key="`t${n}`">{{ note }}</p>
          <p v-for="(note, n) in block.footnotes || []" :key="`b${n}`">
            {{ note }}
          </p>
          <!-- Marker notes ("* …") last, so they don't read as covering the
               notes after them -->
          <p v-for="col in notedColumns" :key="col.key">
            {{ col.marker }} {{ col.note }}
          </p>
        </div>

        <footer v-if="block.paperId" class="card-footer">
          <router-link
            :to="{ name: 'paper', params: { id: block.paperId } }"
            class="card-link"
            >Read the paper &rarr;</router-link
          >
        </footer>
      </section>

      <!-- Sources describe the academic results only -->
      <p v-if="activeTab === 'academic'" class="page-sources">
        <strong>Data sources.</strong> Algorithm results are from the
        <a
          href="https://pi-cai.grand-challenge.org/"
          target="_blank"
          rel="noopener"
          >PI-CAI leaderboards on Grand Challenge</a
        >. Results for the PI-CAI AI system and the reader study are from
        <router-link
          :to="{ name: 'paper', params: { id: 'saha2024_lancet_oncology' } }"
          >Saha et al., Lancet Oncology 2024</router-link
        >.
      </p>
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
import { RouterLink, useRoute, useRouter } from "vue-router";
import { benchmark, columns, tableNotes } from "@/assets/data/benchmark";

const route = useRoute();
const router = useRouter();

// The unlisted /benchmark-test-page (route meta `preview`) shows every tab,
// including results not yet public (Industry). /benchmark shows Academic.
const preview = !!route.meta.preview;
const allTabs = [
  { key: "academic", label: "Academic" },
  { key: "industry", label: "Industry", previewOnly: true },
];
const tabs = allTabs.filter((t) => preview || !t.previewOnly);

// The active tab lives in the URL (?tab=industry) so it can be linked to
// directly and survives a refresh.
const activeTab = computed(() =>
  tabs.some((t) => t.key === route.query.tab) ? route.query.tab : "academic"
);
const activeBlocks = computed(() => benchmark[activeTab.value] || []);
const notedColumns = columns.filter((col) => col.marker && col.note);

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

// Where the file icon after a system's authors links to: its paper on our
// Research page (`{ paper: "<id>" }`) or a PDF / other page (`{ href }`).
function sourceLink(source) {
  if (source.paper) {
    return {
      is: RouterLink,
      attrs: {
        to: { name: "paper", params: { id: source.paper } },
        title: "Paper",
        "aria-label": "Paper",
      },
    };
  }
  const label = source.href.endsWith(".pdf")
    ? "Method description (PDF)"
    : "Method description";
  return {
    is: "a",
    attrs: {
      href: source.href,
      target: "_blank",
      rel: "noopener",
      title: label,
      "aria-label": label,
    },
  };
}

// "N. Debs, A. Routier, et al." -> "N. Debs, et al." for narrow screens.
// Lists with a single author before "et al." are left as they are.
function shortAuthors(authors) {
  const names = authors.split(", ").filter((n) => n !== "et al.");
  return names.length > 1 ? `${names[0]}, et al.` : authors;
}

// Fixed precision for a row's scores: its own `decimals`, else the block's.
function decimalsFor(row, block) {
  return row.decimals != null ? row.decimals : block.decimals;
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
let robotsMeta;

onMounted(() => {
  // Keep the preview page out of search engines.
  if (preview) {
    robotsMeta = document.createElement("meta");
    robotsMeta.name = "robots";
    robotsMeta.content = "noindex";
    document.head.appendChild(robotsMeta);
  }
  // Match the body to the page background so the dark app background doesn't
  // show on either side of the centered column (same as About/Research).
  originalBackgroundColor = document.body.style.backgroundColor;
  document.body.style.backgroundColor = "#EBEBF5";
  nextTick(updateIndicator);
  window.addEventListener("resize", updateIndicator);
});

onUnmounted(() => {
  if (robotsMeta) robotsMeta.remove();
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

.card-logo {
  display: block;
  height: 30px;
  width: auto;
  margin: 2px 0 6px;
}

.card-description {
  font-size: 16px;
  line-height: 1.6;
  color: #444;
  margin: 0;
}

/* ---- Results table: name column + one column per analysis ---- */
.results {
  --score-col: 160px;
}

.results-head,
.result-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) repeat(2, var(--score-col));
  column-gap: 24px;
  align-items: baseline;
}

.results-head,
.row-group {
  padding: 0 20px;
}

.results-head {
  padding-bottom: 10px;
  border-bottom: 1px solid #e6e6ee;
  margin-bottom: 6px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #999;
}

.results-head .cell-score {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.col-title {
  font-size: 13px;
  color: #333;
}

.col-subtitle {
  font-weight: 500;
  text-transform: none;
  letter-spacing: 0;
  font-size: 13px;
  color: #888;
}

.result-row {
  padding: 14px 0;
}

.row-group + .row-group {
  border-top: 1px solid #eee;
}

.cell-name {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.row-name {
  font-size: 16px;
  font-weight: 500;
  color: #222;
}

.row-marker {
  margin-left: 1px;
  font-size: 0.7em;
  color: #777;
}

.row-authors {
  font-size: 14px;
  color: #777;
}

.row-detail {
  font-size: 14px;
  color: #666;
}

.cell-score {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-feature-settings: "tnum";
  white-space: nowrap;
}

.score-value {
  font-size: 17px;
  font-weight: 600;
  color: #111;
  line-height: 1.2;
}

.score-ci {
  font-size: 13px;
  color: #777;
  font-weight: 400;
}

.score-missing,
.score-pending {
  font-size: 15px;
  color: #aaa;
}

.score-pending {
  font-style: italic;
}

/* The algorithms the AI system is built from: indented under it behind a
   thin rule, scored in the 1,000-patient column only. The score columns have
   a fixed width, so they still line up with the rows above. */
.members {
  margin: 0 0 10px 8px;
  padding-left: 20px;
  border-left: 2px solid #e6e6ee;
}

.members-label {
  padding-top: 8px;
  padding-bottom: 2px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #999;
}

.member-row {
  padding: 0;
}

.member-row .cell-name {
  flex-direction: row;
  align-items: baseline;
  gap: 0;
  padding-top: 9px;
  padding-bottom: 9px;
}

/* Name and links flow as one line of text, wrapping together */
.member-text {
  min-width: 0;
}

.member-row .row-name,
.member-row .score-value {
  font-size: 15px;
}

.member-row .score-ci {
  font-size: 12px;
}

.rank {
  width: 22px;
  flex-shrink: 0;
  font-size: 14px;
  font-weight: 600;
  color: #999;
  font-feature-settings: "tnum";
}

.results-footnote {
  margin-top: 14px;
  padding-left: 20px;
  font-size: 13px;
  line-height: 1.5;
  color: #888;
}

.results-footnote p {
  margin: 0;
}

/* Paper / Model links under a system's name, separated by a middle dot */
.row-links {
  font-size: 13px;
  color: #999;
}

.row-links a {
  color: #666;
  text-decoration: underline;
  text-decoration-color: #ccc;
  text-underline-offset: 2px;
}

.row-links a:hover {
  color: #e02090;
  text-decoration-color: currentColor;
}

.row-links a + a::before {
  content: "·";
  display: inline-block;
  margin: 0 7px;
  color: #bbb;
  text-decoration: none;
}

.member-row .row-links {
  margin-left: 10px;
  white-space: nowrap;
}

/* File icon after the authors, linking to their write-up. Padding gives it
   a bigger tap target without moving the text. */
.source-icon {
  display: inline-block;
  margin: -4px -4px -4px 2px;
  padding: 4px;
  line-height: 0;
  vertical-align: -2px;
  color: #888;
}

.source-icon svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.source-icon:hover {
  color: #e02090;
}

/* Full author list; first author + "et al." on phones */
.authors-short {
  display: none;
}

.page-sources {
  margin: 4px 4px 0;
  font-size: 13px;
  line-height: 1.6;
  color: #777;
  text-align: left;
}

.page-sources a {
  color: #555;
  text-decoration: underline;
}

.page-sources a:hover {
  color: #e02090;
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

/* Narrower score columns before the layout stacks on phones */
@media (max-width: 920px) {
  .benchmark-card {
    padding: 32px 28px;
  }

  .results {
    --score-col: 128px;
  }

  .results-head,
  .result-row {
    column-gap: 16px;
  }

  .results-head,
  .row-group {
    padding: 0 12px;
  }

  .results-footnote {
    padding-left: 12px;
  }
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

  /* Columns stack: the name on its own line, then the two analyses side
     by side, each labelled since the column headers are hidden. */
  .results-head {
    display: none;
  }

  .results-head,
  .row-group {
    padding-left: 14px;
    padding-right: 14px;
  }

  .result-row {
    grid-template-columns: 1fr 1fr;
    column-gap: 16px;
    row-gap: 10px;
  }

  .result-row .cell-name {
    grid-column: 1 / -1;
  }

  .result-row .cell-score {
    align-items: flex-start;
    white-space: normal;
  }

  /* Column title over subtitle, e.g. "400 PATIENTS*" / "READER STUDY" */
  .result-row .cell-score::before {
    content: attr(data-title) "\A"attr(data-subtitle);
    white-space: pre;
    font-size: 10px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #999;
    margin-bottom: 2px;
  }

  .member-row {
    grid-template-columns: minmax(0, 1fr) auto;
    row-gap: 0;
  }

  .member-row .cell-name {
    grid-column: auto;
  }

  .members {
    margin-left: 0;
    padding-left: 14px;
  }

  /* Links on their own line, so the name keeps the full width */
  .member-row .row-links {
    display: block;
    margin: 2px 0 0;
  }

  .authors-full {
    display: none;
  }

  .authors-short {
    display: inline;
  }

  .member-row .cell-score {
    align-items: flex-end;
  }

  .member-row .cell-score::before,
  .member-row .cell-score.is-empty {
    display: none;
  }

  .results-footnote {
    padding-left: 14px;
  }
}
</style>
