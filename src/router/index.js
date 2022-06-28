import { createRouter, createWebHistory } from 'vue-router'
import Signup from '@/pages/Signup.vue'
import Login from '@/pages/Login.vue'
import HomePage from '../pages/HomePage.vue'
import ReadArticle from '../pages/ReadArticle.vue'
import MyAccount from '../pages/MyAccount.vue'
import MyArticles from '../pages/MyArticles.vue'
import MyGroups from '../pages/MyGroups.vue'

import { useUserStore } from "@/services/UserStore";
const { user } = useUserStore();

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/signup",
      name: "signup",
      component: Signup,
      beforeEnter: function () {
        if (user.value) return { name: "accueil" };
      },
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      beforeEnter: function () {
        if (user.value) return { name: "accueil" };
      },
    },
    {
      path: "/",
      name: 'homepage',
      component: HomePage,
    },
    {
      path: "/readArticle/:id",
      name: 'readArticle',
      component: ReadArticle,
    },
    {
      path: "/myAccount",
      name: 'myAccount',
      component: MyAccount,
    },
    {
      path: "/myArticles",
      name: 'myArticles',
      component: MyArticles,
    },
    {
      path: "/myGroups",
      name: 'myGroups',
      component: MyGroups,
    },
  ]
})

export default router
