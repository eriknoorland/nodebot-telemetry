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

    <span>{{ percentage }}% / {{ voltage | decimalize }}V</span>
  </div>
</template>

<script>
export default {
  name: 'Battery',

  data() {
    return {
      min: 3.2 * 4, // 4S battery
      max: 4.2 * 4, // 4S battery
      voltage: 0,
    };
  },

  computed: {
    percentage() {
      return Math.floor(((this.voltage - this.min) * 100) / (this.max - this.min));
    },

    isBatteryLow() {
      return this.voltage <= this.min;
    },
  },

  filters: {
    decimalize(value) {
      return value.toFixed(2);
    },
  },

  sockets: {
    data({ battery }) {
      const { voltage } = battery;

      this.voltage = voltage;
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
