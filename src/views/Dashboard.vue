<template>
  <div class="modules">
    <module>
      <log />
    </module>

    <module v-if="sensors.includes('poses')">
      <localization />
    </module>

    <module v-if="sensors.includes('lidar')">
      <lidar />
    </module>

    <module v-if="sensors.includes('camera')">
      <camera />
    </module>

    <module v-if="sensors.includes('line')">
      <line-sensor />
    </module>

    <module
      v-if="sensors.includes('odometry')"
      modifiers="module--triple"
    >
      <odometry />
    </module>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Module from '@/components/Module.vue';

export default {
  components: {
    Module,
    Log: () => import(/* webpackChunkName: "log" */ '@/components/modules/Log.vue'),
    Lidar: () => import(/* webpackChunkName: "lidar" */ '@/components/modules/Lidar.vue'),
    LineSensor: () => import(/* webpackChunkName: "lineSensor" */ '@/components/modules/LineSensor.vue'),
    Camera: () => import(/* webpackChunkName: "camera" */ '@/components/modules/Camera.vue'),
    Localization: () => import(/* webpackChunkName: "localization" */ '@/components/modules/Localization.vue'),
    Odometry: () => import(/* webpackChunkName: "odometry" */ '@/components/modules/Odometry.vue'),
  },

  computed: {
    ...mapState('setup', ['sensors']),
  },
};
</script>

<style lang="scss" scoped>
.modules {
  padding: 0 10px;

  @media(min-width: 768px) {
    display: flex;
    padding: 0;
    flex-wrap: wrap;
  }
}
</style>
