<template lang="en">
    <v-app>
        <v-layout row wrap>
        <v-flex sm12 md6 offset-md3>
            <v-container>

                <v-card>

                    <v-layout row wrap>
                        <v-flex sm12 md6>
                    <v-img
                        :src="profilePic"
                        aspect-ratio="1"
                        class="grey lighten-2 br-50"
                        max-width="500"
                        max-height="300"
                    ></v-img>
                      <v-layout column wrap>
                        <col cols="12">
                        <v-card-actions>
                          <input type="file"
                           style="display:none"
                           @change="onfilePick"
                            ref="fileInput">
                            <v-btn
                              color="flat"
                              @click="updateProfilePhoto">
                            <v-icon>mdi-camera </v-icon>
                          </v-btn>
                        </v-card-actions>
                        </col>
                      </v-layout>
                    </v-flex>
                    </v-layout>
                     <form @submit.prevent="updateProfile">
                    <v-layout column wrap>
                      <v-col cols="12" >
                        <v-text-field
                            label="Name"
                            outlined
                            v-model="name"
                        ></v-text-field>
                        </v-col>
                         <v-col cols="12" >
                        <v-text-field
                            label="User name"
                            outlined
                            v-model="userName"
                        ></v-text-field>
                        </v-col>
                         <v-col cols="12" >
                        <v-text-field
                            label="Website"
                            outlined
                            v-model="website"
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" >
                        <v-text-field
                            label="Bio"
                            outlined
                            v-model="bio"
                        ></v-text-field>
                        </v-col>
                        <v-col cols="12" >
                       <v-select
                        :items="items"
                        label="Gender"
                        outlined
                        v-model="gender"
                        ></v-select>
                        </v-col>

                        <v-col cols="12">
                        <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            :return-value.sync="dateOfBirth"
                            transition="scale-transition"
                            offset-y
                            min-width="200px"
                        >
                            <template v-slot:activator="{ on }">
                            <v-text-field
                                v-model="dateOfBirth"
                                label="date of birth"
                                prepend-icon="mdi-calendar-range"
                                readonly
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-date-picker v-model="dateOfBirth" no-title scrollable>
                            <v-spacer></v-spacer>
                            <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                            <v-btn text color="primary" @click="$refs.menu.save(dateOfBirth)">OK</v-btn>
                            </v-date-picker>
                        </v-menu>
                        </v-col>
                        <v-col cols="12" >
                            <v-spacer></v-spacer>
                            <v-btn color="success" type="submit">save</v-btn>
                        </v-col>

                    </v-layout>
                    </form>
                </v-card>

            </v-container>
        </v-flex>
        </v-layout>
    </v-app>
</template>
<script>
export default {
  data: () => ({
    items: ['Male', 'Female', 'Others'],
    gender: '',
    name: '',
    userName: '',
    bio: '',
    website: '',
    photo: null,
    dataOfBirth: null,
    dateOfBirth: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    user: null,
    profilePic: 'https://picsum.photos/id/11/500/300',
    profileImage: null
  }),
  computed: {
    computedDateFormatted () {
      return this.formatDate(this.dateOfBirth)
    }
  },
  methods: {
    userIsAuthenticated () {
      let user = this.$store.getters.user
      if (user !== undefined || user !== null) {
        return this.userIsAuthenticated
      }
    },
    updateProfilePhoto () {
      this.$refs.fileInput.click()
    },
    onfilePick (e) {
      const file = e.target.files[0]
      if (file !== undefined) {
        const fileName = file.name
        if (fileName.lastIndexOf('.') <= 0) {
          alert('please choose avalid file')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.profilePic = fileReader.result
        })
        fileReader.readAsDataURL(file)
        this.profileImage = file
      }
    },
    updateProfile () {
      const data = {
        gender: this.gender,
        name: this.name,
        userName: this.userName,
        bio: this.bio,
        website: this.website,
        photo: this.photo,
        dataOfBirth: this.dataOfBirth,
        profileImage: this.profileImage
      }
      if (this.gender !== '' && this.name !== '' && this.userName !== '' &&
            this.dataOfBirth !== '' && this.profileImage !== null && this.profileImage !== undefined) {
        this.$store.dispatch('updateProfile', data)
        this.$router.push('/profile')
      } else {
        let message = 'All field are required'
        this.$store.dispatch('getMessage', message)
      }
    },
    profile () {
      const profileData = this.$store.getters.profile
      if (profileData !== null || this.$store.getters.profile !== undefined) {
        this.userName = profileData.userName
        this.gender = profileData.gender
        this.bio = profileData.bio
        this.website = profileData.website
        this.name = profileData.name
        this.phodataOfBirthto = profileData.dataOfBirth
        this.profilePic = profileData.profileImage
      }
    }
  },
  mounted () {
    this.profile()
  }
}
</script>
