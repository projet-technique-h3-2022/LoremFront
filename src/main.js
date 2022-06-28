import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'

import { useUserStore } from "@/services/UserStore";
const { user } = useUserStore();

if (localStorage.getItem("user")) user.value = JSON.parse(localStorage.getItem("user"));

const app = createApp(App)
app.use(router)
app.mount('#app')
