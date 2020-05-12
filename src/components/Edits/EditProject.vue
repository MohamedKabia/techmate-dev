<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          v-on="on"
          text
        >
       <v-icon>mdi-pencil-outline </v-icon>
       </v-btn>
        </template>

      <v-card>
        <v-card-title
          class="headline primary lighten-2"
          primary-title
        >
         Edit
        </v-card-title>

        <v-card-text>
          <form @submit.prevent="updateProject(currentlyEditing)">
           <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                  name="title"
                  label="Title"
                  id="title"
                  v-model="editedTitle"
                ></v-text-field>

                 <v-text-field
                  name="title"
                  label="Location"
                  v-model="editedLocation"
                ></v-text-field>

                 <v-text-field
                  name="title"
                  label="Max Attendies"
                  v-model="editedMaxAttendies"
                ></v-text-field>

                <v-textarea
                  name="description"
                  label="Description"
                  v-model="editedDescription"
                ></v-textarea>
              </v-flex>
              <v-flex xs6>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="date"
                transition="scale-transition"
                offset-y
                min-width="200px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="date"
                    label="Pick a date"
                    prepend-icon="mdi-calendar-range"
                    readonly
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                  <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                </v-date-picker>
              </v-menu>
              </v-flex>
              <v-flex xs6>
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
                   label="Pick a time"
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

               <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="info"
                  text
                  @click="dialog = false"
                  type="submit"
                >
                  Save
                </v-btn>
              </v-card-actions>
           </v-layout>
          </form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import format from 'date-fns/format'
export default {
  props: ['project'],
  data () {
    return {
      dialog: false,
      editedTitle: this.project.title,
      editedDescription: this.project.description,
      currentlyEditing: this.project.id,
      editedLocation: this.project.location,
      editedMaxAttendies: this.project.maxAttendies,

      time: null,
      location: '',
      coverimage: '',
      file: null,

      date: new Date().toISOString().substr(0, 10),
      selectedDate: null,
      menu: false,
      modal: false,
      menu2: false,

      menu3: false,
      modal3: false
    }
  },
  methods: {
    updateProject (id) {
      const data = {
        id: id,
        title: this.editedTitle,
        description: this.editedDescription,
        location: this.editedLocation,
        maxAttendies: this.editedMaxAttendies
      }
      this.$store.dispatch('updataProject', data)
    }
  },
  computed: {
    computedDateFormatted () {
      return this.date ? format(this.date, 'YYYY MMMM Do dd') : ''
    },
    projects () {
      return this.$store.getters.LoadedProject(this.id)
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  }
}
</script>
