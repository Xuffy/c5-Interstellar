<template>
  <div class="highcharts-container"></div>
</template>

<script>
  import Highcharts from 'highcharts/highstock';
  //  import HighchartsMore from 'highcharts/highcharts-more';
  //  import HighchartsDrilldown from 'highcharts/modules/drilldown';
  //  import Highcharts3D from 'highcharts/highcharts-3d';
  //  HighchartsMore(Highcharts);
  //  HighchartsDrilldown(Highcharts);
  //  Highcharts3D(Highcharts);

  export default {
    props: ['options', 'styles'],
    name: 'VCharts',
    data() {
      return {
        chart: null
      }
    },
    watch: {
      options(val){
        if (val.xAxis) {
          _.map(val.xAxis.categories, val => {
            this.chart.xAxis[0].categories.push(val);
          });
        }
        if (val.series[0]) {
          this.chart.series[0].setData(val.series[0].data);
        }

      }
    },
    mounted() {
      this.initChart();
    },
    methods: {
      initChart() {
//        this.$el.style.width = (this.styles.width || 800) + 'px';
//        this.$el.style.height = (this.styles.height || 400) + 'px';
        this.chart = new Highcharts.Chart(this.$el, this.options);
      }
    }
  }
</script>

<style scoped>
  .highcharts-container {
    width: 100%;
    height: 100%;
  }
</style>
