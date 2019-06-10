<template>
  <div class="fps">
    FPS {{ actual }}/{{ target }}
  </div>
</template>

<script>
export default {
  name: 'FPS',

  data() {
    return {
      actual: 0,
      target: 0,
    };
  },

  sockets: {
    data({ fps }) {
      this.actual = fps.actual.toFixed(0);
      this.target = fps.target;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
