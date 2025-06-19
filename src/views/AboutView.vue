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
  margin: 0 5% 0 auto; /* Pushes the block to the right with 5% margin */
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
</style>
