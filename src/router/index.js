import { createRouter, createWebHistory } from 'vue-router'
import Signup from '@/pages/Signup.vue'
import Login from '@/pages/Login.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/signup",
      name: "signup",
      component: Signup,
    },
  ]
})

export default router
