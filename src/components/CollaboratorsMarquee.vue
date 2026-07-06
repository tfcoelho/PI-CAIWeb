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
          :class="['marquee-logo', logo.class]"
        />
      </div>
      <div class="marquee-content" aria-hidden="true">
        <img
          v-for="(logo, index) in marqueeLogos"
          :key="'dup-' + index"
          :src="logo.src"
          :alt="logo.alt"
          :class="['marquee-logo', logo.class]"
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
import logodkfz from "@/assets/images/black_logos/dkfz.png";
import logoGrandChallenge from "@/assets/images/black_logos/grandchallenge.png";
import logoNtnu from "@/assets/images/black_logos/ntnu.png";

// Your single source of truth for logos
const logos = ref([
  { src: logoRumc, alt: "Radboud University Medical Center" },
  { src: logoUmcg, alt: "University Medical Center Groningen" },
  { src: logoMidl, alt: "Medical Imaging Deep Learning" },
  { src: logoEau, alt: "European Association of Urology" },
  { src: logozgt, alt: "Ziekenhuis Tjongerschans" },
  { src: logoaws, alt: "Amazon Web Services" },
  { src: logoesur, alt: "European Society of Urogenital Radiology" },
  {
    src: logodkfz,
    alt: "German Cancer Research Center (DKFZ)",
    class: "logo-dkfz",
  },
  {
    src: logoGrandChallenge,
    alt: "Grand Challenge",
    class: "logo-grandchallenge",
  },
  { src: logoNtnu, alt: "Norwegian University of Science and Technology" },
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
  padding: clamp(20px, 5dvh, 80px) 0;
  background-color: transparent;
}

.section-title {
  text-align: center;
  font-size: 22px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: clamp(16px, 4dvh, 70px);
}

.marquee-container {
  width: 70vw;
  margin: 0 auto;
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
  justify-content: space-around;
  /* This is the animation that moves the block */
  animation: scroll 50s linear infinite;
}

/* Find this rule in your CollaboratorsMarquee.vue file */
.marquee-logo {
  height: clamp(40px, 7dvh, 80px);
  margin: 0 40px;

  /* UPDATED: We add invert(1) to make the black logos white.
    We also add brightness() to make the non-hovered state a bit dimmer,
    which will make the hover effect pop more.
  */
  filter: invert(1) grayscale(1) brightness(1);
  opacity: 1;
  transition: filter 0.3s ease, opacity 0.3s ease;
}

.marquee-logo.logo-dkfz {
  height: clamp(28px, 6.3dvh, 56px);
  align-self: center;
}

.marquee-logo.logo-grandchallenge {
  height: clamp(20px, 4.5dvh, 30px);
  align-self: center;
}

/* We also update the hover state to keep the logo white */
.marquee-logo:hover {
  /*
    UPDATED: We keep invert(1) and set brightness and opacity to full.
    This makes the logo bright white when hovered.
  */
  filter: invert(1) brightness(1);
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

@media (max-width: 750px) {
  .marquee-logo {
    height: 40px;
    margin: 0 5px;
  }

  .marquee-logo.logo-dkfz {
    height: 28px;
  }

  .marquee-logo.logo-grandchallenge {
    height: 20px;
  }
}
</style>
