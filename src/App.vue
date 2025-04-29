<template>
  <div id="app">
    <nav :class="{ 'dark-bg': $route.path === '/' }">
      <div class="nav-wrapper">
        <div class="logo-container" v-if="$route.path !== '/'">
          <router-link to="/" class="logo-link">
            <img
              src="@/assets/images/logo_dark.png"
              alt="Logo"
              class="nav-logo"
            />
          </router-link>
        </div>
        <div class="spacer" v-if="$route.path !== '/'"></div>
        <div class="nav-container">
          <router-link to="/">Home</router-link>
          <router-link
            to="/research"
            :class="{
              'router-link-exact-active': $route.path.startsWith('/paper'),
            }"
            >Research</router-link
          >
          <!-- <router-link to="/people">People</router-link> -->
        </div>
        <div class="spacer" v-if="$route.path !== '/'"></div>
      </div>
    </nav>
    <router-view v-slot="{ Component }">
      <transition name="page" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow-x: hidden;
  background-color: white; /* Default white background */
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  position: fixed;
  top: 10px;
  left: 0;
  width: 100%;
  padding: 10px 0;
  z-index: 1000;
  text-align: center;
  transition: all 0.3s ease;
}

.nav-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
}

.logo-container {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
}

.nav-container {
  display: inline-flex;
  gap: 4px;
  background: rgba(255, 255, 255, 0.1);
  padding: 4px;
  border-radius: 6px;
  align-items: center;
}

.spacer {
  display: none;
}

nav.dark-bg a {
  color: white;
}

nav:not(.dark-bg) a {
  color: #333;
}

nav a {
  font-weight: 500;
  text-decoration: none;
  padding: 4px 12px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  min-width: 60px;
  text-align: center;
  display: inline-block;
  font-size: 14px;
  line-height: 24px;
  font-feature-settings: "tnum";
  letter-spacing: -0.01em;
}

nav a.router-link-exact-active {
  background-color: rgba(224, 32, 144, 0.1);
  /* color: white !important; */
  font-weight: 600;
}

nav a:hover:not(.router-link-exact-active) {
  background-color: rgba(224, 32, 144, 0.25);
}

/* Page Transition Animations */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.35s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

.logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.nav-logo {
  height: 20px;
  width: auto;
  display: block;
}
</style>
