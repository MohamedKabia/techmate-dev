<template>
    <v-app>
        <v-container>
          <v-layout row wrap class="s-mt-20">
            <v-flex xs12 sm6 offset-sm3>
              <v-card>
                <v-card-text>
                  <v-container>
                    <h1>user is {{ user }}</h1>
                     <v-layout row wrap v-if="error">
                        <v-flex xs12>
                          <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
                        </v-flex>
                      </v-layout>
                    <form @submit.prevent="signIn">
                      <v-layout row wrap>
                        <v-flex xs12>
                          <v-text-field
                            name="email"
                            label="Email"
                            id="email"
                            v-model="email"
                            type="email"
                            required
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                       <v-layout row wrap>
                        <v-flex xs12>
                          <v-text-field
                            name="password"
                            label="Password"
                            id="password"
                            v-model="password"
                            type="password"
                            required
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                       <v-layout row wrap>
                        <v-flex xs12>
                          <VSpacer/>
                          <v-btn class="info" type="submit" :disabled="!isNotEmpty">Sign in</v-btn>
                        </v-flex>
                      </v-layout>
                    </form>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
    </v-app>
</template>
<script>
import * as firebase from 'firebase'
export default {
  data: () => ({
    password: '',
    email: '',
    user: 'null'
  }),

  computed: {
    isNotEmpty () {
      return this.password !== '' &&
              this.email !== '' &&
              this.cpassword !== ''
    }
  },
  error () {
    return this.$store.getters.error
  },
  async getState () {
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user
      }
    })
  },

  methods: {
    signIn () {
      if (this.password !== '' && this.email !== '') {
        const data = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('logUserIn', data)
          .then(() => {
            firebase.auth().onAuthStateChanged((user) => {
              if (user) {
                this.$router.push('/')
              }
            })
          })
      }
    },
    onDismissed () {
      this.$store.dispatch('clareError')
    }
  }
}
</script>
