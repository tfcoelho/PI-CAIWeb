<template>
  <div class="research-page">
    <div class="research-header">
      <div class="logo-and-title">
        <img
          src="@/assets/images/logo_dark.png"
          alt="Logo"
          class="header-logo"
        />
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
        <p v-if="paper.date" class="date">{{ formatDate(paper.date) }}</p>
        <p v-else-if="paper.year" class="year">{{ paper.year }}</p>
      </div>
    </TransitionGroup>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, computed, nextTick } from "vue";
import { researchService } from "@/services/researchService";
import { useRouter } from "vue-router";

export default {
  name: "ResearchView",
  setup() {
    const papers = ref([]);
    const tags = ref(["All"]);
    const selectedTag = ref("All");
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
          day: "numeric",
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
    };
  },
};
</script>

<style scoped>
/* This rule styles the new logo image */
.header-logo {
  position: fixed; /* This makes the logo stay in place on scroll */
  top: 20px; /* Distance from the top of the window */
  left: 5%; /* Distance from the left of the window */
  height: 30px; /* Adjust size as needed */
  width: auto;
  z-index: 11; /* IMPORTANT: Places it on top of the gradient mask (which is z-index: 10) */
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

/* This creates the fading mask at the top */
.research-page::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px; /* The height of the fade effect */
  z-index: 10;
  /* This creates a gradient from the page background color to transparent */
  background: linear-gradient(to bottom, #ebebf5 50px, transparent);
  /* This prevents the mask from blocking clicks on the content below it */
  pointer-events: none;
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

.date {
  color: #777;
  font-size: 14px;
  margin-bottom: 16px;
  font-style: italic;
}

.year {
  color: #999;
  font-size: 14px;
  margin-bottom: 16px;
}

@media (max-width: 768px) {
  .papers-grid {
    grid-template-columns: 1fr;
  }

  .page-title {
    font-size: 32px;
  }
  .header-logo {
    opacity: 0;
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
