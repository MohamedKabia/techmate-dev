<template>
    <v-app>
        <v-container>
          <v-layout row wrap class="s-mt-20">
            <v-flex xs12 sm6 offset-sm3>
              <v-card>
                <v-card-text>
                  <v-container>
                    <form @submit.prevent="signUp">
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
                            label="New password"
                            id="password"
                            v-model="password"
                            type="password"
                            required
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                       <v-layout row wrap>
                        <v-flex xs12>
                          <v-text-field
                            name="cpassword"
                            label="Confirm Password"
                            id="cpassword"
                            v-model="cpassword"
                            type="password"
                          ></v-text-field>
                        </v-flex>
                      </v-layout>
                       <v-layout row wrap>
                        <v-flex xs12>
                          <VSpacer/>
                          <v-btn class="info" type="submit" :disabled="!isNotEmpty">Signup</v-btn>
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
export default {
  data: () => ({
    password: '',
    email: '',
    cpassword: ''
  }),
  computed: {
    isNotEmpty () {
      return this.password !== '' &&
              this.email !== '' &&
              this.cpassword !== ''
    },
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    signUp () {
      if (this.password !== this.cpassword) {
        const message = 'Passwords do not match'
        this.$store.dispatch('getMessage', message)
      } else {
        const data = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('createUser', data)
        this.$router.push('/profile/edit')
      }
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/')
      }
    }
  }
}
</script>
