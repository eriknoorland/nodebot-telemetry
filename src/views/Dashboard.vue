<template>
  <div>
    <arena v-if="props.setup.sensors.includes('observations')" />

    <div class="modules">
      <module>
        <Log v-bind:data="log"  />
      </module>

      <module>
        <EmergencyStop />
      </module>

      <module v-if="props.setup.sensors.includes('observations')">
        <Localization v-bind:data="data"  />
      </module>

      <module v-if="props.setup.sensors.includes('lidar')">
        <Lidar v-bind:data="data"  />
      </module>

      <module v-if="props.setup.sensors.includes('camera')">
        <Camera v-bind:data="data"  />
      </module>

      <module v-if="props.setup.sensors.includes('line')">
        <LineSensor v-bind:data="data" />
      </module>

      <!-- <module
        v-if="setupData.sensors.includes('odometry')"
        modifiers="module--triple"
      >
        <Odometry />
      </module> -->
    </div>

  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import Module from '@/components/Module.vue';
import EmergencyStop from '@/components/modules/EmergencyStop.vue';
import Arena from'@/components/modules/Arena.vue';
import Log from'@/components/modules/Log.vue';
import Lidar from'@/components/modules/Lidar.vue';
import LineSensor from'@/components/modules/LineSensor.vue';
import Camera from'@/components/modules/Camera.vue';
import Localization from'@/components/modules/Localization.vue';
// import Odometry from'@/components/modules/Odometry.vue';

const props = defineProps(['log', 'setup', 'data']);
</script>

<style lang="scss" scoped>
.modules {
  padding: 0 10px;

  @media(min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
  }
}
</style>
