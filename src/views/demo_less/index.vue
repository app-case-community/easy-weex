<template>
  <scroller>
    <div class="panel">
      <text class="text">css file Weex 是一套简单易用的跨平台开发方案，能以 Web 的开发体验构建高性能、可扩展的原生应用。Vue 是一个轻量并且功能强大的渐进式前端框架。</text>
      <am-button
        @click="test"
        text="确定"
        type="primary"/>
        <toolbar>
          
        </toolbar>
    </div>
  </scroller>
</template>
<script>
import { AmButton } from 'weex-amui';
export default {
  components: {
    AmButton
  },
  methods: {
    test () {
      console.log('click..')
    }
  }
}
</script>

<style lang="less" scoped>
.text {
    width: 300px;
    height: 100px;
    background-color: burlywood;
    color: red;
}
</style>
