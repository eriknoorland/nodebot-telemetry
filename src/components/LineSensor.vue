<template>
  <div class="lineSensor">
    <div
      v-for="(value, index) in lines"
      v-bind:key="index"
      v-bind:style="{
        height: `${calculateLineHeight(value)}%`,
      }"
      class="lineSensor__bar"
    />
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps(['data']);
const lines = data.line;

function calculateLineHeight(value) {
  const resolution = 2048;
  
  return (value * 100) / resolution;
};
</script>

<style lang="scss" scoped>
.lineSensor {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 8px;
  height: 100%;
}

.lineSensor__bar {
  flex: 0 0 calc(12.5% - 4px);
  background: #000;
}
</style>
