<template>
  <div class="about-page">
    <div class="about-header">
      <div class="logo-and-title">
        <router-link
          to="/"
          class="header-logo-glass"
          aria-label="Go to home page"
        >
          <img
            src="@/assets/images/logo_dark.png"
            alt="PI-CAI logo"
            class="header-logo"
          />
        </router-link>
        <h1 class="page-title">About</h1>
      </div>
    </div>

    <div class="about-wrapper">
      <div class="about-content">
        <p>
          PI-CAI is an international academic initiative that helps make
          artificial intelligence (AI) for prostate MRI more reliable and
          clinically meaningful. We bring together clinicians, researchers, data
          partners and AI developers to support better evidence, better
          validation and more trustworthy AI in prostate-cancer care.
        </p>

        <p>
          At the heart of PI-CAI are large prostate MRI datasets, carefully
          established reference standards and transparent evaluation methods.
          Together, these provide a strong scientific foundation for research
          and independent AI evaluation.
        </p>

        <p>
          PI-CAI's benchmark test data are kept secure and are not made publicly
          available. This helps ensure that AI systems are evaluated on data
          they have not been tuned to, making benchmark results more reliable
          and meaningful.
        </p>

        <p>
          At the same time, PI-CAI supports a research community around these
          data. Researchers can work with the benchmark through controlled tools
          and evaluation workflows rather than receiving unrestricted access to
          the test set. The technical infrastructure for this is provided
          through Grand Challenge: algorithms can be run against protected data,
          results can be reported through evaluation dashboards, and structured
          reader studies can be organised where appropriate.
        </p>

        <p>
          In this sense, PI-CAI is the organisational and scientific benchmark
          initiative, while Grand Challenge is the technical platform and
          challenge infrastructure that makes secure evaluation and research
          access possible.
        </p>

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

        <p>
          PI-CAI has grown beyond a one-time challenge. It continues to develop
          the scientific infrastructure needed for high-quality research and
          trustworthy AI evaluation in prostate MRI. Our work includes expanding
          and carefully curating reference datasets; developing future benchmark
          releases and evaluation methods; supporting collaborative research on
          prostate MRI and AI; providing fully masked, standardised evaluation
          of AI systems from academia and industry; and studying how
          benchmarking can inform the future monitoring and responsible use of
          AI in clinical practice.
        </p>

        <p>
          The methods and evaluation rules are transparent, while the reference
          test data are protected. This combination helps ensure that AI systems
          are assessed on data they have not seen before. Grand Challenge
          supports the controlled technical execution of algorithms, dashboards
          and reader studies without making the test data publicly available.
        </p>

        <p>
          PI-CAI aims to strengthen the evidence needed to determine whether AI
          is reliable for a specific clinical task and patient population. We
          want to broaden and improve the reference data, clinical tasks and
          evaluation methods used in future benchmarks; enable rigorous
          independent evaluation; and support research into the responsible
          monitoring and use of prostate MRI AI.
        </p>

        <p>
          Benchmarking and masked evaluation are established parts of PI-CAI's
          work. Monitoring, governance and clinical implementation remain
          important research directions rather than established PI-CAI services.
        </p>

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
          research, more meaningful validation and the responsible development
          of AI for prostate MRI.
        </p>

        <p>
          PI-CAI is built through international collaboration. Its community
          includes clinical centres, researchers, methodologists, data partners
          and AI developers. Researchers and AI developers can engage with the
          benchmark, evaluation methodology and collaborative research;
          clinicians and healthcare organisations can use and help strengthen
          the clinical evidence and relevance of benchmark-based evaluation; and
          data and research partners can explore collaboration that improves
          reference data, methods and scientific studies, subject to the
          appropriate permissions and governance.
        </p>

        <p>
          We welcome collaboration that strengthens rigorous, transparent and
          clinically relevant research on AI for prostate MRI. For collaboration
          or general enquiries, please contact us at
          <a href="mailto:info@pi-cai.org">info@pi-cai.org</a>.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutView",
  data() {
    return {
      originalBackgroundColor: null,
    };
  },
  mounted() {
    // The page background only covers the centered content column, so match
    // the body's own background to it — otherwise the default dark body
    // color shows through on either side on wide screens (same approach as
    // ResearchView).
    this.originalBackgroundColor = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#EBEBF5";
  },
  unmounted() {
    document.body.style.backgroundColor = this.originalBackgroundColor;
  },
};
</script>

<style scoped>
.about-page {
  min-height: 100vh;
  padding-top: 60px;
  padding-bottom: 100px;
  max-width: 920px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial,
    sans-serif;
  background-color: #ebebf5;
}

.about-header {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 20px;
  padding: 20px 20px 24px;
  padding-top: 80px;
  border-bottom: 1px solid #66666633;
}

.logo-and-title {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.header-logo-glass {
  position: fixed;
  top: 20px;
  left: 6%;
  padding: 4px;
  border-radius: 6px;
  background: transparent;
  border: none;
  box-shadow: none;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  z-index: 11;
  text-decoration: none;
  line-height: 0;
}

.header-logo {
  width: 132px;
  height: auto;
  display: block;
}

.page-title {
  font-size: 42px;
  font-weight: 600;
  margin: 0;
  margin-left: 20px;
  margin-top: 0;
  text-align: left;
  color: #111;
}

.about-wrapper {
  margin: 0 auto;
  padding: 0 20px;
}

.about-content {
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 48px 56px;
  text-align: left;
}

.about-content p {
  font-size: 17px;
  line-height: 1.75;
  color: #333;
  margin: 0 0 22px 0;
}

.about-content p:last-child {
  margin-bottom: 0;
}

.about-content a {
  color: #333;
  text-decoration: underline;
}

.about-content a:hover {
  color: #111;
}

@media (max-width: 750px) {
  .about-page {
    padding-top: 40px;
  }

  .header-logo-glass {
    display: none;
  }

  .about-header {
    justify-content: center;
    padding-top: 40px;
  }

  .logo-and-title {
    align-items: center;
  }

  .page-title {
    font-size: 32px;
    margin-left: 0;
  }

  .about-wrapper {
    padding: 0 16px;
  }

  .about-content {
    padding: 28px 24px;
  }

  .about-content p {
    font-size: 16px;
  }
}
</style>
