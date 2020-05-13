<template>
  <v-app >
    <v-navigation-drawer
      v-model="drawer"
      absolute
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          class="primary--text "
          v-for="item in menueItems" :key="item.title">
          <v-list-item router :to="item.links">
            <v-list-item-title  >
              <v-icon color="primary">{{item.icon}}</v-icon> {{item.title}}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <!--drawer end--->
    <v-card
    color="grey lighten-2"
    flat
    height="60px"
    tile
  >
    <v-toolbar dense>
      <v-app-bar-nav-icon class="d-md-none  d-sm-flex" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer class="d-md-none  d-sm-flex"></v-spacer>
      <v-toolbar-title > <router-link to="/" tag="span" style="cursor:pointer"><img class="logo" src="../src/assets/img/57573b04-df49-47c0-b6fd-657e913df4f9_200x200.png" alt=""> </router-link> </v-toolbar-title>
      <v-spacer class="d-none d-md-flex"></v-spacer>
      <div class="nav d-none d-md-flex" v-for="item in menueItems" :key="item.title">
       <v-list-item router :to="item.links">
          <div  class="pa-2">
         {{item.title}}
         </div>
       </v-list-item>
      </div>
    </v-toolbar>
  </v-card>
    <main>
      <v-layout  wrap>
        <v-flex xs12 sm6 offset-md3 v-if="message">
           <app-alert @dismissed="onDismissed" class="main-alert" :text="message"></app-alert>
        </v-flex>
      </v-layout>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
import * as firebase from 'firebase'
export default {
  name: 'App',
  data: () => ({
    drawer: false,
    group: null,
    user: null
  }),
  computed: {
    menueItems () {
      let menueItems = [
        { title: 'Sign in', icon: 'mdi-login  ', links: '/signin' },
        { title: 'Sign up', icon: 'mdi-account ', links: '/signup' }
      ]
      if (this.user !== null || undefined) {
        let menueItems = [
          { title: 'Projects', icon: 'mdi-view-dashboard-outline', links: '/projects' },
          { title: 'Create event', icon: 'mdi-shape-plus', links: '/createproject/new' },
          { title: 'Profile', icon: 'mdi-clipboard-account', links: '/profile' },
          { title: 'Calendar', icon: 'mdi-calendar-range', links: '/calendar' }
        ]
        return menueItems
      }
      return menueItems
    },

    userIsAuthenticated () {
      return this.$store.getters.user !== null || undefined
    },

    therIsuser () {
      return this.$store.getters.user !== null || this.$store.getters.user !== undefined
    },
    message () {
      return this.$store.getters.message
    }
  },
  methods: {
    async getState () {
      await firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.user = user
        }
      })
    },
    onDismissed () {
      this.$store.dispatch('getMessage', null)
    }
  },
  watch: {
    group () {
      this.drawer = false
    }
  },
  mounted () {
    this.getState()
  }
}
</script>
