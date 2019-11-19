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
  data() {
    return {
      safeThreshold: 3.6,
      voltage: 0,
      numCells: 0,
    };
  },

  computed: {
    min() {
      return 3.2 * this.numCells;
    },

    max() {
      return 4.2 * this.numCells;
    },

    percentage() {
      if (!this.voltage || this.voltage < this.min) {
        return 0;
      }

      return Math.floor(((this.voltage - this.min) * 100) / (this.max - this.min));
    },

    isBatteryLow() {
      return this.voltage < (this.safeThreshold * this.numCells);
    },
  },

  filters: {
    decimalize(value) {
      return value.toFixed(2);
    },
  },

  sockets: {
    data({ battery }) {
      const { voltage, numCells } = battery;

      this.numCells = numCells;
      this.voltage = voltage || 0;
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
