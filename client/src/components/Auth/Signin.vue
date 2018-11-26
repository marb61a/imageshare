<template>
  <v-container text-xs-center mt-5 pt-5>
    <!-- Signin Title -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h1>Welcome Back!</h1>
      </v-flex>
    </v-layout>

    <!-- Signin Form -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-card color="secondary" dark>
          <v-container>
            <v-form>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field
                    v-model="username" 
                    prepend-icon="face" 
                    label="Username" 
                    type="text" 
                    required
                  >
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Signin"
}
</script>

<style>

</style>
