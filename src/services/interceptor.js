import axios from "axios";
import { useUserStore } from "@/services/UserStore";
const { user } = useUserStore();

axios.interceptors.request.use((config) => {
  if (user.value) config.headers.common["authorization"] = "Bearer " + user.value.token;
  return config;
});