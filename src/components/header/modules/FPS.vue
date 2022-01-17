<template>
  <div
    v-if="fps.actual"
    class="fps"
  >
    FPS {{ fps.actual.toFixed(0) }} / {{ fps.target }}
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('sensors', ['fps']),
  },
};
</script>
