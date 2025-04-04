import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
  {
    path: "/research",
    name: "research",
    component: () =>
      import(/* webpackChunkName: "research" */ "../views/ResearchView.vue"),
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
});

export default router;
