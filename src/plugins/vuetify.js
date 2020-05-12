import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#61B1F7',
        secondary: '#EC4C4C',
        success: '#2186C4',
        error: '#FF8066',
        info: '#7ECEFC'
      }
    }
  }
})
