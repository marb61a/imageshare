<template>
  <v-container class="text-xs-center">
    <!-- User details card -->
    <v-flex sm6 offset-sm3>
      <v-card class="white--text" color="secondary">
        <v-layout>
          <v-flex xs5>
            <v-card-media height="125px" contain :src="user.avatar">
            </v-card-media>
          </v-flex>
          <v-flex xs7>

          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
export default {
  name: "Profile",
  data() {
    return {

    }
  }
}
</script>

