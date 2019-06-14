<template>
  <div class="modules">
    <module>
      <log />
    </module>

    <module>
      <lidar />
    </module>

    <module>
      <keyboard-controller />
    </module>
  </div>
</template>

<script>
import Module from '@/components/Module.vue';
import Log from '@/components/modules/Log.vue';
import Lidar from '@/components/modules/Lidar.vue';
import KeyboardController from '@/components/modules/KeyboardController.vue';

export default {
  name: 'Dashboard',

  components: {
    Module,
    Log,
    Lidar,
    KeyboardController,
  },
};
</script>

<style lang="scss">
.modules {
  padding: 0 10px;

  @media(min-width: 768px) {
    display: flex;
    padding: 0;
    flex-wrap: wrap;
  }
}
</style>
