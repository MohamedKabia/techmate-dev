<template>
  <div>
    <v-alert
      v-model="alert"
      border="left"
      close-text="Close Alert"
      color="deep-purple accent-4"
      dark
      dismissible
      @input="onClosed"
    >
        {{text}}
    </v-alert>

  </div>
</template>
<script>
export default {
  props: ['text'],
  data () {
    return {
      alert: true
    }
  },
  methods: {
    onClosed () {
      this.$emit('dismissed')
    }
  }
}
</script>
