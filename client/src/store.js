import Vue from 'vue'
import Vuex from 'vuex'

import { GET_POSTS } from "./queries";

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
      
    }
  }
})
