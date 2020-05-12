import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import style from './assets/css/style.css'
import * as firebase from 'firebase'
import VueClipboard from 'vue-clipboard2'
import Alert from './components/shared/Alert'
import EditProject from './components/Edits/EditProject'
import VueTextAreaAutosize from 'vue-textarea-autosize'

Vue.use(VueClipboard)
Vue.use(VueTextAreaAutosize)
Vue.config.productionTip = false
Vue.component('app-alert', Alert)
Vue.component('app-editproject', EditProject)

// export const auth = firebase.auth()
new Vue({
  style,
  router,
  store,
  vuetify,
  render: h => h(App),
  created () {
    // Initialize Firebase
    firebase.initializeApp({
      apiKey: 'AIzaSyCc6nnRA1BGohFX0zdvQmkFJmcbqi2p4bE',
      authDomain: 'techmate-f467e.firebaseapp.com',
      databaseURL: 'https://techmate-f467e.firebaseio.com',
      projectId: 'techmate-f467e',
      storageBucket: 'techmate-f467e.appspot.com',
      messagingSenderId: '77470817870',
      appId: '1:77470817870:web:e8c949b300cc99c1f1ad1f',
      measurementId: 'G-W0GVBBLS1G'
    })
    this.$store.dispatch('loadedProjects')
    this.$store.dispatch('getUserProfile')
    this.$store.dispatch('getUser')
    this.$store.dispatch('getUserProject')
  }
}).$mount('#app')
