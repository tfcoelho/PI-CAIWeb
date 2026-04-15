<template>
  <div class="research-page">
    <div class="research-header">
      <div class="logo-and-title">
        <div class="header-logo-glass">
          <img
            src="@/assets/images/logo_dark.png"
            alt="PI-CAI logo"
            class="header-logo"
          />
        </div>
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
    <TransitionGroup name="paper-list" tag="div" class="papers-grid">
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
            :class="['paper-tag', tagClass(tag)]"
          >
            {{ tag }}
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
          <span v-else></span>
          <p v-if="paper.date" class="date">{{ formatDate(paper.date) }}</p>
          <p v-else-if="paper.year" class="year">{{ paper.year }}</p>
        </div>
      </div>
    </TransitionGroup>
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
};

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
    const tags = ref(["All"]);
    const selectedTag = ref("PUBLISHED");
    const loading = ref(true);
    const router = useRouter();

    // Store the original background color
    let originalBackgroundColor;

    const filteredPapers = computed(() => {
      if (selectedTag.value === "All") {
        return papers.value;
      }
      return papers.value.filter(
        (paper) => paper.tags && paper.tags.includes(selectedTag.value)
      );
    });

    const tagClass = (tag) => {
      switch (tag.toUpperCase()) {
        case "STUDY PROTOCOL":
          return "tag-study-design";
        case "PUBLISHED":
          return "tag-published";
        default:
          return "";
      }
    };

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

        // Sort papers by year (most recent first)
        papers.value.sort((a, b) => {
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

    onMounted(() => {
      loadPapers();

      // Save original background color and set new one
      originalBackgroundColor = document.body.style.backgroundColor;
      document.body.style.backgroundColor = "#EBEBF5";

      // Initialize the indicator position
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
      getJournalLogo,
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
  animation: fadeIn 0.4s ease-out;
  margin: 20px;
}

.paper-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Add fade in animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Add fade out animation */
.paper-card.fade-out {
  animation: fadeOut 0.3s ease-out forwards;
}

@keyframes fadeOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(10px);
  }
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
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 12px;
}

.date {
  color: #777;
  font-size: 14px;
  font-style: italic;
  margin: 0;
}

.year {
  color: #999;
  font-size: 14px;
  margin: 0;
}

.journal-logo {
  width: auto;
  object-fit: contain;
  opacity: 0.85;
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

/* Add Vue transition group animations */
.paper-list-move,
.paper-list-enter-active,
.paper-list-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.paper-list-enter-from,
.paper-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.paper-list-leave-active {
  position: absolute;
}
</style>
