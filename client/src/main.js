import "@babel/polyfill"
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'

import FormAlert from "./components/Shared/FormAlert"

// Register global component
Vue.component("form-alert", FormAlert) 

Vue.use(VueApollo)

// Setup ApolloClient
export const defaultClient = new ApolloClient({
  uri: 'http://localhost:4000/graphql',

  // Include auth token with requests made to backend
  fetchOptions: {
    credentials: "include"
  },
  request: operation => {
    // If there is no token with key of 'token' in localStorage, add it
    if (!localStorage.token) {
      localStorage.setItem("token", "");
    }

    /* Operation adds the token to an authorization header, 
       which is sent to backend */
    operation.setContext({
      headers: {
        authorization: localStorage.getItem("token")
      }
    });
  },
  onError: ({ graphQLErrors, networkError}) => {
    if(networkError) {
      console.log("[networkError]", networkError);
    }

    if(graphQLErrors) {
      for(let err of graphQLErrors) {
        console.dir(err)
        if(err.name === "AuthenticationError") {
          // Set the auth error state which shows in the snackbar
          store.commit("setAuthError", err)

          // Signout user which clears the token
          store.dispatch("signoutUser")
        }
      }
    }
  }
})

const apolloProvider = new VueApollo({ defaultClient })

Vue.config.productionTip = false

new Vue({
  // Injects Apollo into files so queries, Mutations can be performed
  provide: ApolloProvider.provide(),
  router,
  store,
  render: h => h(App),
  created() {
    // execute getCurrentUser query
    this.$store.dispatch("getCurrentUser");
  }
}).$mount('#app')
