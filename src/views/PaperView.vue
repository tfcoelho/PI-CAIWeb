<template>
  <div class="paper-view">
    <div class="content-wrapper">
      <div class="back-button-container">
        <router-link to="/research" class="back-button">
          <span class="back-icon">←</span> Back to Research
        </router-link>
      </div>

      <h1 class="paper-title">{{ paper.title }}</h1>

      <div class="paper-content-container">
        <div class="paper-sidebar">
          <div v-if="paper.tags && paper.tags.length > 0" class="paper-tags">
            <span
              :class="['paper-tag', tagClass(tag)]"
              v-for="tag in paper.tags"
              :key="tag"
            >
              {{ tag }}
            </span>
          </div>

          <div v-if="paper.authors" class="paper-authors">
            <h3>Authors</h3>
            <p>{{ paper.authors }}</p>
          </div>

          <div v-if="paper.date" class="paper-date">
            <h3>Published</h3>
            <p>{{ formatDate(paper.date) }}</p>
          </div>

          <div v-if="paper.publicationLink" class="paper-link">
            <h3>Original Publication</h3>
            <a
              :href="paper.publicationLink"
              target="_blank"
              rel="noopener noreferrer"
              class="source-button"
            >
              Read Source
            </a>
          </div>
        </div>

        <div class="paper-main-content" ref="mainContentRef">
          <div v-if="loading" class="loading-content">
            Loading paper content...
          </div>
          <div v-else-if="error" class="error-message">
            Error loading paper content. Please try again.
          </div>
          <div v-else class="markdown-body" v-html="renderedContent"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRoute } from "vue-router";
import { marked } from "marked";
import { researchService } from "@/services/researchService";

