<template>
  <scroller>
    <div class="panel">
      <text class="text">Weex 是一套简单易用的跨平台开发方案，能以 Web 的开发体验构建高性能、可扩展的原生应用。</text>
    </div>
    <!-- <lottie style='width:200px;height:200px;border-width:2px;' loop=true src="local://lottie/coinpig.json" />
    <lottie style='width:200px;height:200px;border-width:2px;' loop=true src="local://lottie/motorcycle.json" /> -->
    <lottie style='width:200px;height:200px;border-width:2px;' loop=true src="https://www.lottiefiles.com/storage/datafiles/nwHJNOUoNltzK7d/data.json" />
  </scroller>
</template>

<style scoped>
.panel {
    display: flex;
    flex-direction:column;
    width: 750px;
    border-width: 2px;
    border-style: solid;
    border-color: #BBB;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 30px;
}
.text {
  lines: 3;
  color: #666666;
  font-size: 32px;
}

</style>
