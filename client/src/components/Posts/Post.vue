<template>
  <v-container v-if="getPost" class="mt-3" flexbox center>
    <!-- Post Card -->
    <v-layout row wrap>
      <v-flex xs12>
        <v-card hover>
          <v-card-title>
            <h1>{{getPost.title}}</h1>
            <v-btn @click="handleToggleLike" large icon v-if="user">
              <v-icon 
                large :color="checkIfPostLiked(getPost._id) ? 'red' : 'grey'"
              >
                favorite
              </v-icon>
            </v-btn>
            <h3 class="ml-3 font-weight-thin">
              {{getPost.likes}} LIKES
            </h3>
            <v-spacer></v-spacer>
            <v-icon @click="goToPreviousPage" color="info" large>
              arrow_back
            </v-icon>
          </v-card-title>
          <v-tooltip right>
            <span>Click to enlarge image</span>
            <v-card-media 
              @click="toggleImageDialog" 
              slot="activator" 
              :src="getPost.imageUrl" 
              id="post__image"
            >
            </v-card-media>
          </v-tooltip>

          <!-- Post image dialog -->
          <v-dialog v-model="dialog">
            <v-card>
              <v-card-media :src="getPost.imageUrl" height="80vh">
              </v-card-media>
            </v-card>
          </v-dialog>
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
