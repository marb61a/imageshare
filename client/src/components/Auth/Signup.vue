<template>
  <v-container text-xs-center mt-5 pt-5>
    <!-- Signup Title -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h1>Get Started Here</h1>
      </v-flex>
    </v-layout>

    <!-- Error Alert -->
    <v-layout v-if="error" row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <form-alert :message="error.message"></form-alert>
      </v-flex>
    </v-layout>

    <!-- Signup Form -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-card color="accent" dark>
          <v-container>
            <v-form
              v-model="isFormValid" 
              lazy-validation 
              ref="form" 
              @submit.prevent="handleSignupUser"
            >
              <v-layout row>
                <v-flex xs12>
                  <v-text-field 
                    :rules="usernameRules" 
                    v-model="username" 
                    prepend-icon="face" 
                    label="Username" 
                    type="text" 
                    required
                  >
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field 
                    :rules="emailRules" 
                    v-model="email" 
                    prepend-icon="email" 
                    label="Email" 
                    type="email" 
                    required
                  >
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field 
                    :rules="passwordRules" 
                    v-model="password" 
                    prepend-icon="extension" 
                    label="Password" 
                    type="password" 
                    required
                  >
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-text-field 
                    :rules="passwordRules" 
                    v-model="passwordConfirmation" 
                    prepend-icon="gavel" 
                    label="Confirm Password" 
                    type="password" 
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
  name: "Signup"
}
</script>

<style>

</style>
