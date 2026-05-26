import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: HomeView,
    meta: { scrollTo: "#about" },
  },
  {
    path: "/research",
    name: "research",
    component: () =>
      import(/* webpackChunkName: "research" */ "../views/ResearchView.vue"),
  },
  {
    path: "/symposium-2026",
    name: "symposium-2026",
    component: () =>
      import(
        /* webpackChunkName: "symposium-2026" */ "../views/SymposiumView.vue"
      ),
  },
  {
    path: "/insights",
    name: "insights",
    component: () =>
      import(
        /* webpackChunkName: "registration-insights" */ "../views/RegistrationInsightsView.vue"
      ),
  },
  {
    path: "/paper/:id",
    name: "paper",
    component: () =>
      import(/* webpackChunkName: "paper" */ "../views/PaperView.vue"),
  },
  // {
  //   path: "/people",
  //   name: "people",
  //   component: () =>
  //     import(/* webpackChunkName: "people" */ "../views/PeopleView.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.meta.scrollTo) {
      return { el: to.meta.scrollTo, behavior: "smooth" };
    } else if (to.hash) {
      return { el: to.hash, behavior: "smooth" };
    } else if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
});

export default router;
