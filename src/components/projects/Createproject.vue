<template>
    <v-app>
        <v-container class="s-p-16">
            <form @submit.prevent="onCreateProject">
          <v-layout row>
            <v-flex xs12 offset-sm3>
              <h4 class="primary--text">Create a new event</h4>
            </v-flex>
          </v-layout>
           <v-layout >
            <v-flex xs12>
                 <v-layout row>
                    <v-flex xs12 sm6 offset-sm3>
                      <v-text-field
                        label="Title"
                        name="Event Name"
                        prepend-icon="mdi-tag-outline"
                        fluid
                        textarea
                        required
                        v-model="title"
                      ></v-text-field>
                    </v-flex>
                     <v-flex xs12 sm6 offset-sm3>
                      <v-text-field
                        label="Location"
                        name="location "
                        fluid
                        textarea
                        prepend-icon="mdi-map-marker"
                        required
                        v-model="location"
                      ></v-text-field>
                    </v-flex>
                    <v-flex xs12 sm6 offset-sm3>
                        <v-img :src="coverimage" alt="">
                        </v-img>
                    </v-flex>
                     <v-flex xs12 sm6 offset-sm3>
                      <v-file-input
                        label="Cover image"
                        name="cover-image "
                        id="coverImage"
                        textarea
                        required
                        show-size
                        accept="image/*"
                        @change="onFilePicked"
                        v-model="file"
                        type="file"
                      ></v-file-input>
                    </v-flex>

                    <v-flex xs12 sm6 offset-sm3 class="s-mt-20">
                     <v-textarea
                        name="description"
                        label="Description"
                        v-model="description"
                        prepend-icon="mdi-clipboard-text-play-outline"
                      ></v-textarea>
                    </v-flex>

                    <!--date and time-->
                    <v-flex  xs12 sm6 offset-sm3>
                      <v-row>
                          <v-col cols="12" lg="6" sm="12">
                            <v-menu
                              ref="menu1"
                              v-model="menu1"
                              :close-on-content-click="false"
                              transition="scale-transition"
                              offset-y
                              max-width="290px"
                              min-width="290px"
                            >
                              <template v-slot:activator="{ on }">
                                <v-text-field
                                  v-model="start"
                                  label="Start"
                                  persistent-hint
                                  prepend-icon="mdi-calendar-range"
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker v-model="start" no-title @input="menu1 = false"></v-date-picker>
                            </v-menu>
                          </v-col>

                          <v-col cols="12" lg="6" sm="12">
                            <v-menu
                              v-model="menu2"
                              :close-on-content-click="false"
                              transition="scale-transition"
                              offset-y
                              max-width="290px"
                              min-width="290px"
                            >
                              <template v-slot:activator="{ on }">
                                <v-text-field
                                  v-model="end"
                                  label="End"
                                  persistent-hint
                                  prepend-icon="mdi-calendar-range"
                                  readonly
                                  v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker v-model="end" no-title @input="menu2 = false"></v-date-picker>
                            </v-menu>
                          </v-col>
                        </v-row>
                    </v-flex>

                     <v-flex xs12 sm6 offset-sm3>
                      <v-dialog
                        ref="dialog"
                        v-model="modal3"
                        :return-value.sync="time"
                        persistent
                        width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="time"
                            label="starting time"
                            readonly
                            prepend-icon="mdi-clock-outline "
                            v-on="on"
                            width="100"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="modal3"
                          v-model="time"
                          full-width
                        >
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="modal3 = false">Cancel</v-btn>
                          <v-btn text color="primary" @click="$refs.dialog.save(time)">OK</v-btn>
                        </v-time-picker>
                      </v-dialog>
                    </v-flex>

                    <v-flex xs12 offset-sm3>
                      <v-spacer></v-spacer>
                      <v-btn type="submit" class="info" :disabled="!isValid">create</v-btn>
                    </v-flex>
                  </v-layout>
                  </v-flex>
                  </v-layout>
            </form>
            <div>
              <v-dialog v-model="dialog"  max-width="290">
                <v-card>
                  <v-card-title class="headline">All mandatory field must be filed correctly </v-card-title>
                  <v-card-text :text="message"></v-card-text>
                </v-card>
              </v-dialog>
            </div>
        </v-container>
    </v-app>
</template>
<script>
import format from 'date-fns/format'
export default {
  data: () => ({
    title: '',
    description: '',
    time: null,
    location: '',
    coverimage: '',
    file: null,
    maxAttendies: 3,
    start: null,
    end: null,
    dateCreated: new Date().toISOString().substr(0, 10),

    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
    menu1: false,
    dialog: false,
    message: '',

    menu3: false,
    modal3: false
  }),
  computed: {
    computedDateFormatted () {
      return this.date ? format(this.date, 'YYYY MMMM Do dd') : ''
    },
    dateFormatted () {
      return this.dateCreated ? format(this.dateCreated, 'YYYY MMMM Do dd') : ''
    },
    isValid () {
      return this.title !== '' && this.location !== '' &&
           this.description !== '' && this.file !== ''
    }
  },
  methods: {
    onCreateProject () {
      if (!this.isValid) {
        return
      }
      if (this.start < this.dateCreated) {
        this.message = 'event cant be in the past'
        this.dialog = true
      } else if (this.end < this.dateCreated || this.end < this.start) {
        this.message = 'Event cant be in the past'
        this.dialog = true
      } else {
        const projectData = {
          title: this.title,
          location: this.location,
          coverImage: this.file,
          dateCreated: this.dateCreated,
          description: this.description,
          maxAttendies: this.maxAttendies,
          startDate: this.start,
          endDate: this.end
        }
        this.$store.dispatch('createProject', projectData)
        this.$router.push('/')
      }
    },

    onFilePicked (e) {
      const file = this.file
      if (file !== undefined) {
        const fileName = file.name
        if (fileName.lastIndexOf('.') <= 0) {
          alert('please choose avalid file')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.coverimage = fileReader.result
        })
        fileReader.readAsDataURL(file)
        // this.image = file
      }
    }
  }

}
</script>
<style >
  .s-p-16{
    padding: 16px;
  }
</style>
