<template>
  <div
    class="home-container"
    :class="{
      'logo-is-sticky': isSticky,
      'on-about-section': isOverWhiteBg,
      'hide-mask': isMaskHidden,
      'fade-is-active': showTopFade,
    }"
  >
    <div
      class="sticky-logo"
      :class="{
        'on-about-section': isOverWhiteBg,
        'is-sticky-active': isSticky,
      }"
      :style="logoTransformStyle"
    >
      <img src="@/assets/images/logo.png" alt="Logo" class="logo-image" />
      <img
        src="@/assets/images/logo_dark.png"
        alt="Logo"
        class="logo-image logo-black"
      />
    </div>
    <div class="hero-section">
      <div class="hero-content">
        <img
          src="@/assets/images/message2.png"
          alt="Prostate Cancer Detection AI"
          class="vision-image"
        />
        <a
          v-if="SHOW_ABOUT_SECTION"
          href="https://pi-cai.grand-challenge.org/"
          target="_blank"
        >
          <button class="gradient-border-button">
            <span class="button-text">More Information</span>
            <img
              src="@/assets/images/arrow.png"
              alt="Arrow"
              class="arrow-icon"
            />
          </button>
        </a>
        <router-link
          v-if="SHOW_SYMPOSIUM_CARD"
          to="/symposium-2026"
          class="symposium-card"
        >
          <span class="symposium-badge">New Symposium</span>
          <h2 class="symposium-title">
            Artificial Intelligence for Prostate Cancer Diagnosis and Screening
            on MRI: Current Practice, Evidence Gaps, and the Research Agenda
          </h2>
          <p class="symposium-meta">June 1 | Radboud University, Nijmegen</p>
          <span class="symposium-cta">View Symposium Program</span>
        </router-link>
      </div>
    </div>

    <template v-if="SHOW_ABOUT_SECTION">
      <section id="about" ref="aboutSectionRef" class="about-page">
        <AboutView />
      </section>
    </template>
    <section
      class="marquee-container"
      :class="{ 'marquee-seamless': !SHOW_ABOUT_SECTION }"
    >
      <CollaboratorsMarquee />
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, inject, computed } from "vue";
import AboutView from "./AboutView.vue";

// Set to true to show the about/white section again
const SHOW_ABOUT_SECTION = false;
// Set to true to show the symposium card on the home page again
const SHOW_SYMPOSIUM_CARD = false;
import CollaboratorsMarquee from "@/components/CollaboratorsMarquee.vue";

const logoScale = ref(1);
const logoTopPx = ref(
  window.innerHeight *
    (window.innerHeight < 700 ? 0.25 : window.innerHeight < 820 ? 0.3 : 0.37)
);
const isSticky = ref(false);
const aboutSectionRef = ref(null);
const isOverWhiteBg = ref(false);
const isMaskHidden = ref(false);
const showTopFade = ref(false);
const isMobileLayout = ref(window.innerWidth <= 750);

const setNavAppearance = inject("setNavAppearance");

watch(isOverWhiteBg, (isOver) => {
  if (setNavAppearance) setNavAppearance(isOver);
});

// --- Constants ---
const NAV_Y = 20; // px — where the logo sticks (matches nav top)
const MIN_SCALE = 0.1;
const STICKY_SCALE = 0.3; // scale the logo should be at exactly when it sticks

// On short screens the logo sits higher so hero content fits within 100dvh
function getLogoInitialTop() {
  if (window.innerHeight < 700) return 0.25;
  if (window.innerHeight < 820) return 0.3;
  return 0.37;
}

// Compute shrink distance so the logo naturally reaches STICKY_SCALE at the
// sticky threshold — eliminates any scale jump when snapping to the nav bar.
// On tall screens this resolves to ~0.5 (unchanged); on short screens it
// shrinks faster so it arrives at STICKY_SCALE at exactly the right scroll.
function getShrinkDistance(vh) {
  const stickyScrollY = getLogoInitialTop() * vh - NAV_Y;
  return stickyScrollY / ((1 - STICKY_SCALE) * vh);
}

// --- Computed style: JS drives position+scale on desktop, CSS handles mobile ---
const logoTransformStyle = computed(() => {
  if (isMobileLayout.value) return {};
  return {
    transform: `translateY(${logoTopPx.value}px) scale(${logoScale.value})`,
  };
});

