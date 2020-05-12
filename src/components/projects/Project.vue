<template>
    <v-app>
        <v-container class="s-p-16 s-mt-20">
            <v-row align="center" justify="center">
                <v-card>
                <v-img
                :src="project.coverImage"
                aspect-ratio="1"
                class="grey lighten-2"
                width="100%"
                max-height="600"
                ></v-img>
                <v-card-title class="primary--text">{{project.title}}</v-card-title>
                <v-card-text>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam distinctio, sit eum velit iure dignissimos. Dolores, dolorum ratione architecto totam corporis voluptatibus similique. Consequuntur, quas architecto numquam ducimus nostrum consectetur.</p>
                </v-card-text>
                <v-card-actions v-if="project.creatorId !== userId.uid">
                   <v-spacer></v-spacer> <v-btn class="info"
                   v-if="!regisisteredProjects.includes(project.id)"
                   @click="register(project.id)"
                   >
                   Register
                   </v-btn>

                    <v-btn class="error"
                   v-if="regisisteredProjects.includes(project.id)"
                   @click="register(project.id)"
                   >
                   Unregister
                   </v-btn>
                </v-card-actions>
                </v-card>
            </v-row>
        </v-container>
    </v-app>
</template>
<script>
export default {
  props: ['id'],
  computed: {
    project () {
      const project = this.$store.getters.loadedProject(this.id)
      return project
    },
    regisisteredProjects () {
      return this.$store.getters.getRegisteredProjects
    },

    userId () {
      return this.$store.getters.user !== null || this.$store.getters.user !== undefined
    }
  },
  methods: {
    register (id) {
      const user = this.$store.getters.user
      if (user === null || user === undefined) {
        this.$store.dispatch('setMessage', 'Please log in to register')
      } else {
        this.$store.dispatch('registerUser', id)
      }
      console.log(id)
    }
  }
}
</script>
