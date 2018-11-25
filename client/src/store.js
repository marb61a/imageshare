import Vue from 'vue'
import Vuex from 'vuex'

import { defaultClient as apolloClient } from "./main"
import { GET_POSTS, SIGNIN_USER } from "./queries"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    loading: false
  },
  mutations: {
    setPosts(state, payload) {
      state.posts = payload
    },
    setLoading: (state, payload) => {
      state.loading = payload;
    }
  },
  actions: {
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
    signinUser: ({ commit, payload }) => {
      apolloClient
        .mutate()
        .then()
        .catch(err => {
          commit("setLoading", false)
          console.error(ErrorEvent)
        })
    }
  },
  getters: {
    posts: state => state.posts,
    loading: state => state.loading
  }
})
