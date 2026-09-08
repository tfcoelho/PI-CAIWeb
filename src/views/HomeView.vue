<template>
  <div class="home-container">
    <!-- Animated logo: lives in the flow at full size, then morphs into the
         small fixed header logo (matching Research/Events pages) as the page
         scrolls. Hidden entirely on mobile, where the flow logo stays visible
         and static instead. -->
    <div
      v-if="!isMobileLayout"
      class="sticky-logo"
      :class="{ 'is-stuck': isStuck }"
      :style="stickyLogoStyle"
    >
      <img
        src="@/assets/images/logo.png"
        alt="PI-CAI logo"
        class="sticky-logo-img sticky-logo-light"
      />
      <img
        src="@/assets/images/logo_dark.png"
        alt=""
        aria-hidden="true"
        class="sticky-logo-img sticky-logo-dark"
        :class="{ 'is-visible': isLogoOverLightZone }"
      />
    </div>

    <section class="hero-section">
      <div class="hero-content">
        <div class="logo-slot" ref="logoSlotRef">
          <img
            src="@/assets/images/logo.png"
            alt="PI-CAI logo"
            class="logo-image"
            :class="{ 'logo-image--flow-hidden': !isMobileLayout }"
            @load="onHeroImageLoad"
          />
        </div>
        <img
          src="@/assets/images/message7.png"
          alt="Prostate Cancer Detection AI"
          class="vision-image"
          @load="onHeroImageLoad"
        />
        <a
          v-if="SHOW_HERO_CTA_BUTTON"
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
    </section>

    <template v-if="SHOW_ABOUT_SECTION">
      <section id="about" class="about-page">
        <AboutView />
      </section>
    </template>

    <section class="footer-section">
      <CollaboratorsMarquee />
      <div class="contact-block">
        <span class="contact-label">Contact</span>
        <a href="mailto:info@pi-cai.org" class="contact-email"
          >info@pi-cai.org</a
        >
      </div>
    </section>
  </div>
</template>

