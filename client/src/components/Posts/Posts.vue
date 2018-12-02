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
    query: INFINITE_SCROLL_POSTS,
    variables: {
      pageNum: 1,
      pageSize
    }
  },
  methods: {
    showMorePosts() {
      this.pageNum += 1

      // Fetch the data and then transform the original result
      this.$apollo.queries.infiniteScrollPosts.fetchMore({
        variables: {
          // Increment the pageNum by 1
          pageNum: this.pageNum,
          pageSize
        },
        updateQuery: (prevResult, { fetchMoreResult }) => {
          console.log("previous result", prevResult.infiniteScrollPosts.posts)
          console.log("fetch more result", fetchMoreResult)

          const newPosts = fetchMoreResult.infiniteScrollPosts.posts
          const hasMore = fetchMoreResult.infiniteScrollPosts.hasMore
          this.showMoreEnabled = hasMore

          return {
            infiniteScrollPosts: {
              __typename: prevResult.infiniteScrollPosts.__typename,

              // Merge previous posts with new posts
              posts: [...prevResult.infiniteScrollPosts.posts, ...newPosts],
              hasMore
            }
          }
        }
      })
    }
  }
}
</script>
