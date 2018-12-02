import "@babel/polyfill"
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'

import ApolloClient from 'apollo-boost'
import VueApollo, { ApolloProvider } from 'vue-apollo'

import FormAlert from "./components/Shared/FormAlert"

// Register global component
Vue.component("form-alert", FormAlert) 

Vue.use(VueApollo)

// Setup ApolloClient
const defaultClient = new ApolloClient({
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
  }
})

const apolloProvider = new VueApollo({defaultClient})

Vue.config.productionTip = false

new Vue({
  // Injects Apollo into files so queries, Mutations can be performed
  provide: ApolloProvider.provide(),
  router,
  store,
  render: h => h(App)
}).$mount('#app')
