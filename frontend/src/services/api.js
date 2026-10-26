import axios from 'axios'
import { useAuthStore } from '@/stores/store'

const API = axios.create({
  baseURL: 'https://burguerqueen.onrender.com/api'
})

const getAuthToken = () => {
  try {
    const store = useAuthStore()
    if (store?.token) return store.token
  } catch (error) {
    // Store can be unavailable during startup; fall back to localStorage.
  }

  if (typeof window !== 'undefined' && window.localStorage) {
    return window.localStorage.getItem('token')
  }

  return null
}

API.interceptors.request.use((config) => {
  const token = getAuthToken()

  if (token) {
    config.headers = {
      ...(config.headers || {}),
      token,
    }
  }

  return config
}, (error) => Promise.reject(error))

async function signup(newUser) {
  try {
    const response = await API.post('/auth/signup', newUser)
    return response.data
  } catch (error) {
    return { error: error.message }
  }
}

async function login(newUser) {
  try {
    const response = await API.post('/auth/login', newUser)
    return response.data
  } catch (error) {
    return { error: error.message }
  }
}

async function deleteUser(remove) {
  const store = useAuthStore()
  try {
    const response = await API.delete('/users/profile', {
      data: remove,
      headers: {
        token: store.token
      }
    })
    store.logout()
    return response.data
  } catch (error) {
    return error
  }
}

async function updateUser(newData) {
  const store = useAuthStore()
  try {
    const response = await API.put('/users/profile', newData, {
      headers: {
        token: store.token
      }
    })
    return response.data
  } catch (error) {
    return error
  }
}

async function getUser() {
  const store = useAuthStore()
  try {
    const response = await API.get('/users/profile', {
      headers: {
        token: store.token
      }
    })
    return response.data
  } catch (error) {
    return error
  }
}

async function addFavorite(id) {
  const store = useAuthStore()
  try {
    const response = await API.patch('/users/favorite/add', { id }, {
      headers: {
        token: store.token
      }
    })
    return response.data
  } catch (error) {
    return error
  }
}

async function removeFavoriteBurger(id) {
  const store = useAuthStore()
  try {
    const response = await API.patch('/users/favorite/remove', { id }, {
      headers: {
        token: store.token
      }
    })
    return response.data
  } catch (error) {
    return error
  }
}

async function showFavoriteBurguer() {
  const store = useAuthStore()
  try {
    const response = await API.get('/users/favorite/burger', {
      headers: {
        token: store.token
      }
    })
    return response.data
  } catch (error) {
    return error
  }
}

async function getfavorites() {
  const store = useAuthStore()
  try {
    const response = await API.get('/users/favorite', {
      headers: {
        token: store.token
      }
    })
    return response.data
  } catch (error) {
    return error
  }
}

export default {
  signup,
  login,
  deleteUser,
  updateUser,
  getUser,
  addFavorite,
  removeFavoriteBurger,
  showFavoriteBurguer,
  getfavorites
}