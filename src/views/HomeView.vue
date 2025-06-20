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
      :style="{ transform: `scale(${logoScale})` }"
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
          src="@/assets/images/message.png"
          alt="Prostate Cancer Detection AI"
          class="vision-image"
        />
        <a href="https://pi-cai.grand-challenge.org/" target="_blank">
          <button class="gradient-border-button">
            <span class="button-text">More Information</span>
            <img
              src="@/assets/images/arrow.png"
              alt="Arrow"
              class="arrow-icon"
            />
          </button>
        </a>
      </div>
    </div>

    <section id="about" ref="aboutSectionRef">
      <AboutView />
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, inject } from "vue";
import AboutView from "./AboutView.vue";

const logoScale = ref(1);
const isSticky = ref(false);
const aboutSectionRef = ref(null); // This will be a reference to the <section> element
const isOverWhiteBg = ref(false); // This will be true when we are over the #about section
const isMaskHidden = ref(false);
const showTopFade = ref(false);

const setNavAppearance = inject("setNavAppearance");

// --- This WATCH effect now calls the injected function ---
watch(isOverWhiteBg, (isOver) => {
  if (setNavAppearance) {
    setNavAppearance(isOver);
  }
});

// This function handles the logo scaling on scroll
function handleScroll() {
  // On mobile, do nothing and ensure the logo is full size.
  if (window.innerWidth <= 700) {
    logoScale.value = 1;
    return;
  }

  const scrollY = window.scrollY;
  // Shrink the logo based on scroll, but not smaller than 40%
  logoScale.value = Math.max(0.3, 1 - scrollY / 650);
  isSticky.value = scrollY > 10;
}

let aboutObserver;
let maskObserver;
let fadeObserver;

// Add and remove the scroll listener for the window
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  const options = {
    // Trigger when the top of the about section is 30% from the top of the viewport
    rootMargin: "-5% 0px -95% 0px",
    threshold: 0,
  };
  const callback = (entries) => {
    entries.forEach((entry) => {
      // If the about section is intersecting our trigger line, set our flag to true
      isOverWhiteBg.value = entry.isIntersecting;
    });
  };

  aboutObserver = new IntersectionObserver(callback, options);
  if (aboutSectionRef.value) {
    aboutObserver.observe(aboutSectionRef.value);
  }

  const fadeOptions = {
    rootMargin: "0% 0px -100% 0px", // Triggers later
    threshold: 0,
  };
  const fadeCallback = (entries) => {
    entries.forEach((entry) => {
      showTopFade.value = entry.isIntersecting;
    });
  };
  fadeObserver = new IntersectionObserver(fadeCallback, fadeOptions);
  if (aboutSectionRef.value) {
    fadeObserver.observe(aboutSectionRef.value);
  }

  const maskOptions = {
    rootMargin: "-20% 0px -85% 0px", // Trigger line is LOW on the screen
    threshold: 0,
  };
  const maskCallback = (entries) => {
    entries.forEach((entry) => {
      isMaskHidden.value = entry.isIntersecting;
    });
  };
  maskObserver = new IntersectionObserver(maskCallback, maskOptions);
  if (aboutSectionRef.value) {
    maskObserver.observe(aboutSectionRef.value);
  }
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  if (aboutObserver) aboutObserver.disconnect();
  if (maskObserver) maskObserver.disconnect();
  if (fadeObserver) fadeObserver.disconnect();
  if (setNavAppearance) {
    setNavAppearance(false);
  }
});
</script>

<style scoped>
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
  position: sticky;
  top: -52px;
  left: 16%;
  width: 560px;
  z-index: 15;
  transform-origin: bottom left;
  transition: transform 0s linear;
  align-self: start;
  justify-self: start;
  margin-left: 16%;
  margin-top: 37vh;
  display: grid;
}

.logo-image {
  /* This places both images into the same grid cell, stacking them */
  grid-row: 1 / 2;
  grid-column: 1 / 2;

  /* This ensures the image fills the container correctly */
  width: 100%;
  height: auto;

  /* The opacity transition for the color swap remains the same */
  transition: opacity 0s ease-in-out;
}

/* The black logo starts out invisible */
.logo-black {
  opacity: 0;
}

/* When the .on-about-section class is active, fade out the white and fade in the black */
.sticky-logo.on-about-section .logo-white {
  opacity: 0;
}
.sticky-logo.on-about-section .logo-black {
  opacity: 1;
}

.hero-section {
  position: relative;
  width: 100%;
  height: 100vh;
  background-image: url("@/assets/images/background.webp");
  background-position: 80% center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
}

/* The text and button inside the hero section */
.hero-content {
  position: absolute;
  top: 38%;
  left: 16%;
  width: 560px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.vision-image {
  padding-top: 125px;
  width: 100%;
  animation: slideInFromLeft 1s ease-out forwards;
}

/* This creates the gradient mask element, but it starts invisible */
.hero-section::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 250px; /* The height of the fade effect */
  z-index: 9; /* Below the logo (z-index: 10) */

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

.home-container.hide-mask .hero-section::before {
  opacity: 0;
}

.home-container::before {
  content: "";
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 120px;
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
  top: 30px;
  padding: 12px 20px;
  cursor: pointer;
  animation: slideInFromLeft 1.4s ease-out forwards;
}

.gradient-border-button {
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 99px;
  color: white;
  position: relative;
  top: 30px;
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

/* On screens 750px or less, we override the desktop styles */
@media (max-width: 750px) {
  .sticky-logo {
    position: absolute;
    top: 28%; /* Position it 15% from the top of the screen */
    left: 50%; /* Center it horizontally */
    transform: translateX(-50%) scale(1) !important; /* Force full size and center */
    width: 80%;
    margin: 0; /* Reset any desktop margins */
  }

  .hero-content {
    position: absolute;
    top: 45%; /* Position it vertically centered */
    left: 50%; /* Center it horizontally */
    transform: translateY(-50%) translateX(-50%);
    width: 80%; /* Give it a slightly wider width */
    align-items: center; /* Center the content */
  }

  .vision-image {
    padding-top: 0; /* Remove desktop padding */
  }
}

@media (max-width: 900px) and (orientation: landscape) {
  /* Make the sticky logo much smaller and move it to the corner */
  .sticky-logo {
    top: 28%;
    left: 34%;
    width: 50%; /* A smaller fixed width */
  }

  /* Reposition the hero content to give the logo space */
  .hero-content {
    top: 60%;
    left: 10%;
    width: 50%; /* A smaller width for the content */
    transform: translateY(-50%);
    align-items: flex-start;
  }
}

/* Keyframes and other styles from your original file */
@keyframes slideInFromLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
