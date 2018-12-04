<template>
  <v-container v-if="getPost" class="mt-3" flexbox center>
    <!-- Post Card -->
    <v-layout row wrap>
      <v-flex xs12>
        <v-card hover>
          <v-card title>

          </v-card>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex"
import {
  GET_POST,
  ADD_POST_MESSAGE,
  LIKE_POST,
  UNLIKE_POST
} from "../../queries"

export default {
  name: "Post",
  props: ["postId"],
  data() {
    return {

    }
  },
  apollo: {
    getPost: {

    }
  },
  computed: {

  },
  methods: {

  }
}
</script>

<style>
  #post__image {
    height: 400px !important;
  }
</style>
