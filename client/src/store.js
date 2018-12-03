import Vue from 'vue'
import Vuex from 'vuex'

import router from './router'
import { defaultClient as apolloClient } from "./main"
import { 
  GET_CURRENT_USER,
  GET_POSTS, 
  SIGNIN_USER ,
  SIGNUP_USER
} from "./queries"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    user: null,
    loading: false,
    error: null,
    authError: null
  },
  mutations: {
    setPosts(state, payload) {
      state.posts = payload
    },
    setUser(state, payload) {
      state.user = payload
    },
    setLoading: (state, payload) => {
      state.loading = payload;
    },
    setError: (state, payload) => {
      state.error = payload;
    },
    setAuthError: (state, payload) => {
      state.authError = payload;
    },
    clearUser: state => (state.user = null),
    clearError: state => (state.error = null)
  },
  actions: {
    getCurrentUser: ({commit}) => {
      commit("setLoading", true)
      apolloClient
        .query({
          query: GET_CURRENT_USER
        })
        .then(({data}) => {
          commit("setLoading", false);
          // Add user data to state
          commit("setUser", data.getCurrentUser);
          console.log(data.getCurrentUser);
        })
        .catch(err => {
          commit("setLoading", false)
          console.error(ErrorEvent)
        })
    },
    getPosts: ({commit}) => {
      commit("setLoading", true)
      apolloClient
        .query({
          query: GET_POSTS
        })
        .then(({ data }) => {
          commit("setPosts", data.getPosts);
          commit("setLoading", false)
        })
        .catch(err => {
          commit("setLoading", false)
          console.error(ErrorEvent)
        })
    },
    addPost: ({ commit }, payload) => {
      apolloClient
        .mutate({

        })
        .then(({ data }) => {
          console.log(data.addPost)
        })
        .catch(err => {
          console.error(err)
        })
    },
    signinUser: ({ commit }, payload) => {
      apolloClient
        .mutate({
          mutation: SIGNIN_USER,
          variables: payload
        })
        .then(({ data }) => {
          commit("setLoading", false)
          localStorage.setItem("token", data.signinUser.token)
          // To make sure the created method is run in main.js reload page
          router.go()
        })
        .catch(err => {
          commit("setLoading", false)
          commit("setError", err)
          console.error(err)
        })
    },
    signupUser: ({ commit }, payload) => {
      commit("clearError")
      commit("setLoading", true)
      apolloClient
        .mutate({
          mutation: SIGNUP_USER,
          variables: payload
        })
        .then(({ data }) => {
          commit("setLoading", false)
          localStorage.setItem("token", data.signupUser.token)
          // To make sure the created method is run in main.js reload page          
          router.go()
        })
        .catch(err => {
          commit("setLoading", false)
          commit("setError", err)
          console.error(err)
        })
    },
    signoutUser: async({ commit }) => {
      // Clear the user in state
      commit("clearUser")

      // Remove the token in localStorage
      localStorage.setItem("token", "")

      // End the session
      await apolloClient.resetStore()

      // Redirect home which will remove users from private pages
      router.push("/")
    }
  },
  getters: {
    posts: state => state.posts,
    user: state => state.user,
    loading: state => state.loading,
    error: state => state.error,
    authError: state => state.authError
  }
})
