<template>
  <div class="home">
    <div class="background-image">
      <div class="logo-container">
        <img src="@/assets/images/logo.png" alt="Logo" class="logo" />
        <img
          src="@/assets/images/message.png"
          alt="Prostate Cancer Detection AI"
          class="vision-image"
        />
        <a href="https://pi-cai.grand-challenge.org/" target="_blank">
          <button class="gradient-border-button">
            <span class="button-text">More Information</span>
            <img
              src="@/assets/images/arrow.png"
              alt="Arrow"
              class="arrow-icon"
            />
          </button>
        </a>
      </div>
    </div>
    <div class="scroll-message" ref="scrollMessage">
      More content coming soon
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  mounted() {
    this.adjustBodyHeight();
    window.addEventListener("resize", this.adjustBodyHeight);

    // Prevent default scrolling behavior and show message on wheel or touch
    document.addEventListener(
      "wheel",
      (event) => {
        event.preventDefault(); // Prevent scrolling
        if (event.deltaY > 0) {
          // Scrolling up
          this.showScrollMessage();
        } else {
          // Scrolling down
          this.hideScrollMessage();
        }
      },
      { passive: false }
    );

    let lastTouchY = 0;
    document.addEventListener(
      "touchmove",
      (event) => {
        event.preventDefault(); // Prevent scrolling
        let touch = event.touches[0];
        let currentTouchY = touch.clientY;

        if (currentTouchY < lastTouchY) {
          // Scrolling up
          this.showScrollMessage();
        } else {
          // Scrolling down
          this.hideScrollMessage();
        }

        lastTouchY = currentTouchY;
      },
      { passive: false }
    );
  },
  methods: {
    adjustBodyHeight() {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    },
    showScrollMessage() {
      const message = this.$refs.scrollMessage;
      if (message) {
        message.style.opacity = "1";
        message.style.visibility = "visible";
      }
    },
    hideScrollMessage() {
      const message = this.$refs.scrollMessage;
      if (message) {
        message.style.opacity = "0";
        message.style.visibility = "hidden";
      }
    },
  },
  beforeUnmount() {
    // Clean up event listeners
    window.removeEventListener("resize", this.adjustBodyHeight);
    document.removeEventListener("wheel", this.wheelHandler);
    document.removeEventListener("touchmove", this.touchMoveHandler);
  },
};
</script>

<style scoped>
@font-face {
  font-family: "Nunito-Sans";
  src: url("@/assets/fonts/nunito-sans/NunitoSans-ExtraLight.ttf")
    format("truetype");
  font-weight: lighter;
  font-style: normal;
}

.home {
  height: 100vh;
  overflow: hidden;
  background-color: #111820;
}

.background-image {
  background-image: url("@/assets/images/background.webp");
  width: 100%;
  height: 100%;
  background-position: 80%;
  background-repeat: no-repeat;
  background-size: cover;
}

.logo-container {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  top: 37%;
  left: 16%;
  width: 810px;
  z-index: 2;
  animation: slideInFromLeft 0.8s ease-out forwards;
}

@keyframes slideInFromLeft {
  0% {
    opacity: 0;
    transform: translateX(-50px);
  }
  50% {
    opacity: 0;
    transform: translateX(-25px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.logo {
  width: 70%;
  height: auto;
}

.vision-image {
  padding-top: 30px;
  width: 70%;
}

.scroll-message {
  position: fixed;
  bottom: 0px;
  left: 0;
  width: 100%;
  text-align: center;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0));
  color: white;
  padding: 30px 0;
  font-family: "Nunito-Sans", sans-serif;
  font-size: 15px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  z-index: 1000;
  box-sizing: border-box;
}

.gradient-border-button {
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 99px;
  color: white;
  position: relative;
  top: 30px;
  z-index: 1;
  padding: 12px 20px;
  font-weight: 200;
  font-family: "Nunito-Sans", sans-serif;
  letter-spacing: 2px;
  overflow: hidden;
  cursor: pointer;
  animation: slideInFromLeft 1.4s ease-out forwards;
}

.gradient-border-button:before,
.gradient-border-button:after {
  content: " ";
  position: absolute;
  border-radius: 99px;
}

.gradient-border-button:before {
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -2;
  background: #db23a1;
  background: -moz-linear-gradient(left, #db23a1 0%, #f01160 100%);
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    color-stop(0%, #db23a1),
    color-stop(100%, #f01160)
  );
  background: -webkit-linear-gradient(left, #db23a1 0%, #f01160 100%);
  background: -o-linear-gradient(left, #db23a1 0%, #f01160 100%);
  background: -ms-linear-gradient(left, #db23a1 0%, #f01160 100%);
  background: linear-gradient(to right, #db23a1 0%, #f01160 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#db23a1', endColorstr='#f01160',GradientType=1 );
}

.gradient-border-button:after {
  top: 1px;
  bottom: 1px;
  left: 1px;
  right: 1px;
  background-color: #0a0a0b;
  z-index: -1;
  opacity: 1;
  transition: all 0.4s ease-in-out;
}

.gradient-border-button:hover:after {
  opacity: 0;
  transition: all 0.1s ease-in-out;
}

.arrow-icon {
  width: 12px;
  height: auto;
  transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
  opacity: 0;
  transform: translateX(5px);
}

.gradient-border-button:hover .arrow-icon {
  opacity: 1;
  transform: translateX(0px);
}

.button-text {
  padding-left: 15px;
  font-size: 20px;
  transition: transform 0.2s ease-in-out;
}

.gradient-border-button:hover .button-text {
  transform: translateX(-10px);
}

/* Small screens (large smartphones in portrait) */
@media (max-width: 750px) {
  .background-image {
    background-size: cover;
  }

  .logo-container {
    top: 20%;
    left: 10%;
    width: 80%;
    height: 100%;
    animation: slideInFromLeft 1.2s ease-out forwards;
  }

  .logo {
    width: 100%;
  }

  .vision-image {
    width: 100%;
  }

  .background-image::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 82%;
    height: 100%;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));
    z-index: 1;
  }

  .gradient-border-button {
    top: 30px;
    padding: 7px 7px;
  }

  .button-text {
    padding-left: 15px;
    font-size: 15px;
  }
}

@media (max-height: 450px) {
  .logo-container {
    top: 7%;
    left: 10%;
    width: 80%;
    height: 100%;
    animation: slideInFromLeft 1.2s ease-out forwards;
  }

  .logo {
    width: 80%;
  }

  .vision-image {
    width: 80%;
  }

  .gradient-border-button {
    top: 15px;
    font-size: 10px;
    padding: 7px 7px;
  }
}

@media (orientation: landscape) {
  .background-image {
    width: 100vw;
    height: 100vh;
    background-size: cover;
  }
}
</style>
