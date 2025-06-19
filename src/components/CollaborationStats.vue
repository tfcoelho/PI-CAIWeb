<template>
  <section class="collaboration-section">
    <h2 class="section-title">A Worldwide Collaboration</h2>
    <p class="section-subtitle">
      Our benchmark is built on a global foundation of data and expertise.
    </p>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">15+</div>
        <div class="stat-label">Countries</div>
      </div>

      <div class="stat-card">
        <div class="stat-value">50+</div>
        <div class="stat-label">Contributing Centers</div>
      </div>

      <div class="stat-card">
        <div class="stat-value">60+</div>
        <div class="stat-label">Expert & Non-Expert Radiologists</div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "CollaborationStats",
};
</script>

<style scoped>
.collaboration-section {
  text-align: center;
  padding: 80px 20px;
  background-color: transparent; /* Assumes this is on the white part of the about page */
}

.section-title {
  font-size: 36px;
  font-weight: 600;
  color: #111;
  margin-bottom: 16px;
}

.section-subtitle {
  font-size: 18px;
  color: #666;
  max-width: 600px;
  margin: 0 auto 48px auto;
  line-height: 1.6;
}

/* This container uses flexbox to arrange the cards */
.stats-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  /* This creates the space BETWEEN the cards */
  gap: 30px;
}

/* Styling for each individual card */
.stat-card {
  background-color: #ffffff; /* A very light grey background */
  border-radius: 12px;
  padding: 2.5rem;
  width: 260px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
}

.stat-value {
  font-size: 4rem;
  font-weight: 700;
  /* Using your brand's pink accent color */
  color: #e02090;
  margin-bottom: 12px;
}

.stat-label {
  font-size: 16px;
  color: #555;
  line-height: 1.5;
}

/* Responsive adjustments for smaller screens */
@media (max-width: 960px) {
  .collaboration-section {
    /* Reduce vertical padding on mobile */
    padding: 60px 20px;
  }

  .section-title {
    /* Make the title smaller on mobile */
    font-size: 30px;
  }

  .section-subtitle {
    /* Make the subtitle smaller on mobile */
    font-size: 16px;
  }

  .stats-grid {
    /* Stack the cards vertically */
    flex-direction: column;
    /* Center the stacked cards */
    align-items: center;
    /* Reduce the gap for the vertical layout */
    gap: 20px;
  }

  .stat-card {
    /* Allow cards to take up more of the screen width on mobile */
    width: 90%;
    max-width: 150px; /* But don't let them get too wide */
  }
}
</style>
