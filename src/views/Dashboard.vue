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
import Log from '@/components/modules/Log.vue';
import Lidar from '@/components/modules/Lidar.vue';
import LineSensor from '@/components/modules/LineSensor.vue';
import Camera from '@/components/modules/Camera.vue';
import Localization from '@/components/modules/Localization.vue';
import Odometry from '@/components/modules/Odometry.vue';

export default {
  components: {
    Module,
    Log,
    Lidar,
    LineSensor,
    Camera,
    Localization,
    Odometry,
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
