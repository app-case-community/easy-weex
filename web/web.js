import Vue from 'vue'
window.Vue = Vue
require('weex-vue-render')
Vue.component('lottie', require('@components/lottie.vue').default)
