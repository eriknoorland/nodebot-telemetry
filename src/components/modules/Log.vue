<template>
  <pre
    class="log"
    v-html="log"
  />
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState('log', ['log']),
  },
};
</script>

<style lang="scss" scoped>
.log {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: block;
  padding: 5px;
  background: #282923;
  border: 0;
  color: #fff;
  font-family: Monaco;
  font-size: 9px;
  overflow: hidden;
  overflow-y: scroll;

  span {
    display: inline-block;
    margin: 1px 0;
  }
}
</style>
