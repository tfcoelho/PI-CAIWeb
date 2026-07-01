<template>
  <div id="app">
    <nav
      :class="{
        'dark-bg': $route.path === '/',
        'on-light-bg': isNavOverWhiteBg,
      }"
    >
      <div class="nav-wrapper">
        <div class="nav-container">
          <router-link to="/">Home</router-link>
          <router-link to="/research">Research</router-link>
          <router-link to="/events">Events</router-link>
          <a
            href="https://pi-cai.grand-challenge.org/"
            target="_blank"
            rel="noopener noreferrer"
            >Benchmark</a
          >
        </div>
      </div>
    </nav>
    <!-- Sits above all fixed/background-attachment:fixed compositor layers -->
    <div class="transition-mask" :class="{ visible: maskVisible }"></div>
    <router-view v-slot="{ Component }">
      <transition
        mode="out-in"
        :css="false"
        @leave="onLeave"
        @after-enter="onAfterEnter"
      >
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { ref, provide, nextTick } from "vue";

const isNavOverWhiteBg = ref(false);
const maskVisible = ref(false);

const setNavAppearance = (isOver) => {
  isNavOverWhiteBg.value = isOver;
};
provide("setNavAppearance", setNavAppearance);

function onLeave(el, done) {
  // Show mask instantly, then swap component once it's rendered
  maskVisible.value = true;
  // Two rAFs: first schedules paint, second confirms it completed
  requestAnimationFrame(() => requestAnimationFrame(done));
}

async function onAfterEnter() {
  // New component is mounted — wait one tick then reveal
  await nextTick();
  maskVisible.value = false;
}
</script>

<style>
/* Basic styles for the entire app */
html,
body {
  margin: 0;
  padding: 0;
  background-color: #111820; /* Dark background for the app */
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* Navigation Styles */
nav {
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: auto;
  padding: 10px;
  z-index: 1000;
  text-align: center;
  transition: all 0.3s ease;
}
/* In App.vue <style> section */
.nav-container {
  display: inline-flex;
  gap: 4px;
  /* Change the background to be transparent */
  background: transparent;
  backdrop-filter: blur(10px);
  padding: 4px;
  border-radius: 6px;
  align-items: center;
}
nav.dark-bg a {
  color: white;
}
nav:not(.dark-bg) a {
  color: #333;
}
nav.on-light-bg a {
  color: #333;
}
nav a {
  font-weight: 500;
  text-decoration: none;
  padding: 4px 12px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}
nav a.router-link-exact-active {
  background-color: rgba(224, 32, 144, 0.1);
  font-weight: 600;
}
nav a:hover:not(.router-link-exact-active) {
  background-color: rgba(224, 32, 144, 0.25);
}

@media (max-width: 750px) {
  nav {
    top: 6px;
    padding: 4px 8px;
    width: calc(100% - 24px);
    max-width: 440px;
  }

  .nav-container {
    width: 100%;
    justify-content: space-between;
    gap: 2px;
    padding: 3px;
    border-radius: 10px;
    background: rgba(17, 24, 32, 0.72);
    border: 1px solid rgba(255, 255, 255, 0.18);
  }

  nav a {
    padding: 7px 8px;
    font-size: 13px;
    line-height: 1;
    flex: 1;
    text-align: center;
    white-space: nowrap;
  }

  nav:not(.dark-bg) .nav-container,
  nav.on-light-bg .nav-container {
    background: rgba(255, 255, 255, 0.75);
    border: 1px solid rgba(0, 0, 0, 0.08);
  }
}

/* Transition mask — covers the entire viewport so compositor-layer-escaped
   elements (position:fixed, background-attachment:fixed) can't break through */
.transition-mask {
  position: fixed;
  inset: 0;
  background: #111820;
  z-index: 9999;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.35s ease; /* Only used when hiding (fade-out to reveal new page) */
}
.transition-mask.visible {
  opacity: 1;
  transition: none; /* Appear instantly — no fade-in, no "last to vanish" perception */
}
</style>
