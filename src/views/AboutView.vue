<template>
  <div class="about-page">
    <section class="hero">
      <h1>About PI-CAI</h1>
      <p class="tagline">
        Making AI for prostate MRI more
        <span class="gradient-text">trustworthy</span>.
      </p>
      <p>
        PI-CAI is an international academic initiative that helps make
        artificial intelligence (AI) for prostate MRI more reliable and
        clinically meaningful. We bring together clinicians, researchers, data
        partners and AI developers to support better evidence, better validation
        and more trustworthy AI in prostate-cancer care.
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
        <h2 class="section-title">
          A Strong Scientific <span class="gradient-text">Foundation</span>
        </h2>
        <p class="section-subtitle">
          Large prostate MRI datasets, carefully established reference standards
          and transparent evaluation methods form the basis for research and
          independent AI evaluation.
        </p>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-value">10,000+</div>
            <div class="stat-label">MRI Examinations</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">62</div>
            <div class="stat-label">Expert Radiologists</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">2024</div>
            <div class="stat-label">The Lancet Oncology Study</div>
          </div>
        </div>
      </div>
    </div>

    <section class="content-section">
      <h2>A secure benchmark with open research access</h2>
      <p>
        PI-CAI's benchmark test data are kept secure and are not made publicly
        available. This helps ensure that AI systems are evaluated on data they
        have not been tuned to, making benchmark results more reliable and
        meaningful.
      </p>
      <p>
        At the same time, PI-CAI supports a research community around these
        data. Researchers can work with the benchmark through controlled tools
        and evaluation workflows rather than receiving unrestricted access to
        the test set. The technical infrastructure for this is provided through
        Grand Challenge: algorithms can be run against protected data, results
        can be reported through evaluation dashboards, and structured reader
        studies can be organised where appropriate.
      </p>
      <p>
        In this sense, PI-CAI is the organisational and scientific benchmark
        initiative, while Grand Challenge is the technical platform and
        challenge infrastructure that makes secure evaluation and research
        access possible.
      </p>
    </section>

    <section class="content-section">
      <h2>Where PI-CAI started</h2>
      <p>
        PI-CAI began with the PI-CAI Challenge and the international
        confirmatory study published in The Lancet Oncology in 2024. The study
        evaluated AI systems for detecting clinically significant prostate
        cancer on MRI, using more than 10,000 MRI examinations and comparison
        with 62 expert radiologists.
      </p>
      <p>
        The work was designed with a multidisciplinary scientific advisory
        board. Before the evaluation began, the team agreed the clinical use
        case, target population, reference standard, evaluation measures and
        statistical approach. This makes it possible to assess AI in a
        transparent and clinically relevant way.
      </p>
    </section>

    <section class="content-section">
      <h2>What PI-CAI does today</h2>
      <p>
        PI-CAI has grown beyond a one-time challenge. It continues to develop
        the scientific infrastructure needed for high-quality research and
        trustworthy AI evaluation in prostate MRI. Our work includes:
      </p>
      <ul class="bullet-list">
        <li>Expanding and carefully curating reference datasets</li>
        <li>Developing future benchmark releases and evaluation methods</li>
        <li>Supporting collaborative research on prostate MRI and AI</li>
        <li>
          Providing fully masked, standardised evaluation of AI systems from
          academia and industry
        </li>
        <li>
          Studying how benchmarking can inform the future monitoring and
          responsible use of AI in clinical practice
        </li>
      </ul>
      <p>
        The methods and evaluation rules are transparent, while the reference
        test data are protected. This combination helps ensure that AI systems
        are assessed on data they have not seen before. Grand Challenge supports
        the controlled technical execution of algorithms, dashboards and reader
        studies without making the test data publicly available.
      </p>
    </section>

    <section class="content-section">
      <h2>What PI-CAI wants to improve</h2>
      <p>
        PI-CAI aims to strengthen the evidence needed to determine whether AI is
        reliable for a specific clinical task and patient population. We want to
        broaden and improve the reference data, clinical tasks and evaluation
        methods used in future benchmarks; enable rigorous independent
        evaluation; and support research into the responsible monitoring and use
        of prostate MRI AI.
      </p>
      <p>
        Benchmarking and masked evaluation are established parts of PI-CAI's
        work. Monitoring, governance and clinical implementation remain
        important research directions rather than established PI-CAI services.
      </p>
    </section>

    <section class="content-section">
      <h2>Why it matters</h2>
      <p>
        AI can only be useful in healthcare when its performance is tested
        carefully in the setting where it may be used. A high score on one
        dataset is not enough. Clinicians and healthcare organisations need to
        know how an AI system performs in a well-defined clinical task, how it
        compares with expert practice, and where its limitations lie.
      </p>
      <p>
        PI-CAI provides the scientific tools and international collaboration
        needed to answer those questions. In this way, it supports better
        research, more meaningful validation and the responsible development of
        AI for prostate MRI.
      </p>
    </section>

    <section class="cta-section">
      <div class="cta-content">
        <h2 class="section-title">
          Working <span class="gradient-text">Together</span>
        </h2>
        <p class="section-subtitle">
          PI-CAI is built through international collaboration. Its community
          includes clinical centres, researchers, methodologists, data partners
          and AI developers.
        </p>
        <ul class="bullet-list cta-list">
          <li>
            Researchers and AI developers can engage with the benchmark,
            evaluation methodology and collaborative research.
          </li>
          <li>
            Clinicians and healthcare organisations can use and help strengthen
            the clinical evidence and relevance of benchmark-based evaluation.
          </li>
          <li>
            Data and research partners can explore collaboration that improves
            reference data, methods and scientific studies, subject to the
            appropriate permissions and governance.
          </li>
        </ul>
        <p class="cta-copy">
          We welcome collaboration that strengthens rigorous, transparent and
          clinically relevant research on AI for prostate MRI.
        </p>
        <a href="mailto:info@pi-cai.org" class="cta-button">Get in Touch</a>
      </div>
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
  padding-top: 40px;
  max-width: 80%;
  margin: 0 auto;
}

