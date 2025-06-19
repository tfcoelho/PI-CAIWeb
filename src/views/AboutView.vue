<template>
  <div class="about-page">
    <section class="hero">
      <h1>About PI-CAI</h1>
      <p>
        The PI-CAI benchmark provides the definitive standard for evaluating
        prostate cancer detection AI. It is a comprehensive testing environment
        built on three unique assets: a curated, multi-center MRI dataset ,
        performance data from a diverse cohort of 61 international radiologists
        , and a top-tier AI model that sets the state-of-the-art performance
        baseline. This robust benchmark is available for third-party algorithms,
        providing a robust, independent, and clear judgment of their true
        diagnostic capabilities.
      </p>
    </section>
    <section class="mission">
      <h2>Our Mission</h2>
      <p>
        We strive to leverage cutting-edge deep learning techniques and
        collaborative research to provide accurate and early diagnostic tools
        for healthcare professionals.
      </p>
    </section>
    <section class="team">
      <h2>Our Team</h2>
      <ul>
        <li><strong>Alice Johnson</strong> – Lead Researcher</li>
        <li><strong>Bob Smith</strong> – Software Engineer</li>
        <li><strong>Dr. Emily Davis</strong> – Clinical Advisor</li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: "AboutView",
};
</script>

<style scoped>
.about-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px 20px;
}
.hero {
  text-align: center;
  margin-bottom: 40px;
}
.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}
.hero p {
  font-size: 1.2rem;
  color: #555;
}
.mission,
.team {
  margin-bottom: 40px;
}
.mission h2,
.team h2 {
  font-size: 2rem;
  margin-bottom: 20px;
}
.mission p,
.team ul {
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
}
.team ul {
  list-style: none;
  padding: 0;
}
.team li {
  margin-bottom: 10px;
}
.team li strong {
  color: #db23a1;
}
</style>
