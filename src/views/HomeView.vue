<template>
  <div class="home-container">
    <div class="hero-content">
      <img
        src="@/assets/images/logo.png"
        alt="PI-CAI logo"
        class="logo-image"
      />
      <img
        src="@/assets/images/message7.png"
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
          <img src="@/assets/images/arrow.png" alt="Arrow" class="arrow-icon" />
        </button>
      </a>
      <router-link
        v-if="SHOW_SYMPOSIUM_CARD"
        to="/symposium-2026"
        class="symposium-card"
      >
        <span class="symposium-badge">New Symposium</span>
        <h2 class="symposium-title">
          Artificial Intelligence for Prostate Cancer Diagnosis and Screening on
          MRI: Current Practice, Evidence Gaps, and the Research Agenda
        </h2>
        <p class="symposium-meta">June 1 | Radboud University, Nijmegen</p>
        <span class="symposium-cta">View Symposium Program</span>
      </router-link>
    </div>

    <template v-if="SHOW_ABOUT_SECTION">
      <section id="about" class="about-page">
        <AboutView />
      </section>
    </template>

    <section class="marquee-container">
      <CollaboratorsMarquee />
    </section>
  </div>
</template>

<script setup>
import AboutView from "./AboutView.vue";
import CollaboratorsMarquee from "@/components/CollaboratorsMarquee.vue";

// Set to true to show the about/white section again
const SHOW_ABOUT_SECTION = false;
// Set to true to show the symposium card on the home page again
const SHOW_SYMPOSIUM_CARD = false;
</script>

<style scoped>
.home-container {
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
  overflow: hidden;
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: min(90vw, 34vw, 55vh, 560px);
  margin-left: 16%;
}

.logo-image {
  width: 100%;
  height: auto;
  margin-bottom: clamp(10px, 3dvh, 24px);
  animation: fadeIn 0.5s ease-out forwards;
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

.marquee-container {
  position: absolute;
  left: 0;
  right: 0;
  bottom: clamp(16px, 3dvh, 40px);
  width: 100%;
  overflow: hidden;
}

@media (max-width: 750px) {
  .home-container {
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
