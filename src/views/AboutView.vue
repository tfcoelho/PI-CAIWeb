<template>
  <div class="about-page">
    <section class="hero">
      <h1>About PI-CAI</h1>
      <p>
        PI-CAI is a global initiative that maintains a public, standardized
        benchmarking framework for evaluating AI in prostate cancer detection on
        MRI. Our goal is to enable objective validation that accelerates the
        safe and effective integration of AI into clinical practice.
      </p>
    </section>
    <CollaborationStats />
  </div>
</template>

<script>
import CollaborationStats from "@/components/CollaborationStats.vue";

export default {
  name: "AboutView",
  components: {
    CollaborationStats,
    // ... other components
  },
};
</script>

<style scoped>
.about-page {
  padding-top: 150px;
  max-width: 80%;
}
.hero {
  max-width: 40%;
  text-align: left;
  margin-bottom: 40px;
}
.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}
.hero p {
  font-size: 1.5rem;
  color: #555;
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
