<template>
  <div class="marquee-section">
    <h2 class="section-title">Our Collaborators</h2>
    <div class="marquee-container">
      <div class="marquee-content">
        <img
          v-for="(logo, index) in marqueeLogos"
          :key="index"
          :src="logo.src"
          :alt="logo.alt"
          class="marquee-logo"
        />
      </div>
      <div class="marquee-content" aria-hidden="true">
        <img
          v-for="(logo, index) in marqueeLogos"
          :key="'dup-' + index"
          :src="logo.src"
          :alt="logo.alt"
          class="marquee-logo"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// --- Import each logo image directly ---
import logoRumc from "@/assets/images/black_logos/rumc.png";
import logoUmcg from "@/assets/images/black_logos/umcg.png";
import logoMidl from "@/assets/images/black_logos/midl.png";
import logoEau from "@/assets/images/black_logos/eau.png";
import logozgt from "@/assets/images/black_logos/zgt.png";
import logoaws from "@/assets/images/black_logos/aws.png";
import logoesur from "@/assets/images/black_logos/esur.png";

// Your single source of truth for logos
const logos = ref([
  { src: logoRumc, alt: "Radboud University Medical Center" },
  { src: logoUmcg, alt: "University Medical Center Groningen" },
  { src: logoMidl, alt: "Medical Imaging Deep Learning" },
  { src: logoEau, alt: "European Association of Urology" },
  { src: logozgt, alt: "Ziekenhuis Tjongerschans" },
  { src: logoaws, alt: "Amazon Web Services" },
  { src: logoesur, alt: "European Society of Urogenital Radiology" },
]);

// This computed property ensures the list is long enough
const marqueeLogos = computed(() => {
  if (!logos.value || logos.value.length === 0) return [];
  const output = [];
  while (output.length < 10) {
    output.push(...logos.value);
  }
  return output;
});
</script>

<style scoped>
.marquee-section {
  padding: 80px 0;
  background-color: transparent;
}

.section-title {
  text-align: center;
  font-size: 30px;
  font-weight: 600;
  color: #111;
  margin-bottom: 70px;
}

.marquee-container {
  width: 70vw;
  overflow: hidden;
  display: flex;
  mask-image: linear-gradient(
    to right,
    transparent,
    black 10%,
    black 90%,
    transparent
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    black 10%,
    black 90%,
    transparent
  );
}

.marquee-content {
  display: flex;
  flex-shrink: 0; /* Prevents the block from shrinking */
  align-items: center;
  justify-content: space-around;
  /* This is the animation that moves the block */
  animation: scroll 50s linear infinite;
}

.marquee-logo {
  height: 80px;
  margin: 0 40px;
  filter: grayscale(100%);
  opacity: 0.6;
  transition: filter 0.3s ease, opacity 0.3s ease;
}

.marquee-logo:hover {
  filter: grayscale(0%);
  opacity: 1;
}

@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    /* This moves the block to the left by its full width, creating the loop */
    transform: translateX(-100%);
  }
}

/* Pause the animation on hover */
.marquee-container:hover .marquee-content {
  animation-play-state: paused;
}
</style>
