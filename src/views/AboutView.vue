<template>
  <div class="about-page">
    <section class="hero">
      <h1>
        <span class="gradient-text">Objective</span>,
        <span class="gradient-text">Transparent</span>, and
        <span class="gradient-text">Collaborative</span> AI Benchmarking.
      </h1>
      <p>
        PI-CAI is a global initiative that maintains a public, standardized
        benchmarking framework for evaluating AI in prostate cancer detection on
        MRI. Our goal is to enable objective validation that accelerates the
        safe and effective integration of AI into clinical practice.
      </p>
    </section>
    <div class="collaboration-container">
      <video autoplay loop muted playsinline class="background-video">
        <source
          src="@/assets/images/background_vid_medium.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div class="container-content">
        <CollaborationStats />
      </div>
    </div>
  </div>
</template>

<script>
import CollaborationStats from "@/components/CollaborationStats.vue";

export default {
  name: "AboutView",
  components: {
    CollaborationStats,
  },
};
</script>
<style scoped>
/* This is now back to being a simple layout wrapper for the whole page.
  It just controls the max-width and centering.
*/
.about-page {
  padding-top: 150px;
  max-width: 80%;
  margin: 0 auto;
}

/* The text in the hero section is now back on a light background,
  so we revert its color to black. 
*/
.hero h1,
.hero p {
  color: #000000;
}

.hero {
  max-width: 50%;
  text-align: left;
  margin-bottom: 150px; /* This creates space before the new container */
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.hero p {
  font-size: 1.5rem;
  max-width: 80%;
}

.gradient-text {
  font-weight: 700;
  background-image: linear-gradient(45deg, #eb57ff, #ff7878);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.collaboration-container {
  /* This makes it an "anchor" for the absolutely positioned video inside */
  position: relative;
  /* This is ESSENTIAL to make the video conform to the curved corners */
  overflow: hidden;

  /* Your existing background will now sit BEHIND the video */
  background: url("@/assets/images/gradient.png") no-repeat center center / 100%
      100%,
    #111820;

  border-radius: 30px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  min-height: 500px; /* Adjust height as needed */
}

.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  /* This makes the video fill the container without being distorted */
  object-fit: cover;

  /* --- The visual effects you requested --- */
  mix-blend-mode: screen; /* Creates the "screen opacity" effect */
  /* filter: grayscale(1);  Makes the video black and white */

  /* Place the video on the bottom layer within the container */
  z-index: 1;
  opacity: 1; /* Optional: Adjusts the video opacity */
}

/* NEW RULE: This styles the wrapper for your content */
.container-content {
  /* This ensures the content is aware of its position */
  position: relative;
  /* This places the content ON TOP of the video */
  z-index: 2;

  /* We apply the padding here now, so the content has space from the edges */
  padding: 4rem;
}

/* --- MOBILE STYLES (Largely unchanged) --- */
@media (max-width: 750px) {
  .about-page {
    max-width: 90%;
    padding-top: 120px;
  }

  .hero {
    max-width: 100%;
    text-align: center !important;
    margin-bottom: 40px;
  }

  .hero p {
    text-align: justify;
    max-width: 90%;
    margin: 0 auto;
  }

  .collaboration-container {
    padding: 2.5rem; /* Adjust padding for smaller screens */
  }
  .container-content {
    padding: 1rem;
  }
}
</style>
