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
        </div>
      </div>
    </nav>
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script setup>
import { ref, provide } from "vue";

// This new state will control the nav's appearance
const isNavOverWhiteBg = ref(false);

// This is the function that HomeView will call to update the state
const setNavAppearance = (isOver) => {
  isNavOverWhiteBg.value = isOver;
};

// We "provide" this function to all child components
provide("setNavAppearance", setNavAppearance);
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

/* Page transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.35s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
