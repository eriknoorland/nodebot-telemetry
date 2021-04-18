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
import { mapState } from 'vuex';
import LineChart from '@/components/charts/Line';

const numItems = 50;
const labels = new Array(numItems).fill('');
const leftTickData = new Array(numItems).fill(0);
const rightTickData = new Array(numItems).fill(0);
const datasetLeftTicks = {
  label: 'Left motor ticks',
  borderColor: '#f00',
  data: leftTickData,
};
const datasetRightTicks = {
  label: 'Right motor ticks',
  borderColor: '#00f',
  data: rightTickData,
};

export default {
  components: {
    LineChart,
  },

  data() {
    return {
      noTicksCount: 0,
      chartData: {
        labels,
        datasets: [
          datasetLeftTicks,
          datasetRightTicks,
        ],
      },
    };
  },

  computed: {
    ...mapState('odometry', ['ticks']),
  },

  watch: {
    ticks(data) {
      const dataHasTicks = data.every(({ leftTicks, rightTicks }) => !!leftTicks && !!rightTicks);

      if (dataHasTicks) {
        this.noTicksCount = 0;
      } else {
        this.noTicksCount += 1;

        if (this.noTicksCount >= 3) {
          return;
        }
      }

      data.forEach(({ leftTicks, rightTicks }) => {
        leftTickData.push(leftTicks);
        rightTickData.push(rightTicks);

        if (leftTickData.length > numItems) {
          leftTickData.shift();
          rightTickData.shift();
        }
      });

      this.chartData = {
        datasets: [datasetLeftTicks, datasetRightTicks],
        labels,
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
