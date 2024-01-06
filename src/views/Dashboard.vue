<template>
  <div>
    <arena v-if="hasObservations" />

    <div class="modules">
      <module>
        <Log v-bind:data="log"  />
      </module>

      <module>
        <EmergencyStop v-on:onStopClick="handleEmegencyStopClick" />
      </module>

      <module v-if="hasObservations">
        <Localization v-bind:data="data"  />
      </module>

      <module v-if="hasLidar">
        <Lidar v-bind:data="data"  />
      </module>

      <module v-if="hasCamera">
        <Camera v-bind:data="data"  />
      </module>

      <module v-if="hasLine">
        <LineSensor v-bind:data="data" />
      </module>

      <!-- <module
        v-if="hasOdometry"
        modifiers="module--triple"
      >
        <Odometry />
      </module> -->
    </div>

  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { socket } from '@/socket';
import Module from '@/components/Module.vue';
import EmergencyStop from '@/components/EmergencyStop.vue';
import Arena from'@/components/Arena.vue';
import Log from'@/components/Log.vue';
import Lidar from'@/components/Lidar.vue';
import LineSensor from'@/components/LineSensor.vue';
import Camera from'@/components/Camera.vue';
import Localization from'@/components/Localization.vue';
// import Odometry from'@/components/Odometry.vue';

const props = defineProps(['log', 'setup', 'data']);
const hasObservations = props.setup.sensors.includes('observations');
const hasLidar = props.setup.sensors.includes('lidar');
const hasCamera = props.setup.sensors.includes('camera');
const hasLine = props.setup.sensors.includes('line');
// const hasOdometry = props.setup.sensors.includes('odometry');

function handleEmegencyStopClick() {
  socket.emit('emergencyStop');
}
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
