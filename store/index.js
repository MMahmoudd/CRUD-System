import axios from 'axios'
import { API_URL } from '../config/index'

export const state = () => ({
    isLoading: false,
    loginErrorMessage: null,
    loginSuccessful: false,
    userData: {},

  })
export const mutations = {
    resetState (state) {
      state.isLoading = true
      state.loginErrorMessage = null
      state.loginSuccessful = false
    },
    // Logout
    logout () {
      localStorage.removeItem('token')
      this.$cookies.remove('token')
      this.$router.push('/login')
    },
  }
  export const actions = {
    doLogin ({ commit, state, dispatch, }, loginData) {
      commit('resetState')
      const userData = {
        email: loginData.email,
        password: loginData.password,
      }

      axios.post(`${API_URL}/login`, userData)
        .then((response) => {
          if (response.status === 200) {
            localStorage.setItem('token', response.data.token)
            this.$cookies.set('token', response.data.token)
            this.$router.push('/listing')
          } else {
            state.loginErrorMessage = response
            state.isLoading = true
          }
        })
        .catch(error => {
          state.loginErrorMessage = error.response.data.error
          state.isLoading = true
        })
    },
  }
  export const getters = {
  }