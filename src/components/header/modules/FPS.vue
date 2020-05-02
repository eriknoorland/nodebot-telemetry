<template>
  <div class="fps">
    FPS {{ actual.toFixed(0) }} / {{ target }}
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('fps', ['actual', 'target']),
  },
};
</script>
