<template>
  <v-container fluid grid-list-xl>
    <!-- Post Cards -->
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <v-card-hover>
          <v-card-media :src="post.imageUrl" height="30vh" lazy>
          </v-card-media>
          <v-card-actions>
            <v-card-title primary>
              <div>
                <div class="headline">{{post.title}}</div>
                <span class="grey--text">
                  {{post.likes}} likes - {{post.messages.length}} comments
                </span>
              </div>
            </v-card-title>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card-hover>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { INFINITE_SCROLL_POSTS } from "../../queries"

const pageSize = 2

export default {
  name: "Posts",
  data() {
    return {
      pageNum: 1,
      showMoreEnabled: true,
      showPostCreator: false
    }
  },
  apollo: {

  },
  methods: {
    showMorePosts() {

    }
  }
}
</script>
