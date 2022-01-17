<template>
  <div class="lineSensor">
    <div
      v-for="(sensor, index) in line"
      v-bind:key="index"
      v-bind:style="{ height: `${(sensor * 100) / resolution}%` }"
      class="lineSensor__bar"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      resolution: 2048,
    };
  },

  computed: {
    ...mapState('sensors', ['line']),
  },
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
