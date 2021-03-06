<template>
  <v-app style="background: #E3E3EE">
    <!-- Side Navbar -->
    <v-navigation-drawer
      app
      temporary
      fixed
      v-model="sideNav"
    >
      <v-toolbar color="accent" dark flat>
        <v-toolbar-side-icon @click="toggleSideNav">
        </v-toolbar-side-icon>
        <router-link to="/" tag="span" style="cursor: pointer">
          <h1 class="title pl-3">
            ImageShare
          </h1>
        </router-link>
      </v-toolbar>

      <v-divider></v-divider>

      <!-- Side Navbar Links -->
      <v-list>
        <v-list-tile 
          ripple
          v-for="item in sideNavItems" 
          :key="item.title"
          :to="item.link"
        >
          <v-list-tile-action>
            <v-icon>
              {{item.icon}}
            </v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            {{item.title}}
          </v-list-tile-content>
        </v-list-tile>

        <!-- Signout Button -->
        <v-list-tile v-if="user" @click="handleSignoutUser">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Signout</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <!-- Horizontal Navbar -->
    <v-toolbar fixed color="primary" dark>
      <!-- App Title -->
      <v-toolbar-side-icon @click="toggleSideNav">
      </v-toolbar-side-icon>
      <v-toolbar-title class="hidden-xs-only">
        <router-link to="/" tag="span" style="cursor: pointer">
          ImageShare
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- Search Input -->
      <v-text-field
        v-model="searchTerm"
        @input="handleSearchPosts"
        flex
        prepend-icon="search"
        placeholder="Search Posts"
        color="accent"
        single-line
        hide-details
      >
      </v-text-field>
      <v-spacer></v-spacer>

      <!-- Search Results card -->
      <v-card dark v-if="searchResults.length" id="search__card">
        <v-list>
          <v-list-tile 
            v-for="result in searchResults" 
            :key="result._id" 
            @click="goToSearchResult(result._id)"
          >
            <v-list-tile-title>
              {{result.title}} -
              <span class="font-weight-thin">
                {{formatDescription(result.description)}}
              </span>
            </v-list-tile-title>

            <!-- Show Icon if Result Favorited by User -->
            <v-list-tile-action v-if="checkIfUserFavorite(result._id)">
              <v-icon>favorite</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>

      <!-- Horizontal Navbar Links -->
      <v-toolbar-items class="hidden-xs-only">
        <v-btn 
          flat 
          v-for="item in horizontalNavItems" 
          :key="item.title"
          :to="item.link"
        >
          <v-icon class="hidden-sm-only" left>
            {{item.icon}}
          </v-icon>
          {{item.title}}
        </v-btn>

        <!-- Profile Button -->
        <v-btn flat to="/profile" v-if="user">
          <v-icon class="hidden-sm-only" left>account_box</v-icon>
          <v-badge 
            right 
            color="blue darken-2" 
            :class="{ 'bounce': badgeAnimated }"
          >
            <span slot="badge" v-if="userFavorites.length">
              {{userFavorites.length}}
            </span>
            Profile
          </v-badge>
        </v-btn>

        <!-- Signout Button -->
        <v-btn flat v-if="user" @click="handleSignoutUser">
          <v-icon class="hidden-sm-only" left>
            exit_to_app
          </v-icon>
          Signout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <!-- App Content -->
    <main>
      <v-container class="mt-4">
        <transition name="fade">
          <router-view/>          
        </transition>

        <!-- Auth Snackbar -->
        <v-snackbar 
          v-model="authSnackbar" 
          color="success" 
          :timeout="5000"
          bottom
          left
        >
          <v-icon class="mr-3">check_circle</v-icon>
          <h3>You are now signed in!</h3>
          <v-btn dark flat @click="authSnackbar = false">Close</v-btn>
        </v-snackbar>

        <!-- Auth Error Snackbar -->
        <v-snackbar 
          v-if="authError" 
          v-model="authErrorSnackbar" 
          color="info" 
          :timeout='5000'
          bottom 
          left
        >
          <v-icon class="mr-3">Cancel</v-icon>
          <h3>{{authError.message}}</h3>
          <v-btn dark flat to="/signin">Sign in</v-btn>
        </v-snackbar>
      </v-container>
    </main>
  </v-app>
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    name: 'App',
    data() {
      return {
        searchTerm: "",
        sideNav: false,
        authSnackbar: false,
        authErrorSnackbar: false,
        badgeAnimated: false
      }
    },
    watch: {
      user(newValue, oldValue) {
        // If there was no value for user before then show the snackbar
        if(oldValue === null) {
          this.authSnackbar = true
        }
      },
      authError(value) {
        // If the auth error is not null, show auth error snackbar
        if(value !== null) {
          this.authErrorSnackbar = true
        }
      },
      userFavorites(value) {
        // If the userFavorites value changed at all
        if(value) {
          this.badgeAnimated = true
          setTimeout(() => (this.badgeAnimated = false), 1000)
        }
      }
    },
    computed: {
      ...mapGetters(["authError", "user"]),
      horizontalNavItems() {
        let items = [
          {icon: "chat", title: 'posts', link: '/posts'},
          {icon: 'lock_open', title: 'Sign In', link: '/signin'},
          {icon: 'create', title: 'Sign Up', link: '/signup'}
        ]

        if(this.user) {
          items = [{ 
            icon: "chat", title: "Posts", link: "/posts" 
          }]
        }
        return items
      },
      sideNavItems() {
        let items = [
          {icon: "chat", title: 'posts', link: '/posts'},
          {icon: 'lock_open', title: 'Sign In', link: '/signin'},
          {icon: 'create', title: 'Sign Up', link: '/signup'}
        ]

        if(this.user) {
          items = [
            { icon: "chat", title: "Posts", link: "/posts" },
            { icon: "stars", title: "Create Post", link: "/post/add" },
            { icon: "account_box", title: "Profile", link: "/profile" }
          ]
        }
        return items
      }
    },
    methods: {
      handleSearchPosts() {
        this.$store.dispatch("searchPosts", {
          searchTerm: this.searchTerm
        })
      },
      handleSignoutUser() {
        this.$store.dispatch("signoutUser")
      },
      goToSearchResult(resultId){
        // Clear the search term
        this.searchTerm = ""

        // Go to the desired result
        this.$router.push(`/posts/${resultId}`)

        // Clear search results
        this.$store.commit("clearSearchResults")
      },
      formatDesc(desc) {
        return desc.length > 30 ? `${desc.slice(0, 30)}...` : desc
      },
      checkIfUserFavorite(resultId) {
        return (
          this.userFavorites &&
          this.userFavorites.some(fave => fave._id === resultId)
        )
      },
      toggleSideNav(){
        this.sideNav = !this.sideNav;
      }
    }
  }
</script>

<style>
  .fade-enter-active,
  .fade-leave-active {
    transition-property: opacity;
    transition-duration: 0.25s;
  }

  .fade-enter-active {
    transition-delay: 0.25s;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
    transform: translateX(-25px);
  }

  /* Search Card results */
  #search__card {
    position: absolute;
    width: 100vw;
    z-index: 8;
    top: 100%;
    left: 0%;
  }

  /* User Favorite Animation */
  .bounce {
    animation: bounce 1s both;
  }

  @keyframes bounce {
  0%,
  20%,
  53%,
  80%,
  100% {
    transform: translate3d(0, 0, 0);
  }
  40%,
  43% {
    transform: translate3d(0, -20px, 0);
  }
  70% {
    transform: translate3d(0, -10px, 0);
  }
  90% {
    transform: translate3d(0, -4px, 0);
  }
}
</style>