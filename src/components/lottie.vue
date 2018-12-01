<template>
  <div
    ref="lavContainer"
  ></div>
</template>

<script>
  import lottie from 'lottie-web'

  export default {
    props: {
      options: Object,
      autoplay: {
        type: Boolean,
        default: true
      },
      loop: {
        type: [Boolean, String],
        default: true
      },
      src: String
    },

    async mounted () {
      let otherOptions = {
        container: this.$refs.lavContainer.$el,
        renderer: 'svg',
        prerender: true,
        loop: this.loop !== false,
        autoplay: this.autoplay !== false,
        path: this.src
      }
      this.anim = lottie.loadAnimation(otherOptions)
      this.$emit('animCreated', this.anim)
    }
  }
</script>
