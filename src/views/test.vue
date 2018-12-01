<template>
  <scroller>
    <div class="panel">
      <text class="text">Weex 是一套简单易用的跨平台开发方案，能以 Web 的开发体验构建高性能、可扩展的原生应用。</text>
    </div>
    <f2-chart :data="chartData" style="width:750px;height:600px;" />
    <!-- <text>本地资源1</text>
    <lottie style='width:200px;height:200px;border-width:2px;' loop=true src="local://lottie/coinpig.json" />
    <text>本地资源1</text>
    <lottie style='width:200px;height:200px;border-width:2px;' loop=true src="local://lottie/preloader.json" /> -->
    <text>在线资源</text>
    <lottie ref="lottie3" style='width:200px;height:200px;border-width:2px;' @loaded="loadFinish" loop=true src="https://www.lottiefiles.com/storage/datafiles/nwHJNOUoNltzK7d/data.json" />
  </scroller>
</template>
<script>
  import F2Chart from '@components/f2-chart.vue'
  export default {
    components: {
      F2Chart
    },
    data () {
      return {
        chartData: [{
                      genre: 'Sports',
                      sold: 275
                    },
                    {
                      genre: 'Strategy',
                      sold: 115
                    },
                    {
                      genre: 'Action',
                      sold: 120
                    },
                    {
                      genre: 'Shooter',
                      sold: 350
                    },
                    {
                      genre: 'Other',
                      sold: 150
                    }
        ]
      }
    },
    methods: {
      loadFinish () {
        this.$refs.lottie3.play()
        setTimeout(() => {
          this.$refs.lottie3.pause()
          setTimeout(() => {
            this.$refs.lottie3.reset()
          }, 1000)
        }, 3000)
      }
    }
  }
</script>

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
