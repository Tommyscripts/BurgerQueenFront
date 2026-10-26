import axios from "axios";
import { useAuthStore } from "../stores/store";

const API = axios.create({
  baseURL: "https://burguerqueen.onrender.com/api",
});

const getAuthHeaders = () => {
  const store = useAuthStore();
  const token = store?.token || localStorage.getItem("token");
  return token ? { token } : {};
};

async function getBurgers() {
  try {
    const response = await API.get("/burgers");
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
}

async function addBurger(newBurger) {
  try {
    const response = await API.post("/burgers", newBurger, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
}

async function getOneBurger(id) {
  try {
    const response = await API.get(`/burgers/${id}`);
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
}

async function filterByType(type) {
  try {
  const response = await API.get(`/burgers/style/${type}`)
  return response.data;
  } catch (error) {
    return { error: error.message };
  }
}

export default {
  getBurgers,
  addBurger,
  getOneBurger,
  filterByType
};
