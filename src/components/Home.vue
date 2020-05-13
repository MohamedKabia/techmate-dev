<template>
    <v-app>
       <v-container class="  ligh s-mt-20">
         <v-layout >
           <v-flex xs12 class="text-xs-center">
              <v-progress-circular
                    indeterminate
                    color="green"
                    v-if="loading"
                    primary
              ></v-progress-circular>
           </v-flex>
         </v-layout>
          <v-row no-gutters>
      <v-col
        v-for="project in projects" :key="project.id"
        cols="12"
        md="7"
      >
        <!--main contents-->
          <v-card
    max-width="544"
    class="mx-auto mb-2"
  >
    <v-list-item>
      <v-list-item-avatar color="grey">
        <v-img :src="project.creatorImage"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline"> {{project.title}}</v-list-item-title>
        <v-list-item-subtitle>{{project.creatorName}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-img
      :src="project.coverImage"
      max-height="394"
      @click="onLoadProject(project.id)"
      style="cursor:pointer"
    ></v-img>
    <v-card-text class="description">
      {{project.description}}
    </v-card-text>

    <v-card-actions>
      <v-btn
        text
        color="deep-purple accent-4"
        @click="onLoadProject(project.id)"
      >
        Read more
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon
        v-if="likedProjects.includes(project.id)"
        @click="likeProject(project.id)"
        color="error"
      >
        <v-icon>mdi-heart</v-icon>
      </v-btn>

       <v-btn icon
        v-if="!likedProjects.includes(project.id)"
        @click="likeProject(project.id)"
      >
        <v-icon>mdi-heart-outline</v-icon>
      </v-btn>
      <v-btn icon
      @click.prevent="share(project.id)">
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
  <!--end main contents-->
      </v-col>

      <v-col
        class="s-fixed"
        cols="12"
        md="2"
        v-if="profile"
      >
      <v-list-item >
      <v-list-item-avatar color="grey">
        <v-img :src="profile.profileImage"></v-img>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-subtitle>{{profile.userName}}</v-list-item-subtitle>
      </v-list-item-content>
      </v-list-item>
        <v-card class="s-mt-20">
           <v-card-text>Porpular events</v-card-text>
           <div v-for="project in projects" :key="project.id">
            <v-list-item >
            <v-list-item-avatar color="grey">
              <v-img :src="project.coverImage"></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-subtitle>{{project.title}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-card>
      </v-col>
      <v-col
        class="s-fixed"
        cols="12"
        md="2"
        v-if="!profile"
      >
      <v-list-item >
      <v-list-item-avatar color="grey">
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-subtitle>You are not log in</v-list-item-subtitle>
      </v-list-item-content>
      </v-list-item>
        <v-card class="s-mt-20">
          <v-card-text>
           login to see top events around you
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
     <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <v-card>
        <v-card-title class="primary headline" dark>SignUp or SignIn</v-card-title>

        <v-card-text>
          <p>It apeares that you are not log in, please Sign up or Sign in.</p>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <router-link to="/signin">
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Signin
          </v-btn>
         </router-link>

          <router-link to="/signup">
            <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
            Signup
          </v-btn>
          </router-link>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div>
      <v-dialog v-model="popop"  max-width="290">
        <v-card>
          <v-card-title class="headline"><small><v-btn v-clipboard:copy="message">copy</v-btn></small> </v-card-title>
          <v-card>
            <v-card-text id="txurl" :text="message"><a :href="message" >{{message}}</a></v-card-text>
          </v-card>
        </v-card>
      </v-dialog>
    </div>
   </v-container>
  </v-app>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    popop: false,
    message: ''
  }),
  computed: {
    projects () {
      return this.$store.getters.loadedProjects
    },
    profile () {
      return this.$store.getters.profile
    },
    loading () {
      return this.$store.getters.loading
    },
    likedProjects () {
      return this.$store.getters.getLikedProjects
    }
  },
  methods: {
    copy () {
      let txurl = document.querySelector('#txurl')
      txurl.setAttribute('type', 'text')
      txurl.select()

      try {
        var successful = document.execCommand('copy')
        var msg = successful ? 'successful' : 'unsuccessful'
        alert('Testing code was copied ' + msg)
      } catch (err) {
        alert('Oops, unable to copy')
      }

      /* unselect the range */
      txurl.setAttribute('type', 'hidden')
      window.getSelection().removeAllRanges()
    },
    // end
    onLoadProject (project) {
      this.$router.push('/project/' + project)
    },
    likeProject (id) {
      const user = this.$store.getters.user

      if (user === null || user === undefined) {
        this.dialog = true
      } else {
        this.$store.dispatch('likeProject', id)
      }
    },
    async share (id) {
      const url = window.document.location.href
      let data = {
        text: 'Check out this upcoming event on eplanner',
        link: url + 'project/' + id
      }
      try {
        await navigator.share(data)
          .then()
      } catch (err) {
        this.message = data.link
        this.popop = true
      }
    }
  }
}
</script>
<style>
.v-progress-circular {
  margin: 2px 49%;
  text-align: center;
}
</style>
