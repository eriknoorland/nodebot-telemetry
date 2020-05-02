<template>
  <div class="battery">
    <div class="batteryStatus">
      <div
        ref="indicatorBar"
        class="batteryStatus__indicator"
        v-bind:class="{ '_is_too_low': isBatteryLow }"
        v-bind:style="{ width: `${percentage}%` }"
      />
    </div>

    <span>{{ percentage }}% / {{ voltage | decimalize }}V</span>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('battery', [
      'minVoltage',
      'minThresholdVoltage',
      'maxVoltage',
      'numCells',
      'voltage',
    ]),

    min() {
      return this.minVoltage * this.numCells;
    },

    max() {
      return this.maxVoltage * this.numCells;
    },

    percentage() {
      if (!this.voltage || this.voltage < this.min) {
        return 0;
      }

      return Math.floor(((this.voltage - this.min) * 100) / (this.max - this.min));
    },

    isBatteryLow() {
      return this.voltage < (this.minThresholdVoltage * this.numCells);
    },
  },

  filters: {
    decimalize(value) {
      return value.toFixed(2);
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
