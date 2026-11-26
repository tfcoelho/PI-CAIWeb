import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/fonts/foundry-sans/foundry-sans.css";

createApp(App).use(router).mount("#app");
