import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core' // conecta piña con localStorage
import api from '@/services/api'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      token: useStorage('token', null),
      email: useStorage('email', null),
      role: useStorage('role', null)
    }
  },
  getters: {
    isLoggedIn() {
      return this.token != null
    },
    userEmail() {
      return this.email
    },
    userRole() {
      return this.role
    }
  },
  actions: {
    logout() {
      this.token = null
      this.email = null
      this.role = null
    },
    login(token, email, role = null) {
      this.token = token
      this.email = email
      if (role !== null) {
        this.role = role
      }
    },
    roleCheck(role) {
      this.role = role
    }
  }
})