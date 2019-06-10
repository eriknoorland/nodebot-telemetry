<template>
  <pre class="log" v-html="body"></pre>
</template>

<script>
export default {
  name: 'Log',

  data() {
    return {
      body: '',
    };
  },

  sockets: {
    connect() {},

    disconnect() {
      this.body = [
        '<span style="color: #f92472;">[app] server disconnected</span>',
        this.body,
      ].join('\n');
    },

    log(log) {
      this.body = log
        .split(',')
        .reverse()
        .join('\n');
    },
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
  font-size: 11px;
  overflow: hidden;
  overflow-y: scroll;

  span {
    display: inline-block;
    margin: 1px 0;
  }
}
</style>
