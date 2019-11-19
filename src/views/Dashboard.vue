<template>
  <div class="modules">
    <module>
      <log />
    </module>

    <module>
      <lidar />
    </module>

    <module>
      <camera />
    </module>
  </div>
</template>

<script>
import Module from '@/components/Module.vue';
import Log from '@/components/modules/Log.vue';
import Lidar from '@/components/modules/Lidar.vue';
import Camera from '@/components/modules/Camera.vue';

export default {
  components: {
    Module,
    Log,
    Lidar,
    Camera,
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
