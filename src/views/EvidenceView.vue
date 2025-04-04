<template>
  <div class="evidence-container">
    <h1>Research Evidence</h1>
    <div class="papers-grid">
      <div v-for="paper in papers" :key="paper.id" class="paper-card">
        <h2>{{ paper.title }}</h2>
        <p class="authors">{{ paper.authors }}</p>
        <p class="year">{{ paper.year }}</p>
        <div class="paper-actions">
          <button @click="viewPaper(paper)" class="view-btn">View Paper</button>
        </div>
      </div>
    </div>

    <!-- Paper Detail Modal -->
    <div v-if="selectedPaper" class="paper-modal">
      <div class="modal-content">
        <button class="close-btn" @click="selectedPaper = null">&times;</button>
        <div class="paper-header">
          <h2>{{ selectedPaper.title }}</h2>
          <p class="authors">{{ selectedPaper.authors }}</p>
          <p class="year">{{ selectedPaper.year }}</p>
        </div>
        <div class="paper-content markdown-body" v-html="renderedContent"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { marked } from "marked";
import { evidenceService } from "@/services/evidenceService";

export default {
  name: "EvidenceView",
  setup() {
    const papers = ref([]);
    const selectedPaper = ref(null);
    const renderedContent = ref("");

    const loadPapers = async () => {
      try {
        papers.value = await evidenceService.getPapersList();
      } catch (error) {
        console.error("Error loading papers:", error);
      }
    };

    const viewPaper = async (paper) => {
      try {
        const content = await evidenceService.getPaperContent(paper.id);
        renderedContent.value = marked(content);
        selectedPaper.value = paper;
      } catch (error) {
        console.error("Error loading paper content:", error);
      }
    };

    onMounted(() => {
      loadPapers();
    });

    return {
      papers,
      selectedPaper,
      renderedContent,
      viewPaper,
    };
  },
};
</script>

<style scoped>
.evidence-container {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.papers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.paper-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.paper-card:hover {
  transform: translateY(-5px);
}

.paper-card h2 {
  margin: 0 0 1rem 0;
  font-size: 1.2rem;
  color: #2c3e50;
}

.authors {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.year {
  color: #999;
  font-size: 0.8rem;
  margin-bottom: 1rem;
}

.view-btn {
  background: #4caf50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.view-btn:hover {
  background: #45a049;
}

.paper-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
}

.paper-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.paper-content {
  line-height: 1.6;
}

.markdown-body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif;
  font-size: 16px;
  line-height: 1.6;
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3 {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
}

.markdown-body p {
  margin-bottom: 16px;
}

.markdown-body code {
  padding: 0.2em 0.4em;
  margin: 0;
  font-size: 85%;
  background-color: rgba(27, 31, 35, 0.05);
  border-radius: 3px;
}
</style>
