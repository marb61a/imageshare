<template>
  <v-app>
    <!-- Horizontal Navbar -->
    <v-toolbar fixed color="primary" dark>
      <v-toolbar-side-icon>

      </v-toolbar-side-icon>
      <v-toolbar-title>
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
      <v-toolbar-items>
        <v-btn flat v-for="item in horizontalNavItems">
          Posts
        </v-btn>
      </v-toolbar-items>

    </v-toolbar>

    <main>
      <router-view/>
    </main>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    computed: {
      horizontalNavItems() {
        return [
          {}
        ]
      }
    }
  }
</script>
