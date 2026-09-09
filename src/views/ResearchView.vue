<template>
  <div class="research-page">
    <div class="research-header">
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
        <h1 class="page-title">Research</h1>
      </div>
    </div>

    <div class="tag-filter">
      <button
        v-for="tag in tags"
        :key="tag"
        :class="['tag-btn', selectedTag === tag ? 'active' : '']"
        @click="filterByTag(tag)"
      >
        {{ tag }}
      </button>
    </div>

    <div v-if="loading" class="loading-indicator">
      <p>Loading papers...</p>
    </div>
    <div v-else-if="filteredPapers.length === 0" class="no-papers">
      <p>
        No research papers found. Please add Markdown files to the
        src/assets/data/papers directory.
      </p>
    </div>
    <div class="papers-grid">
      <div
        v-for="paper in filteredPapers"
        :key="paper.id"
        class="paper-card"
        @click="viewPaper(paper)"
      >
        <div class="paper-tags" v-if="paper.tags && paper.tags.length > 0">
          <span
            v-for="tag in paper.tags"
            :key="tag"
            :class="['paper-tag', tagClass(tag, paper)]"
          >
            {{ tagLabel(tag, paper) }}
          </span>
        </div>
        <h2 class="paper-title">{{ paper.title }}</h2>
        <p v-if="paper.authors" class="authors">{{ paper.authors }}</p>
        <div class="paper-footer">
          <img
            v-if="getJournalLogo(paper.publicationDetails)"
            :src="getJournalLogo(paper.publicationDetails).src"
            :style="{
              maxHeight: getJournalLogo(paper.publicationDetails).height + 'px',
            }"
            class="journal-logo"
            alt="Journal logo"
          />
          <div
            v-else-if="getInstitutionLogos(paper).length > 0"
            class="institution-logos"
          >
            <template
              v-for="(logo, index) in getInstitutionLogos(paper)"
              :key="index"
            >
              <span v-if="index > 0" class="institution-separator"></span>
              <img
                :src="logo.src"
                :style="{ height: logo.height + 'px' }"
                class="institution-logo"
                alt="Partner institution logo"
              />
            </template>
          </div>
          <p v-if="paper.date" class="date">{{ formatDate(paper.date) }}</p>
          <p v-else-if="paper.year" class="year">{{ paper.year }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed, nextTick } from "vue";
import { researchService } from "@/services/researchService";
import { useRouter } from "vue-router";

const journalLogos = {
  "lancet oncol": {
    src: require("@/assets/images/journal_logos/lancet-oncology.png"),
    height: 44,
  },
  "jama netw": {
    src: require("@/assets/images/journal_logos/jama-open.png"),
    height: 28,
  },
  "eur urol": {
    src: require("@/assets/images/journal_logos/european-urology.png"),
    height: 36,
  },
  "comput biol med": {
    src: require("@/assets/images/journal_logos/computers-in-biology-and-medicine.jpg"),
    height: 40,
  },
  "imaging cancer": {
    src: require("@/assets/images/journal_logos/radiology-imaging-cancer.png"),
    height: 40,
  },
  radiology: {
    src: require("@/assets/images/journal_logos/radiology.png"),
    height: 28,
  },
};

// Partner-institution logos shown on ongoing studies (in place of a journal
// logo, which they don't have yet). Stored in their normal, original colors
// in organization_logos/ — the black appearance in the UI is a CSS filter
// (see .institution-logo), not baked into the asset, so the same file can be
// reused anywhere without needing a separate pre-desaturated copy.
const institutionLogos = {
  radboud_university_medical_center: {
    src: require("@/assets/images/organization_logos/radboud_university_medical_center.png"),
    height: 18,
  },
  ntnu: {
    src: require("@/assets/images/organization_logos/ntnu.png"),
    height: 18,
  },
  dkfz: {
    src: require("@/assets/images/organization_logos/dkfz.png"),
    height: 20,
  },
  karolinska: {
    src: require("@/assets/images/organization_logos/karolinska.png"),
    height: 52,
  },
  imperial: {
    src: require("@/assets/images/organization_logos/Imperial.png"),
    height: 14,
  },
  umcg: {
    src: require("@/assets/images/organization_logos/umcg.png"),
    height: 16,
  },
  ucl: {
    src: require("@/assets/images/organization_logos/ucl.png"),
    height: 20,
  },
  ucsd: {
    src: require("@/assets/images/organization_logos/ucsd.png"),
    height: 22,
  },
};

