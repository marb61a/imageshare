<template>
  <v-container text-xs-center mt-5 pt-5>
    <!-- Add post title -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h1 class="primary--text">Add Post</h1>
      </v-flex>
    </v-layout>

    <!-- Add post form -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-form
          v-model="isFormValid"
          lazy-validation
          ref="form"
          @submit.prevent="handleAddPost"
        >
          <!-- Title input -->
          <v-layout row>
            <v-flex xs12>
              <v-text-field
                 :rules="titleRules"
                 v-model="title"
                 label="Post Title"
                 type="text"
                 required
              >
              </v-text-field>
            </v-flex>
          </v-layout>

          <!-- Image URL input -->
          <v-layout row>
            <v-flex xs12>
              <v-text-field 
                :rules="imageRules" 
                v-model="imageUrl" 
                label="Image URL" 
                type="text" 
                required
              >
              </v-text-field>
            </v-flex>
          </v-layout>

        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: "Add Post",
  data() {
    return {
      isFormValid: true,
      title: "",
      imageUrl: "",
      categories: [],
      description: ""
    }
  },
  computed: {
    ...mapGetters(["loading", "user"])
  },
  methods: {
    handleAddPost() {

    }
  }
}
</script>

