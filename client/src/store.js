import Vue from 'vue'
import Vuex from 'vuex'

import router from './router'
import { defaultClient as apolloClient } from "./main"
import { 
  GET_CURRENT_USER,
  GET_POSTS,
  INFINITE_SCROLL_POSTS,
  GET_USER_POSTS,
  SEARCH_POSTS,
  ADD_POST,
  UPDATE_USER_POST,
  DELETE_USER_POST,
  SIGNIN_USER,
  SIGNUP_USER
} from "./queries"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: [],
    userPosts: [],
    searchResults: [],
    user: null,
    loading: false,
    error: null,
    authError: null
  },
  mutations: {
    setPosts: (state, payload) => {
      state.posts = payload
    },
    setSearchResults: (state, payload) => {
      if(payload !== null) {
        state.searchResults = payload
      }
    },
    setUser: (state, payload) => {
      state.user = payload
    },
    setUserPosts: (state, payload) => {
      state.userPosts = payload
    },
    setLoading: (state, payload) => {
      state.loading = payload
    },
    setError: (state, payload) => {
      state.error = payload
    },
    setAuthError: (state, payload) => {
      state.authError = payload
    },
    clearUser: state => (state.user = null),
    clearSearchResults: state => (state.searchResults = []),
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
          console.error(err)
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
          console.error(err)
        })
    },
    getUserPosts: ({ commit }, payload) => {
      apolloClient
        .query({
          query: GET_USER_POSTS,
          variables: payload
        })
        .then(({ data }) => {
          commit("setUserPosts", data.getUserPosts)
        })
        .catch(err => {
          console.error(err)
        })
    },
    searchPosts: ({ commit }, payload) => {
      query({
        query: SEARCH_POSTS,
        variables: payload
      })
      .then(({ data }) => {
        commit("setSearchResults", data.searchPosts)
      })
      .catch(err => {
        console.error(err)
      })
    },
    addPost: ({ commit }, payload) => {
      apolloClient
        .mutate({
          mutation: ADD_POST,
          variables: payload,
          update: (cache, { data: { addPost } }) => {
            // First read the query that you wish to update
            const data = cache.readQuery({ query: GET_POSTS })

            // Create updated data
            data.getPosts.unshift(addPost)

            // Write updated data back to query
            console.log(data)
            cache.writeQuery({
              query: GET_POSTS,
              data
            })
          },
          /**
            Optimistic response ensures that data is added immediately
            as has been specified for the update function
          */
          optimisticResponse: {
            __typename: "Mutation",
            addPost: {
              __typename: "Post",
              _id: -1,
              ...payload
            }
          },
          /*
            Rerun certain specified queries after performing the mutation
            in order to get fresh data
          */
          refetchQueries: [
            {
              query: INFINITE_SCROLL_POSTS,
              variables: {
                pageNum: 1,
                pageSize: 2
              }
            }
          ]
        })
        .then(({ data }) => {
          console.log(data.addPost)
        })
        .catch(err => {
          console.error(err)
        })
    },
    updateUserPost: ({ state, commit }, payload) => {
      apolloClient
        .mutate({
          mutation: UPDATE_USER_POST,
          variables: payload
        })
        .then(({ data }) => {
          const index = state.userPosts.findIndex(
            post => post._id === data.updateUserPost._id
          )
          const userPosts = [
            ...state.userPosts.slice(0, index),
            data.updateUserPost,
            ...state.userPosts.slice(index + 1)
          ]

          commit("setUserPosts", userPosts)
        })
        .catch(err => {
          console.error(err);
        })
    },
    deleteUserPost: ({ state, commit }, payload) => {
      apolloClient
        .mutate({
          mutation: DELETE_USER_POST,
          variables: payload
        })
        .then(({ data }) => {
          const index = state.userPosts.findIndex(
            post => post._id === data.deleteUserPost._id
          )
          const userPosts = [
            ...state.userPosts.slice(0, index),
            ...state.userPosts.slice(index + 1)
          ]

          commit("setUserPosts", userPosts)
        })
        .catch(err => {
          console.error(err);
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
    userPosts: state => state.userPosts,
    searchResults: state => state.searchResults,
    user: state => state.user,
    userFavorites: state => state.user && state.user.favorites,
    loading: state => state.loading,
    error: state => state.error,
    authError: state => state.authError
  }
})