function getInstitutionLogos(paper) {
  if (!paper.institutions || paper.institutions.length === 0) return [];
  return paper.institutions.map((key) => institutionLogos[key]).filter(Boolean);
}

function getJournalLogo(publicationDetails) {
  if (!publicationDetails) return null;
  const lower = publicationDetails.toLowerCase();
  for (const [key, entry] of Object.entries(journalLogos)) {
    if (lower.includes(key)) return entry;
  }
  return null;
}

export default {
  name: "ResearchView",
  setup() {
    const papers = ref([]);
    const tags = ref([]);
    const selectedTag = ref("PUBLISHED");
    const loading = ref(true);
    const router = useRouter();

    // Store the original background color
    let originalBackgroundColor;

    const filteredPapers = computed(() => {
      return papers.value.filter(
        (paper) => paper.tags && paper.tags.includes(selectedTag.value)
      );
    });

    // A paper marked `under_review` in its frontmatter still files under the
    // "ONGOING" tab (its `tags` are untouched), but its badge on the card
    // reads and looks like "UNDER REVIEW" instead of "ONGOING".
    const isUnderReviewTag = (tag, paper) =>
      tag.toUpperCase() === "ONGOING" && paper?.underReview;

    const tagClass = (tag, paper) => {
      if (isUnderReviewTag(tag, paper)) return "tag-under-review";
      switch (tag.toUpperCase()) {
        case "ONGOING":
          return "tag-study-design";
        case "PUBLISHED":
          return "tag-published";
        default:
          return "";
      }
    };

    const tagLabel = (tag, paper) =>
      isUnderReviewTag(tag, paper) ? "UNDER REVIEW" : tag;

    const filterByTag = (tag) => {
      selectedTag.value = tag;
      // Add a nextTick to ensure DOM is updated
      nextTick(() => {
        const activeBtn = document.querySelector(".tag-btn.active");
        const filterContainer = document.querySelector(".tag-filter");
        if (activeBtn && filterContainer) {
          const rect = activeBtn.getBoundingClientRect();
          const containerRect = filterContainer.getBoundingClientRect();
          const left = rect.left - containerRect.left;
          filterContainer.setAttribute("data-active-left", "");
          filterContainer.style.setProperty("--active-left", `${left}px`);
          filterContainer.style.setProperty(
            "--active-width",
            `${rect.width}px`
          );
        }
      });
    };

    const loadPapers = async () => {
      loading.value = true;
      try {
        papers.value = await researchService.getPapersList();
        tags.value = await researchService.getAllTags();

        papers.value.sort((a, b) => {
          if (a.order != null && b.order != null) return a.order - b.order;
          if (a.order != null) return -1;
          if (b.order != null) return 1;
          // Among ongoing studies (no `order`), surface those already
          // under review above the rest before falling back to date.
          if (a.underReview && !b.underReview) return -1;
          if (!a.underReview && b.underReview) return 1;
          if (!a.year) return 1;
          if (!b.year) return -1;
          return b.year.localeCompare(a.year);
        });
      } catch (error) {
        console.error("Error loading papers:", error);
      } finally {
        loading.value = false;
      }
    };

    const viewPaper = (paper) => {
      // Navigate to paper page
      router.push({ name: "paper", params: { id: paper.id } });
    };

    // Format the date for display
    const formatDate = (dateStr) => {
      if (!dateStr) return "";

      try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) {
          // If not a valid date object, just return the string
          return dateStr;
        }
        return new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
        }).format(date);
      } catch (e) {
        console.error("Error formatting date:", e);
        return dateStr;
      }
    };

    onMounted(async () => {
      // Save original background color and set new one
      originalBackgroundColor = document.body.style.backgroundColor;
      document.body.style.backgroundColor = "#EBEBF5";

      await loadPapers();

      // Initialize the indicator position now that the tag buttons exist
      nextTick(() => {
        const activeBtn = document.querySelector(".tag-btn.active");
        const filterContainer = document.querySelector(".tag-filter");
        if (activeBtn && filterContainer) {
          const rect = activeBtn.getBoundingClientRect();
          const containerRect = filterContainer.getBoundingClientRect();
          const left = rect.left - containerRect.left;
          filterContainer.setAttribute("data-active-left", "");
          filterContainer.style.setProperty("--active-left", `${left}px`);
          filterContainer.style.setProperty(
            "--active-width",
            `${rect.width}px`
          );
        }
      });
    });

    onUnmounted(() => {
      // Restore original background color when leaving this view
      document.body.style.backgroundColor = originalBackgroundColor;
    });

    return {
      papers,
      tags,
      selectedTag,
      filteredPapers,
      filterByTag,
      viewPaper,
      loading,
      formatDate,
      tagClass,
      tagLabel,
      getJournalLogo,
      getInstitutionLogos,
    };
  },
};
</script>

