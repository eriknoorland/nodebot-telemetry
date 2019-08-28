<template>
  <div class="battery">
    <div class="batteryStatus">
      <div
        ref="indicatorBar"
        class="batteryStatus__indicator"
        v-bind:class="{ '_is_too_low': isBatteryLow }"
        v-bind:style="{ width: `${percentage}%` }"
      ></div>
    </div>

    <span>{{ percentage }}%</span>
  </div>
</template>

<script>
export default {
  name: 'Battery',

  data() {
    return {
      minVoltage: 3 * 4,
      maxVoltage: 4.2 * 4,
      percentage: 0,
      isBatteryLow: false,
    };
  },

  sockets: {
    data({ battery }) {
      const { voltage } = battery;

      // eslint-disable-next-line
      this.percentage = Math.floor(((voltage - this.minVoltage) * 100) / (this.maxVoltage - this.minVoltage));
      this.isBatteryLow = voltage <= this.minVoltage;
    },
  },
};
</script>

<style lang="scss" scoped>
.battery {
  display: flex;
}

.batteryStatus {
  margin: 0 4px 0 0;
  padding: 2px;
  width: 24px;
  height: 12px;
  border: 1px solid #303030;
  border-radius: 3px;
}

.batteryStatus__indicator {
  width: 0;
  height: 100%;
  background: #c3e6cb;
}

.batteryStatus__indicator._is_too_low {
  background: #f8d7da;
}
</style>