<script setup>
import { inject, nextTick, onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import AboutView from "./AboutView.vue";
import CollaboratorsMarquee from "@/components/CollaboratorsMarquee.vue";

const route = useRoute();

// Set to true to show the about/white section again
const SHOW_ABOUT_SECTION = true;
// Set to true to show the symposium card on the home page again
const SHOW_SYMPOSIUM_CARD = false;
// Set to true to show the external "More Information" CTA button in the hero
const SHOW_HERO_CTA_BUTTON = false;

const isMobileLayout = ref(window.innerWidth <= 750);

// --- Nav appearance -------------------------------------------------------
// The header nav is fixed on top of the page. The hero, footer, and the two
// accent cards inside the About section are dark; everything else in the
// About section is light. Flip the nav's text color based on which of these
// is actually behind it, rather than the About section as a single block —
// it has dark cards nested in an otherwise light background.
const setNavAppearance = inject("setNavAppearance", null);
let darkZoneEls = [];

// The Home/About nav links share this same scrollable page — report which
// one should read as "active" based on scroll position (has the hero been
// scrolled past?) rather than the URL, since scrolling doesn't change routes.
const setScrollNavOverride = inject("setScrollNavOverride", null);
let heroEl = null;

// The sticky logo uses a coarser version of the same check: the two accent
// cards are rounded and inset, so the probe point at the logo's left-hand
// position often reads "dark" a little before the card's color actually
// reaches that far — flipping the logo to its dark variant right as it's
// about to sit on a dark card looks wrong. The logo also always has a
// blurred pill behind it once stuck, so it stays legible over a card either
// way. So once scrolled into the About section, keep it dark regardless of
// the cards; only the hero and footer (both edge-to-edge, unambiguous) flip
// it back to light.
let logoDarkZoneEls = [];
const isLogoOverLightZone = ref(false);

function isOverAnyOf(els, probeY) {
  return els.some((el) => {
    const rect = el.getBoundingClientRect();
    return rect.top <= probeY && rect.bottom >= probeY;
  });
}

function updateNavAppearance() {
  const navProbeY = 40; // roughly the vertical center of the fixed nav pill
  const isOverLightZone = !isOverAnyOf(darkZoneEls, navProbeY);
  if (setNavAppearance) setNavAppearance(isOverLightZone);
  isLogoOverLightZone.value = !isOverAnyOf(logoDarkZoneEls, navProbeY);

  if (setScrollNavOverride) {
    const isPastHero = heroEl && !isOverAnyOf([heroEl], navProbeY);
    setScrollNavOverride(isPastHero ? "/about" : null);
  }
}

// --- Sticky shrinking logo -------------------------------------------------
// The logo starts full-size in the hero and morphs into the small fixed
// header logo used on every other page (132px wide, top:20px, left:6%) as
// the user scrolls, then stays parked there. Rather than animating a CSS
// `transform: scale()` (which needs a transform-origin and previously caused
// the logo to visually drift away from the tagline below it as it shrank),
// this interpolates the actual top/left/width between the logo's real
// measured start position and its final header position — a small FLIP-style
// layout animation. Because the tagline's position is governed entirely by
// the untouched `.logo-slot` spacer (not by this animation), the gap between
// them never changes.
const logoSlotRef = ref(null);
const stickyLogoStyle = ref({});
const isStuck = ref(false);

const LOGO_TARGET_TOP = 20;
const LOGO_TARGET_WIDTH = 132;
const LOGO_TARGET_LEFT_RATIO = 0.06;

let logoStartTop = 0;
let logoStartLeft = 0;
let logoStartWidth = 0;
let logoScrollThreshold = 1;

function measureLogoStart() {
  if (!logoSlotRef.value) return;
  const rect = logoSlotRef.value.getBoundingClientRect();
  // Store the logo's position relative to the document (not the viewport) so
  // this stays correct however far the page happens to already be scrolled.
  logoStartTop = rect.top + window.scrollY;
  logoStartLeft = rect.left;
  logoStartWidth = rect.width;
  logoScrollThreshold = Math.max(1, logoStartTop - LOGO_TARGET_TOP);
}

function updateStickyLogo() {
  if (isMobileLayout.value) return;
  const progress = Math.min(
    1,
    Math.max(0, window.scrollY / logoScrollThreshold)
  );
  const targetLeft = window.innerWidth * LOGO_TARGET_LEFT_RATIO;
  const lerp = (from, to) => from + (to - from) * progress;

  stickyLogoStyle.value = {
    top: `${lerp(logoStartTop, LOGO_TARGET_TOP)}px`,
    left: `${lerp(logoStartLeft, targetLeft)}px`,
    width: `${lerp(logoStartWidth, LOGO_TARGET_WIDTH)}px`,
  };
  isStuck.value = progress >= 1;
}

// --- Shared scroll/resize handling -----------------------------------------
let ticking = false;

function update() {
  updateNavAppearance();
  updateStickyLogo();
}

function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    update();
    ticking = false;
  });
}

function onResize() {
  isMobileLayout.value = window.innerWidth <= 750;
  if (!isMobileLayout.value) measureLogoStart();
  onScroll();
}

// The hero images (logo + tagline) don't have intrinsic dimensions until
// they load, and hero-content is vertically centered based on their
// combined height — so the logo's true start position isn't known until
// they've actually loaded. Re-measure each time one finishes.
function onHeroImageLoad() {
  if (!isMobileLayout.value) measureLogoStart();
  update();
}