function handleScroll() {
  if (isMobileLayout.value) {
    logoScale.value = 1;
    return;
  }

  const scrollY = window.scrollY;
  const vh = window.innerHeight;
  const logoInitialTop = getLogoInitialTop() * vh;
  const shrinkDistance = getShrinkDistance(vh);
  // The scroll amount at which the logo's top edge reaches NAV_Y
  const stickyScrollY = logoInitialTop - NAV_Y;

  if (scrollY >= stickyScrollY) {
    // Logo has reached the nav bar — scale is already STICKY_SCALE here (no jump)
    isSticky.value = true;
    logoTopPx.value = NAV_Y;
    logoScale.value = Math.max(
      MIN_SCALE,
      1 - stickyScrollY / (shrinkDistance * vh)
    );
  } else {
    // Logo follows the page upward while shrinking
    isSticky.value = false;
    logoTopPx.value = logoInitialTop - scrollY;
    logoScale.value = Math.max(MIN_SCALE, 1 - scrollY / (shrinkDistance * vh));
  }
}

function handleResize() {
  isMobileLayout.value = window.innerWidth <= 750;
  if (!isMobileLayout.value) {
    // vh may have changed — recalculate
    logoTopPx.value = window.innerHeight * getLogoInitialTop();
    handleScroll();
  }
}

function handleOrientationChange() {
  setTimeout(() => {
    isMobileLayout.value = window.innerWidth <= 750;
    if (!isMobileLayout.value) {
      logoTopPx.value = window.innerHeight * getLogoInitialTop();
      handleScroll();
    }
  }, 150);
}

let aboutObserver;
let fadeObserver;

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", handleResize);
  window.addEventListener("orientationchange", handleOrientationChange);

  // Initialize position/scale based on current scroll (handles page reload mid-scroll)
  handleScroll();

  aboutObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => (isOverWhiteBg.value = e.isIntersecting)),
    { rootMargin: "-5% 0px -95% 0px", threshold: 0 }
  );
  if (aboutSectionRef.value) aboutObserver.observe(aboutSectionRef.value);

  fadeObserver = new IntersectionObserver(
    (entries) => entries.forEach((e) => (showTopFade.value = e.isIntersecting)),
    { rootMargin: "0% 0px -100% 0px", threshold: 0 }
  );
  if (aboutSectionRef.value) fadeObserver.observe(aboutSectionRef.value);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("resize", handleResize);
  window.removeEventListener("orientationchange", handleOrientationChange);
  if (aboutObserver) aboutObserver.disconnect();
  if (fadeObserver) fadeObserver.disconnect();
  if (setNavAppearance) setNavAppearance(false);
});
</script>

<style scoped>
.about-page {
  z-index: 3;
}
/* Add these new rules to your HomeView.vue <style scoped> */

/* This is the container for the entire home page */
.home-container {
  display: grid;
  grid-template-columns: 1fr; /* A single full-width column */
  background-color: #111820;
}

.sticky-logo,
.hero-section {
  grid-row: 1 / 2;
  grid-column: 1 / 2;
}

.sticky-logo {
  position: fixed;
  top: 0; /* JS controls actual Y via translateY */
  left: 16%;
  width: 560px;
  z-index: 15;
  transform-origin: top left; /* top-left anchor = top edge stays where JS puts it */
  display: grid;
  /* Explicit fade-in so fixed+transform compositor layer can't escape parent opacity */
  animation: logoFadeIn 0.35s ease-out forwards;
}

.sticky-logo.is-sticky-active {
  z-index: 20;
}

.logo-image {
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  width: 100%;
  height: auto;
  transition: opacity 0s ease-in-out;
}

.logo-black {
  opacity: 0;
}

.sticky-logo.on-about-section .logo-white {
  opacity: 0;
}
.sticky-logo.on-about-section .logo-black {
  opacity: 1;
}

.hero-section {
  position: relative;
  width: 100%;
  height: 100dvh;
  display: flex;
  align-items: flex-start;
  padding-top: calc(37dvh + 135px);
  padding-bottom: clamp(20px, 4dvh, 60px);
  box-sizing: border-box;
  overflow: hidden;
  background-image: url("@/assets/images/background.webp");
  background-position: 80% center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

/* The text and button inside the hero section */
.hero-content {
  margin-left: 16%;
  width: 560px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.vision-image {
  width: 100%;
  animation: slideInFromLeft 1s ease-out forwards;
}

.symposium-card {
  margin-top: clamp(14px, 5dvh, 52px);
  padding: clamp(12px, 2dvh, 18px) 20px;
  width: min(100%, 540px);
  border-radius: 14px;
  text-align: left;
  text-decoration: none;
  color: #ffffff;
  background: rgba(8, 12, 17, 0.66);
  border: 1px solid rgba(255, 255, 255, 0.28);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
  transition: transform 0.2s ease, border-color 0.2s ease,
    background-color 0.2s ease;
  animation: slideInFromLeft 1.2s ease-out forwards;
}

.symposium-card:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.45);
  background: rgba(10, 15, 21, 0.78);
}

