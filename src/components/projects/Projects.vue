<template>
  <v-app>
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <v-card
            color="secondary"
            dark
          >
            <v-card-title class="headline primary--text">Unlimited events acess now</v-card-title>

            <v-card-subtitle color="white" text>Go premium to see all opoen event happening around your area and beyound.</v-card-subtitle>

            <v-card-actions>
              <v-btn text>Get premium Now</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col
          v-for="(project, i) in projects"
          :key="i"
          cols="12"
        >
        <v-container>
          <v-card class="relative">
            <v-layout row>
              <v-flex sm12 md4 class="s-relative">
                 <v-img
                class="ma-3"
                col="12"
                tile
              >
                <v-img :src="project.coverImage"
                max-height="320"
                ></v-img>
              </v-img>
              <v-card-actions class="absolute- p2">
                   <template class="s-p-5">
                    <v-btn fight class="primary" :to="'/project/'+ project.id">view</v-btn>
                      <app-editproject :project="project"></app-editproject>
                  </template>
                </v-card-actions>
              </v-flex>

              <v-flex sm12 md8>
                 <div>
                <v-card-title
                  class="headline"
                  v-text="project.title"
                ></v-card-title>
                <v-card-subtitle v-text="project.title"></v-card-subtitle>
                <v-card-text style="width:100%">
                  <p>{{project.description}}</p>
                </v-card-text>
              </div>
              </v-flex>
            </v-layout>
          </v-card>
        </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
export default {
  data: () => ({

  }),
  computed: {
    projects () {
      const data = this.$store.getters.userProjects
      return data
    }
  }
}
</script>
