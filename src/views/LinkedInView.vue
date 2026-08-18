<template>
  <div class="linkedin-page">
    <div class="linkedin-header">
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
        <h1 class="page-title">Team on LinkedIn</h1>
      </div>
    </div>

    <div v-if="posts.length === 0" class="no-posts">
      <p>No posts added yet.</p>
    </div>
    <div v-else class="posts-grid">
      <div
        v-for="(column, colIndex) in columns"
        :key="colIndex"
        class="posts-column"
      >
        <div v-for="post in column" :key="post.src" class="post-card">
          <iframe
            v-if="post.src"
            :src="post.src"
            :height="post.height"
            width="100%"
            frameborder="0"
            allowfullscreen
            loading="lazy"
            title="Embedded LinkedIn post"
          ></iframe>
          <div v-else class="embed-fallback">
            <p>Couldn't read this embed snippet.</p>
          </div>
          <a
            :href="post.viewUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="view-on-linkedin"
          >
            View on LinkedIn ↗
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import rawPosts from "@/data/linkedinPosts.js";

// Turns a raw "Embed this post" snippet (copied straight from LinkedIn)
// into { src, height, viewUrl, id }. See src/data/linkedinPosts.js to add
// posts. `id` is LinkedIn's post ID, which increases over time — used to
// sort posts newest-first without needing a manually-tracked date.
const parseEmbed = (html) => {
  const srcMatch = html.match(/src="([^"]+)"/);
  if (!srcMatch) return { src: null, height: 570, viewUrl: "#", id: "" };
  const src = srcMatch[1];
  const heightMatch = html.match(/height="(\d+)"/);
  const urnMatch = src.match(/urn:li:([a-zA-Z]+):(\d+)/);
  const viewUrl = urnMatch
    ? `https://www.linkedin.com/feed/update/urn:li:${urnMatch[1]}:${urnMatch[2]}/`
    : src;
  return {
    src,
    height: heightMatch ? Number(heightMatch[1]) : 570,
    viewUrl,
    id: urnMatch ? urnMatch[2] : "",
  };
};

// Post IDs are plain digit strings, so a longer one is always a bigger
// number; equal-length ones compare correctly as plain strings.
const compareIds = (a, b) =>
  a.length !== b.length ? a.length - b.length : a < b ? -1 : a > b ? 1 : 0;

// Newest first. Flip the arguments to compareIds for oldest first.
const posts = computed(() =>
  rawPosts.map(parseEmbed).sort((a, b) => compareIds(b.id, a.id))
);

// Posts are dealt into columns left-to-right (post 1 → col 1, post 2 →
// col 2, post 3 → col 1, ...) so the newest posts sit at the top of every
// column. Each column then stacks its own posts with no forced row
// height, so a short post doesn't leave a gap under a tall neighbor.
const columnCount = ref(window.innerWidth <= 750 ? 1 : 2);
const updateColumnCount = () => {
  columnCount.value = window.innerWidth <= 750 ? 1 : 2;
};

const columns = computed(() => {
  const cols = Array.from({ length: columnCount.value }, () => []);
  posts.value.forEach((post, i) => cols[i % columnCount.value].push(post));
  return cols;
});

let originalBackgroundColor;

onMounted(() => {
  originalBackgroundColor = document.body.style.backgroundColor;
  document.body.style.backgroundColor = "#EBEBF5";
  window.addEventListener("resize", updateColumnCount);
});

onUnmounted(() => {
  document.body.style.backgroundColor = originalBackgroundColor;
  window.removeEventListener("resize", updateColumnCount);
});
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

.linkedin-page {
  min-height: 100vh;
  padding-top: 60px;
  max-width: 1200px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif;
  background-color: #ebebf5;
}

.linkedin-header {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
  padding: 20px 0;
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

.no-posts {
  text-align: center;
  margin-top: 3rem;
  color: #666;
  font-size: 1.2rem;
}

.posts-grid {
  display: flex;
  gap: 24px;
  margin-top: 2rem;
  padding: 0 20px 60px;
}

.posts-column {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 24px;
  min-width: 0;
}

.post-card {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.post-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.post-card iframe {
  display: block;
  border: none;
}

.embed-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: #666;
  font-size: 14px;
  text-align: center;
  padding: 0 20px;
}

.view-on-linkedin {
  display: block;
  padding: 6px;
  font-size: 11px;
  font-weight: 600;
  color: #e02090;
  text-decoration: none;
  text-align: center;
  border-top: 1px solid #eee;
}

.view-on-linkedin:hover {
  text-decoration: underline;
}

@media (max-width: 750px) {
  .page-title {
    font-size: 32px;
  }

  .header-logo-glass {
    display: none;
  }
}
</style>