.hero {
  max-width: 640px;
  text-align: left;
  margin: 0 auto 80px auto;
  color: #000000;
}

.hero h1 {
  font-size: 2.75rem;
  font-weight: 700;
  margin-bottom: 12px;
}

.tagline {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 20px;
}

.hero p {
  font-size: 1.125rem;
  line-height: 1.7;
  color: #333333;
}

.gradient-text {
  font-weight: 700;
  background-image: linear-gradient(45deg, #eb57ff, #ff7878);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

/* --- Dark, video-backed proof-point card (reused for the CTA below too) --- */
.collaboration-container {
  position: relative;
  overflow: hidden;
  background: url("@/assets/images/gradient.png") no-repeat center center / 100%
      100%,
    #111820;
  border-radius: 30px;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  margin-bottom: 90px;
}

.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  mix-blend-mode: screen;
  z-index: 1;
  opacity: 1;
}

.container-content {
  position: relative;
  z-index: 2;
  padding: 4rem;
  text-align: center;
}

.section-title {
  font-size: 2.25rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0 0 16px 0;
}

.section-subtitle {
  font-size: 1.125rem;
  color: #dddddd;
  max-width: 620px;
  line-height: 1.6;
  margin: 0 auto 48px auto;
}

.stats-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
}

.stat-card {
  min-width: 160px;
}

.stat-value {
  font-size: 3.5rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.1;
}

.stat-label {
  font-size: 1.05rem;
  color: #ffffff;
  margin-top: 6px;
}

/* --- Plain-prose content sections --- */
.content-section {
  max-width: 720px;
  margin: 0 auto 72px auto;
  text-align: left;
  color: #333333;
}

.content-section h2 {
  position: relative;
  font-size: 1.9rem;
  font-weight: 700;
  color: #111820;
  margin: 0 0 22px 0;
  padding-top: 22px;
}

.content-section h2::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 48px;
  height: 4px;
  border-radius: 2px;
  background-image: linear-gradient(45deg, #eb57ff, #ff7878);
}

.content-section p {
  font-size: 1.05rem;
  line-height: 1.75;
  margin: 0 0 18px 0;
}

.content-section p:last-child {
  margin-bottom: 0;
}

.bullet-list {
  list-style: none;
  margin: 0 0 18px 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.bullet-list li {
  position: relative;
  padding-left: 26px;
  font-size: 1.05rem;
  line-height: 1.6;
}

.bullet-list li::before {
  content: "";
  position: absolute;
  left: 4px;
  top: 9px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-image: linear-gradient(45deg, #eb57ff, #ff7878);
}

/* --- Closing CTA card --- */
.cta-section {
  border-radius: 30px;
  overflow: hidden;
  background: url("@/assets/images/gradient.png") no-repeat center center / 100%
      100%,
    #111820;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}

.cta-content {
  padding: 4rem;
  text-align: center;
}

.cta-list {
  max-width: 620px;
  margin: 0 auto 32px auto;
  text-align: left;
  color: #dddddd;
}

.cta-list li {
  color: #dddddd;
}

.cta-copy {
  max-width: 560px;
  margin: 0 auto 32px auto;
  font-size: 1.05rem;
  line-height: 1.6;
  color: #dddddd;
}

.cta-button {
  display: inline-block;
  padding: 14px 32px;
  border-radius: 999px;
  font-weight: 600;
  font-size: 1rem;
  color: #ffffff;
  text-decoration: none;
  background-image: linear-gradient(45deg, #eb57ff, #ff7878);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(235, 87, 255, 0.35);
}

/* --- MOBILE STYLES --- */
@media (max-width: 750px) {
  .about-page {
    max-width: 90%;
    padding-top: 24px;
  }

  .hero {
    max-width: 100%;
    text-align: center !important;
    margin-bottom: 48px;
  }

  .hero p {
    text-align: justify;
  }

  .container-content {
    padding: 2.5rem 1.5rem;
  }

  .content-section {
    margin-bottom: 48px;
  }

  .cta-content {
    padding: 2.5rem 1.5rem;
  }
}
</style>
