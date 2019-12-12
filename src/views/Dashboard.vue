<template>
  <div class="modules">
    <module>
      <log />
    </module>

    <module v-if="sensors.includes('lidar')">
      <lidar />
    </module>

    <module v-if="sensors.includes('camera')">
      <camera />
    </module>

    <module>
      <odometry />
    </module>
  </div>
</template>

<script>
import Module from '@/components/Module.vue';
import Log from '@/components/modules/Log.vue';
import Lidar from '@/components/modules/Lidar.vue';
import Camera from '@/components/modules/Camera.vue';
import Odometry from '@/components/modules/Odometry.vue';

export default {
  components: {
    Module,
    Log,
    Lidar,
    Camera,
    Odometry,
  },

  data() {
    return {
      sensors: [],
    };
  },

  sockets: {
    setup({ sensors }) {
      this.sensors = sensors;
    },
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