<style scoped>
.header-logo-glass {
  position: fixed;
  top: 20px;
  left: 6%;
  padding: 4px;
  border-radius: 6px;
  background: transparent;
  border: none;
  box-shadow: none;
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

.research-page {
  min-height: 100vh;
  padding-top: 60px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif;
  background-color: #ebebf5; /* Match PaperView background if needed */
}

.research-header {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
  padding: 20px 0;
  border-bottom: 0px solid #666666;
  padding-top: 80px;
}

.logo-and-title {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.page-title {
  font-size: 42px;
  font-weight: 600;
  margin: 0;
  text-align: left;
  color: #111;
  margin-left: 20px;
  margin-top: 0;
}

.tag-filter {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  padding-bottom: 4px;
  border-bottom: 1px solid #666666;
  overflow-x: auto;
  position: relative;
}

.tag-btn {
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
  min-width: fit-content;
  font-feature-settings: "tnum";
  letter-spacing: -0.01em;
  display: inline-block;
  text-align: center;
  line-height: 20px;
  position: relative;
}

.tag-btn:hover {
  color: #333;
}

.tag-btn.active {
  color: #333;
}

/* Remove the ::after from .tag-btn.active and create a new sliding indicator */
.tag-filter::after {
  content: "";
  position: absolute;
  bottom: 0;
  height: 2px;
  background-color: #e02090;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  left: 0;
  width: 0;
  opacity: 0;
}

/* Add data attributes to track the active button's position */
.tag-filter[data-active-left] {
  --active-left: 0px;
  --active-width: 0px;
}

.tag-filter[data-active-left]::after {
  left: var(--active-left);
  width: var(--active-width);
  opacity: 1;
}

.loading-indicator,
.no-papers {
  text-align: center;
  margin-top: 3rem;
  color: #666;
  font-size: 1.2rem;
}

.loading-content {
  text-align: center;
  margin: 2rem 0;
  color: #666;
}

.error-message {
  text-align: center;
  margin: 2rem 0;
  color: #e74c3c;
  padding: 1rem;
  background-color: #fceae9;
  border-radius: 4px;
}

.papers-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0px;
  margin-top: 2rem;
  position: relative;
}

.paper-card {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  text-align: left;
  cursor: pointer;
  margin: 20px;
}

.paper-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.paper-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
  order: -1;
}

.paper-tag {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background-color: #e02090;
  color: white;
}

.paper-tag.tag-study-design {
  background-color: #ed9fb6; /* blue */
}

.paper-tag.tag-under-review {
  background-color: #e0a72e; /* amber */
}

.paper-tag.tag-published {
  background-color: #e02090; /* green */
}

.paper-title {
  margin: 0 0 12px 0;
  font-size: 18px;
  line-height: 1.4;
  font-weight: 600;
  color: #111;
}

.authors {
  color: #666;
  font-size: 14px;
  margin-bottom: 8px;
  font-weight: 400;
}

.paper-footer {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: auto;
  padding-top: 12px;
}

.paper-footer .date,
.paper-footer .year {
  align-self: flex-end;
}

.date {
  color: #777;
  font-size: 14px;
  font-style: italic;
  margin: 6px 0 0 0;
}

.year {
  color: #999;
  font-size: 14px;
  margin: 6px 0 0 0;
}

.journal-logo {
  width: auto;
  object-fit: contain;
  opacity: 0.85;
}

.institution-logos {
  display: flex;
  align-items: center;
  gap: 6px;
}

.institution-separator {
  width: 1px;
  height: 26px;
  background-color: #ccc;
  flex-shrink: 0;
}

.institution-logo {
  /* height comes from the per-logo entry in institutionLogos above, since
     source logos vary a lot in their natural proportions */
  width: auto;
  object-fit: contain;
  /* Source files are the institutions' normal, full-color logos — this is
     what renders them as plain black marks to match the journal-logo slot's
     understated look, without needing a separate pre-desaturated asset. */
  filter: grayscale(1) brightness(0);
  opacity: 0.7;
}

@media (max-width: 750px) {
  .papers-grid {
    grid-template-columns: 1fr;
  }

  .page-title {
    font-size: 32px;
  }
  .header-logo-glass {
    display: none;
  }
}
</style>
