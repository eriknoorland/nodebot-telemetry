<template>
  <div class="battery">
    <div class="batteryStatus">
      <div
        v-bind:class="{
          'batteryStatus__indicator': true,
          'batteryStatus__indicator--low': isBatteryLow,
          'batteryStatus__indicator--noData': !hasBatteryData,
        }"
        v-bind:style="{
          width: `${percentage}%`,
        }"
      />
    </div>

    <span>
      {{ percentage }}% / {{ voltage }}V
    </span>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps(['data']);
const battery = props.data || { voltage: 0, numCells: 0 };
const hasBatteryData = !!props.data;
const minVoltage = 3.2;
const minThresholdVoltage = 3.6;
const maxVoltage = 4.2;

const min = computed(() => {
  return minVoltage * battery.numCells;
});

const max = computed(() => {
  return maxVoltage * battery.numCells;
});

const percentage = computed(() => {
  if (!battery.voltage || battery.voltage < min.value) {
    return 0;
  }
  
  return Math.floor(((battery.voltage - min.value) * 100) / (max.value - min.value));
});

const voltage = computed(() => {
  if (!hasBatteryData) {
    return battery.voltage;
  }

  return battery.voltage.toFixed(2);
});

const isBatteryLow = computed(() => {
  return battery.voltage < (minThresholdVoltage * battery.numCells);
});
</script>

<style lang="scss" scoped>
.battery {
  display: flex;
}

.batteryStatus {
  margin: 0 8px 0 0;
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

  &--low {
    background: #f8d7da;
  }

  &--noData {
    background: #303030;
    width: 100% !important;
    opacity: 0.2;
  }
}
</style>