.symposium-badge {
  display: inline-block;
  font-family: "Nunito-Sans", sans-serif;
  letter-spacing: 1.2px;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  color: #ff8dd5;
}

.symposium-title {
  margin: 10px 0 8px 0;
  font-family: "Nunito-Sans", sans-serif;
  font-size: 21px;
  line-height: 1.2;
  font-weight: 700;
}

.symposium-meta {
  margin: 0;
  font-family: "Nunito-Sans", sans-serif;
  font-size: 14px;
  letter-spacing: 0.6px;
  color: rgba(255, 255, 255, 0.9);
}

.symposium-cta {
  display: inline-block;
  margin-top: 14px;
  font-family: "Nunito-Sans", sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.7);
}

/* This creates the gradient mask element, but it starts invisible */
.hero-section::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 17vh; /* The height of the fade effect */
  z-index: 2; /* Below the logo (z-index: 10) */

  /* The background image that it fades to */
  background-image: url("@/assets/images/background.webp");
  background-position: 80% center;
  background-size: cover;
  background-attachment: fixed;

  /* The fade effect mask */
  mask-image: linear-gradient(to bottom, black 50%, transparent 100%);

  /* Start invisible and transition smoothly */
  opacity: 0;
  transition: opacity 0s ease-in-out;
  pointer-events: none; /* Allows clicks to pass through */
}

/* When the logo is sticky, this class is added, and the mask becomes visible */
.home-container.logo-is-sticky .hero-section::before {
  opacity: 1;
}

.home-container::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 11vh;
  z-index: 10;

  background: linear-gradient(to bottom, #ebebf5 40%, transparent);
  opacity: 0;
  transition: opacity 0s ease-in-out;
  pointer-events: none;
}

/* UPDATE THIS RULE: 
  When the .fade-is-active class is present, the gradient fades in.
*/
.home-container.fade-is-active::before {
  opacity: 1;
}

.gradient-border-button {
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 99px;
  color: white;
  position: relative;
  top: clamp(10px, 3dvh, 30px);
  z-index: 1;
  padding: 12px 20px;
  font-weight: 200;
  font-family: "Nunito-Sans", sans-serif;
  letter-spacing: 2px;
  overflow: hidden;
  cursor: pointer;
  animation: slideInFromLeft 1.4s ease-out forwards;
}

.gradient-border-button:before,
.gradient-border-button:after {
  content: " ";
  position: absolute;
  border-radius: 99px;
}

