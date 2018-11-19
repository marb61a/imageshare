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

    </v-toolbar>

    <main>
      <router-view/>
    </main>
  </v-app>
</template>
