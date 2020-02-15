<template>
    <line-chart
      class="chart"
      v-bind:chart-data="chartData"
      v-bind:options="{
        responsive:true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                stepSize: 5,
                max: 120,
              },
            },
          ],
        },
        animation: {
          duration: 0,
        },
      }"
    />
</template>

<script>
import LineChart from '@/components/charts/Line';

const numItems = 50;
const labels = new Array(numItems).fill('');
const leftTickData = [];
const rightTickData = [];

export default {
  components: {
    LineChart,
  },

  data() {
    return {
      chartData: {},
    };
  },

  sockets: {
    data({ odometry }) {
      odometry.forEach(({ leftTicks, rightTicks }) => {
        leftTickData.push(leftTicks);
        rightTickData.push(rightTicks);

        if (leftTickData.length > numItems) {
          leftTickData.shift();
          rightTickData.shift();
        }
      });

      this.chartData = {
        labels,
        datasets: [
          {
            label: 'Left ticks',
            borderColor: '#f00',
            data: leftTickData,
          },
          {
            label: 'Right ticks',
            borderColor: '#00f',
            data: rightTickData,
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss">
.chartjs-render-monitor {
  position: absolute;
  top: 0;
  left: 0;
}

.chart {
  height: 100%;
}
</style>