onMounted(async () => {
  await nextTick();
  heroEl = document.querySelector(".hero-section");
  darkZoneEls = Array.from(
    document.querySelectorAll(
      ".hero-section, .footer-section, .collaboration-container, .cta-section"
    )
  );
  logoDarkZoneEls = Array.from(
    document.querySelectorAll(".hero-section, .footer-section")
  );
  measureLogoStart();
  update();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  // Safety net in case an image's load event fired before its listener was
  // bound (e.g. served from cache).
  window.addEventListener("load", onHeroImageLoad);

  // Navigating here from a different page (e.g. clicking "About" while on
  // Research) mounts this component fresh, inside App.vue's custom leave/
  // enter mask transition. Vue Router's own scrollBehavior can fire before
  // that transition has actually revealed the page, so `#about` isn't in a
  // scrollable state yet and the scroll silently does nothing. Double-rAF to
  // land after the transition's own reveal, then scroll manually.
  if (route.meta?.scrollTo) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document
          .querySelector(route.meta.scrollTo)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
  window.removeEventListener("resize", onResize);
  window.removeEventListener("load", onHeroImageLoad);
  if (setNavAppearance) setNavAppearance(false);
  if (setScrollNavOverride) setScrollNavOverride(null);
});
</script>

<style scoped>
.home-container {
  position: relative;
}

.sticky-logo {
  position: fixed;
  top: 20px;
  left: 6%;
  z-index: 40;
  display: grid;
  pointer-events: none;
}

.sticky-logo-img {
  grid-row: 1 / 2;
  grid-column: 1 / 2;
  width: 100%;
  height: auto;
  display: block;
  transition: opacity 0.25s ease;
}

.sticky-logo-dark {
  opacity: 0;
}

.sticky-logo-dark.is-visible {
  opacity: 1;
}

.sticky-logo.is-stuck {
  padding: 4px;
  border-radius: 6px;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.hero-section {
  position: relative;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  box-sizing: border-box;
  background-color: #111820;
  background-image: url("@/assets/images/background.webp");
  background-position: 80% center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  overflow: hidden;
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: min(90vw, 34vw, 55vh, 560px);
  margin-left: 16%;
}

.logo-slot {
  width: 100%;
}

.logo-image {
  width: 100%;
  height: auto;
  margin-bottom: clamp(10px, 3dvh, 24px);
  animation: fadeIn 0.5s ease-out forwards;
}

.logo-image--flow-hidden {
  visibility: hidden;
}

.vision-image {
  width: 100%;
  animation: fadeIn 0.7s ease-out forwards;
}

.symposium-card {
  margin-top: clamp(14px, 3dvh, 32px);
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

.gradient-border-button {
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 99px;
  color: white;
  position: relative;
  margin-top: clamp(10px, 2dvh, 20px);
  z-index: 1;
  padding: 12px 20px;
  font-weight: 200;
  font-family: "Nunito-Sans", sans-serif;
  letter-spacing: 2px;
  overflow: hidden;
  cursor: pointer;
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
  background: linear-gradient(to right, #db23a1 0%, #f01160 100%);
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

.footer-section {
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #111820;
  background-image: url("@/assets/images/background.webp");
  background-position: 5% 100%;
  background-size: 300%;
  background-repeat: no-repeat;
  padding: clamp(32px, 6dvh, 56px) 5% clamp(20px, 4dvh, 32px);
}

.contact-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin-top: clamp(6px, 1.6dvh, 18px);
}

.contact-label {
  font-family: "Nunito-Sans", sans-serif;
  letter-spacing: 1.2px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  color: rgba(255, 141, 213, 0.6);
}

.contact-email {
  font-family: "Nunito-Sans", sans-serif;
  font-size: 13px;
  letter-spacing: 0.6px;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: none;
  transition: color 0.2s ease;
}

.contact-email:hover {
  color: rgba(255, 255, 255, 0.85);
}

@media (max-width: 750px) {
  .hero-section {
    /* `background-attachment: fixed` is unreliable on mobile browsers
       (notably iOS Safari) — fall back to a normal scrolling background. */
    background-attachment: scroll;
    align-items: center;
  }

  .hero-content {
    align-items: center;
    text-align: center;
    margin-left: 0;
    width: min(88%, 360px);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
