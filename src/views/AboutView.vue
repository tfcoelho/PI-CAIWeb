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
    <CollaborationStats />
    <CollaboratorsMarquee />
  </div>
</template>

<script>
import CollaborationStats from "@/components/CollaborationStats.vue";
import CollaboratorsMarquee from "@/components/CollaboratorsMarquee.vue";

export default {
  name: "AboutView",
  components: {
    CollaborationStats,
    CollaboratorsMarquee,
  },
};
</script>

<style scoped>
.gradient-text {
  /* Use a bold font weight to make the gradient more visible */
  font-weight: 700; /* Or bold, 800, 900 depending on your font */

  /* 1. Set the background to a gradient */
  background-image: linear-gradient(
    45deg,
    #eb57ff,
    #ff7878
  ); /* A professional blue gradient */

  /* 2. Clip the background to the text */
  -webkit-background-clip: text; /* For Safari/Chrome */
  background-clip: text;

  /* 3. Make the text color transparent */
  color: transparent;
}

.about-page {
  padding-top: 150px;
  max-width: 80%;
  margin: 0 auto; /* This centers the .about-page block itself */
}
.hero {
  max-width: 50%;
  text-align: left;
  margin-bottom: 150px;
}
.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #000000;
}
.hero p {
  font-size: 1.5rem;
  color: #000000;
  max-width: 80%; /* Limit the width of the paragraph */
}

@media (max-width: 750px) {
  /* This will apply to the main container on mobile */
  .about-page {
    max-width: 90%; /* Use most of the screen width */
    padding-top: 120px; /* Adjust padding for mobile */
    margin: 0 auto; /* This centers the .about-page block itself */
  }

  /* This will center the hero section's content */
  .hero {
    max-width: 100%; /* Allow it to fill the new centered parent */
    text-align: center; /* Center the heading */
    margin-bottom: 40px;
  }

  /* This justifies the paragraph text specifically */
  .hero p {
    text-align: justify;
  }
}
</style>
