<template>
  <v-app>
    <!-- Side Navbar -->
    <v-navigation-drawer
      app
      temporary
      fixed
      v-model="sideNav"
    >
    </v-navigation-drawer>

    <!-- Horizontal Navbar -->
    <v-toolbar fixed color="primary" dark>
      <v-toolbar-side-icon>

      </v-toolbar-side-icon>
      <v-toolbar-title class="hidden-xs-only">
        <router-link to="/" tag="span" style="cursor: pointer">
          Imageshare
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Search Input -->
      <v-text-field
        flex
        prepend-icon="search"
        placeholder="Search Posts"
        color="accent"
        single-line
        hide-details
      >
      </v-text-field>
      <v-spacer></v-spacer>

      <!-- Horizontal Navbar Links -->
      <v-toolbar-items class="hidden-xs-only">
        <v-btn 
          flat 
          v-for="item in horizontalNavItems" 
          :key="item.title"
          :to="item.link"
        >
          <v-icon class="hidden-sm-only" left>
            {{item.icon}}
          </v-icon>
          {{item.title}}
        </v-btn>
      </v-toolbar-items>

    </v-toolbar>

    <!-- App Content -->
    <main>
      <v-container class="mt-4">
        <router-view/>
      </v-container>
    </main>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    data() {

    },
    computed: {
      horizontalNavItems() {
        return [
          {icon: "chat", title: 'posts', link: '/posts'},
          {icon: 'lock_open', title: 'Sign In', link: '/signin'},
          {icon: 'create', title: 'Sign Up', link: '/signup'}
        ]
      }
    }
  }
</script>
