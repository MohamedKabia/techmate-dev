<template>
    <v-app>
        <v-container pa-5>
          <v-layout row wrap>
            <v-flex sm12 md8 offset-md2>
              <div>
              <v-layout row wrap >
                <!--tetst template -->
                   <v-card
                    class="mx-auto p-10 flat cover-img"
                    max-width="734"
                    tile
                  >
                    <v-img
                      class="cover-img"
                      max-height="300px"
                      src="https://cdn.vuetifyjs.com/images/lists/ali.png"
                    >
                      <v-row
                        align="end"
                        class="fill-height"
                      >
                        <v-col
                          align-self="start"
                          class="pa-0"
                          cols="12"
                        >
                          <v-avatar
                            class="profile"
                            color="grey"
                            size="164"
                            tile
                          >
                            <v-img :src="profile.profileImage" v-if="profile.profileImage !==null || profile.profileImage !==undefined"></v-img>
                          </v-avatar>

                          <!--when no profile-->
                          <v-avatar
                            class="profile"
                            color="grey"
                            size="164"
                            tile
                            v-if="profile.profileImage ===null || profile.profileImage ===undefined"
                          >
                            <v-img src="https://cdn.vuetifyjs.com/images/lists/ali.png"></v-img>
                          </v-avatar>
                        </v-col>
                        <v-col class="py-0">
                          <v-list-item
                            color="rgba(0, 0, 0, .4)"
                            dark
                          >
                            <v-list-item-content>
                              <v-list-item-title class="title">{{profile.userName}}</v-list-item-title>
                              <v-list-item-subtitle>
                                 <div>
                                  <small style="display:block"><a :href="profile.website" target="_blank">{{profile.website}}</a></small>
                                </div>
                              </v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-col>
                      </v-row>
                    </v-img>
                     <div>
                     <v-breadcrumbs :items="items" divider="-"></v-breadcrumbs>
                    </div>
                     <VDivider/>
                     <v-card-title><small>Gender: {{profile.gender}}</small></v-card-title>
                   <v-card-subtitle>
                     <div>
                       <p class="">{{profile.bio}}</p>
                     </div>
                   </v-card-subtitle>
                   <div class="d-flex">
                     <router-link to="/profile/edit" style="text-decoration:none">
                      <v-btn class="flat info " fluid>
                        <v-icon>mdi-account-edit</v-icon>
                       </v-btn>
                     </router-link>
                    <v-btn class="flat mr-l" fluid @click="signout">
                      <v-icon>mdi-logout-variant </v-icon>
                      logout
                    </v-btn>
                   </div>
                  </v-card>
                <!--test template  end-->
                 </v-layout>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
    </v-app>
</template>
<script>
export default {
  data: () => ({
    userProfile: [],
    user: null,
    items: [
      {
        text: 'Projects',
        disabled: false,
        href: '/projects'
      },
      {
        text: 'Registered Projects',
        disabled: false,
        href: '/Registered/Projects'
      }
    ]
  }),
  methods: {
    signout () {
      this.$store.dispatch('signout')
      this.$router.push('/signin')
    }
  },
  computed: {
    profile () {
      return this.$store.getters.profile
    }
  }
}
</script>
