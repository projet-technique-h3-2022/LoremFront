import { createRouter, createWebHistory } from 'vue-router'
import Signup from '@/pages/Signup.vue'
import Login from '@/pages/Login.vue'
import HomePage from '../pages/HomePage.vue'
import ReadArticle from '../pages/ReadArticle.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/signup",
      name: "signup",
      component: Signup,
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
  ]
})

export default router
