import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import ReadArticle from '../pages/ReadArticle.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
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
