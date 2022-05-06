import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import Playground from "@/components/Playground.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    /* beforeEnter: async (to, from) => {
      const player = await store.dispatch("GET_CURRENT_PLAYER");
      if (player == null) {
        return { name: "Login" };
      }
    },*/
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/playground",
    name: "Playground",
    component: Playground,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
