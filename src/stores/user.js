import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    console.log('初始登录状态:', localStorage.getItem('isLoggedIn'))
    return {
      isLoggedIn: localStorage.getItem('isLoggedIn') === 'true'
    }
  }),
  
  actions: {
    login() {
      this.isLoggedIn = true
      localStorage.setItem('isLoggedIn', 'true')
      console.log('store.login 被调用')
    },
    
    logout() {
      this.isLoggedIn = false
      localStorage.setItem('isLoggedIn', 'false')
    }
  }
}) 