export default {
  name: "PaperView",
  setup() {
    const route = useRoute();
    const paper = ref({});
    const renderedContent = ref("");
    const loading = ref(true);
    const error = ref(false);

    // Store the original background color
    let originalBackgroundColor;

    const loadPaper = async () => {
      loading.value = true;
      try {
        // Get all papers to find the one with matching ID
        const papers = await researchService.getPapersList();
        const foundPaper = papers.find((p) => p.id === route.params.id);

        if (!foundPaper) {
          throw new Error("Paper not found");
        }

        paper.value = foundPaper;

        // Load the paper content
        const content = await researchService.getPaperContent(route.params.id);

        // First, completely remove any frontmatter between --- delimiters
        let cleanedContent = content.replace(
          /^---\s*\n[\s\S]*?\n---\s*\n/m,
          ""
        );

        // Then remove title (usually first h1)
        cleanedContent = cleanedContent.replace(/^# .*$/m, "");

        // Try to remove any remaining metadata that might appear after frontmatter
        cleanedContent = cleanedContent.replace(/^authors:.*$/im, "");
        cleanedContent = cleanedContent.replace(/^by:.*$/im, "");
        cleanedContent = cleanedContent.replace(/^date:.*$/im, "");
        cleanedContent = cleanedContent.replace(/^published:.*$/im, "");
        cleanedContent = cleanedContent.replace(/^year:.*$/im, "");

        // Trim whitespace and extra newlines
        cleanedContent = cleanedContent.replace(/^\s*[\r\n]/gm, "\n");

        renderedContent.value = marked(cleanedContent);
      } catch (err) {
        console.error("Error loading paper:", err);
        error.value = true;
      } finally {
        loading.value = false;
      }
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

    const tagClass = (tag) => {
      switch (tag.toUpperCase()) {
        case "ONGOING":
          return "tag-study-design";
        case "PUBLISHED":
          return "tag-published";
        default:
          return "";
      }
    };

    onMounted(() => {
      // Reset any leftover scrolling locks
      document.body.style.overflow = "auto";

      loadPaper();

      // Save original background color and set new one (same as research page)
      originalBackgroundColor = document.body.style.backgroundColor;
      document.body.style.backgroundColor = "#EBEBF5";
    });

    onUnmounted(() => {
      // Restore original background color when leaving this view
      document.body.style.backgroundColor = originalBackgroundColor;
    });

    const mainContentRef = ref(null);

    watch(loading, (newVal) => {
      if (newVal === false && mainContentRef.value) {
        requestAnimationFrame(() => {
          mainContentRef.value.scrollTop = 0;
          mainContentRef.value.style.overflowY = "auto";
        });
      }
    });

    return {
      paper,
      renderedContent,
      loading,
      error,
      formatDate,
      tagClass,
    };
  },
};
</script>

<style scoped>
.paper-view {
  padding: 0;
  max-width: 1200px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #ebebf5;
}

.content-wrapper {
  flex: 1; /* Take available space */
  padding: 80px 20px 30px 20px;
  display: flex;
  flex-direction: column;
}

.back-button-container {
  position: sticky;
  top: 0;
  background-color: #ebebf5;
  z-index: 10;
  padding: 20px 0;
  margin-bottom: 20px;
  text-align: left;
}

.back-button {
  display: inline-flex;
  align-items: center;
  font-size: 14px;
  color: #666;
  text-decoration: none;
  transition: color 0.2s;
}

.back-button:hover {
  color: #e02090;
}

.back-icon {
  margin-right: 5px;
  font-size: 18px;
}

.paper-title {
  font-size: 36px;
  font-weight: 600;
  color: #111;
  margin: 0 0 30px 0;
  text-align: left;
  line-height: 1.3;
}

.paper-content-container {
  flex: 1; /* Grow to fill space */
  display: flex;
  gap: 40px;
  background: #ffffff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden; /* Important: cut off overflow except inside .paper-main-content */
}

.paper-sidebar {
  width: 25%;
  flex-shrink: 0;
  text-align: left;
  overflow-y: auto; /* Optional, if your sidebar gets tall */
}

.paper-main-content {
  flex-grow: 1;
  overflow-y: auto;
  min-height: 0; /* VERY important with flexbox for scrolling children */
}

.paper-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 30px;
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
  background-color: #ed9fb6;
}

.paper-tag.tag-published {
  background-color: #e02090;
}

.paper-sidebar h3 {
  font-size: 14px;
  font-weight: 600;
  color: #e02090;
  margin-bottom: 8px;
  margin-top: 25px;
}

.paper-sidebar p {
  margin: 0 0 15px 0;
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  text-align: left;
}

.paper-link a {
  color: #e02090;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s;
}

.paper-link a:hover {
  text-decoration: underline;
}

.source-button {
  display: inline-block;
  background-color: #e02090;
  color: white !important;
  padding: 8px 16px;
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.2s ease;
  text-decoration: none !important;
}

.source-button:hover {
  background-color: #c01070;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.loading-content {
  text-align: center;
  margin: 40px 0;
  color: #666;
}

.error-message {
  text-align: center;
  margin: 40px 0;
  color: #e74c3c;
  padding: 20px;
  background-color: #fceae9;
  border-radius: 4px;
}

.loading-content,
.error-message {
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.markdown-body {
  line-height: 1.7;
  color: #333;
  text-align: left;
}

.markdown-body code {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  background-color: rgba(27, 31, 35, 0.05);
  border-radius: 3px;
}

@media (max-width: 768px) {
  .paper-content-container {
    flex-direction: column;
  }

  .paper-sidebar {
    width: 100%;
    margin-bottom: 20px;
  }

  .paper-title {
    font-size: 28px;
  }
}
</style>

<style>
/* Add global styles to target the dynamically inserted content */
.markdown-body h1,
.markdown-body h2,
.markdown-body h3 {
  margin-top: 28px;
  margin-bottom: 18px;
  font-weight: 600;
  line-height: 1.3;
  text-align: left;
  color: #e02090;
}

.markdown-body p {
  margin-bottom: 16px;
  text-align: justify;
}
</style>