.gradient-border-button:before {
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -2;
  background: #db23a1;
  background: -moz-linear-gradient(left, #db23a1 0%, #f01160 100%);
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    color-stop(0%, #db23a1),
    color-stop(100%, #f01160)
  );
  background: -webkit-linear-gradient(left, #db23a1 0%, #f01160 100%);
  background: -o-linear-gradient(left, #db23a1 0%, #f01160 100%);
  background: -ms-linear-gradient(left, #db23a1 0%, #f01160 100%);
  background: linear-gradient(to right, #db23a1 0%, #f01160 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#db23a1', endColorstr='#f01160',GradientType=1 );
}

.gradient-border-button:after {
  top: 1px;
  bottom: 1px;
  left: 1px;
  right: 1px;
  background-color: #0a0a0b;
  z-index: -1;
  opacity: 1;
  transition: all 0.4s ease-in-out;
}

.gradient-border-button:hover:after {
  opacity: 0;
  transition: all 0.1s ease-in-out;
}

.arrow-icon {
  width: 12px;
  height: auto;
  transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
  opacity: 0;
  transform: translateX(5px);
}

.gradient-border-button:hover .arrow-icon {
  opacity: 1;
  transform: translateX(0px);
}

.button-text {
  padding-left: 15px;
  font-size: 20px;
  transition: transform 0.2s ease-in-out;
}

.gradient-border-button:hover .button-text {
  transform: translateX(-10px);
}

#about {
  min-height: 100vh;
  background-color: #ebebf5;
  padding: 5%;
  color: #333;
}

.marquee-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  margin: 0 auto;
  background: url("@/assets/images/background.webp");
}

.marquee-seamless {
  background-position: 80% center;
  background-size: cover;
  background-attachment: fixed;
}

/* On screens 750px or less, we override the desktop styles */
/* Short viewport: compress hero content to stay within 100dvh */
@media (max-height: 700px) and (min-width: 751px) {
  /* Very short screens: logo at 25dvh, 400px wide, height ~96px */
  .sticky-logo {
    width: 400px;
  }

  .hero-section {
    padding-top: calc(25dvh + 96px);
  }

  .hero-content {
    width: 400px;
  }

  .symposium-title {
    font-size: 16px;
    margin: 4px 0 4px 0;
  }

  .symposium-badge {
    font-size: 10px;
  }

  .symposium-meta,
  .symposium-cta {
    font-size: 12px;
  }

  .symposium-cta {
    margin-top: 8px;
  }
}

@media (max-height: 820px) and (min-width: 751px) {
  /* Short screens: logo at 30dvh, 460px wide, height ~111px */
  .sticky-logo {
    width: 460px;
  }

  .hero-section {
    padding-top: calc(30dvh + 100px);
  }

  .hero-content {
    width: 460px;
  }

  .symposium-title {
    font-size: 18px;
    margin: 6px 0 5px 0;
  }

  .symposium-badge {
    font-size: 10px;
  }

  .symposium-meta,
  .symposium-cta {
    font-size: 13px;
  }

  .symposium-cta {
    margin-top: 10px;
  }
}

@media (max-width: 750px) {
  /* Switch from grid to block — eliminates any sub-pixel grid gaps showing
     the dark #111820 container background at the top */
  .home-container {
    --mobile-hero-width: min(88%, 360px);
    --mobile-y-offset: 100px;
    display: block;
    position: relative;
    /* Fallback bg so any edge cases show the image, not bare dark color */
    background-image: url("@/assets/images/background.webp");
    background-size: cover;
    background-position: top center;
    background-attachment: scroll;
  }

  .hero-section {
    min-height: 100vh;
    min-height: 107dvh;
    height: auto;
    padding: 0 0 52px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-attachment: scroll !important;
    background-position: top center !important;
    background-size: cover;
  }

  .sticky-logo {
    position: absolute !important;
    top: calc(70px + var(--mobile-y-offset)) !important;
    left: 50%;
    transform: translateX(-50%) !important;
    width: var(--mobile-hero-width);
    margin: 0;
    bottom: auto !important;
    animation: none !important;
    transform-origin: top center;
  }

  .hero-content {
    position: relative;
    top: 0;
    left: auto;
    transform: none;
    width: var(--mobile-hero-width);
    margin-left: 0;
    align-items: center;
    /* Push content below the absolute logo, with a tighter logo-to-slogan gap */
    margin-top: calc(152px + var(--mobile-y-offset));
  }

  .vision-image {
    width: 100%;
  }

  .gradient-border-button {
    top: 0;
    margin-top: 18px;
    align-self: center;
    padding: 8px 14px;
    letter-spacing: 1.2px;
  }

  .button-text {
    padding-left: 10px;
    font-size: 16px;
  }

  .arrow-icon {
    width: 10px;
  }

  .symposium-card {
    margin-top: 28px;
    padding: 14px 16px;
    width: 100%;
  }

  .symposium-title {
    font-size: 17px;
  }

  .symposium-meta,
  .symposium-cta {
    font-size: 13px;
  }

  .marquee-seamless {
    background: transparent;
  }

  .home-container:has(.marquee-seamless) .hero-section {
    background-image: none;
  }
}

@media (max-width: 750px) and (orientation: landscape) {
  .home-container {
    --mobile-hero-width: min(55%, 400px);
    --mobile-y-offset: 16px;
  }

  .hero-section {
    min-height: 100vw; /* landscape: use width as min-height */
    padding: 0 0 36px;
  }

  .sticky-logo {
    top: calc(52px + var(--mobile-y-offset)) !important;
    width: var(--mobile-hero-width);
  }

  .hero-content {
    width: var(--mobile-hero-width);
    margin-top: calc(118px + var(--mobile-y-offset));
  }

  .gradient-border-button {
    top: 0;
    margin-top: 16px;
  }

  .symposium-card {
    margin-top: 20px;
  }
}

@keyframes logoFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Keyframes and other styles from your original file */
@keyframes slideInFromLeft {
  from {
    /* opacity removed — page transition owns all fading, this only slides */
    transform: translateX(-50px);
  }
  to {
    transform: translateX(0);
  }
}
</style>
