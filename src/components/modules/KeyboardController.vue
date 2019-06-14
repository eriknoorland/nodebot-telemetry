<template>
  <div class="keyboardController">
    <div class="keys">
      <div class="key" v-bind:class="{ '_is_active': up }">
        up
      </div>

      <div class="key" v-bind:class="{ '_is_active': down }">
        down
      </div>

      <div class="key" v-bind:class="{ '_is_active': left }">
        left
      </div>

      <div class="key" v-bind:class="{ '_is_active': right }">
        right
      </div>

      <div class="key" v-bind:class="{ '_is_active': space }">
        space
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KeyboardController',

  data() {
    return {
      up: false,
      down: false,
      left: false,
      right: false,
      space: false,
    };
  },

  methods: {
    onKey({ type, keyCode }) {
      switch (keyCode) {
        case 32: // spacebar
          this.space = type === 'keydown';

          if (type === 'keyup') {
            this.$socket.emit('remote.stop');
          }
          break;
        case 66: // b
          if (type === 'keyup') {
            this.$socket.emit('remote.beep');
          }
          break;
        case 38: // arrow up
          this.up = type === 'keydown';

          if (type === 'keyup') {
            this.$socket.emit('remote.forward');
          }
          break;
        case 40: // arrow down
          this.down = type === 'keydown';

          if (type === 'keyup') {
            this.$socket.emit('remote.reverse');
          }
          break;
        case 37: // arrow left
          this.left = type === 'keydown';

          if (type === 'keyup') {
            this.$socket.emit('remote.rotateLeft');
          }
          break;
        case 39: // arrow right
          this.right = type === 'keydown';

          if (type === 'keyup') {
            this.$socket.emit('remote.rotateRight');
          }
          break;
        // no default
      }
    },
  },

  mounted() {
    document.addEventListener('keydown', this.onKey);
    document.addEventListener('keyup', this.onKey);
  },
};
</script>

<style lang="scss" scoped>
.keys {

}

.key {
  display: flex;
  margin: 10px;
  width: 50px;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  text-transform: uppercase;

  &._is_active {
    background: #f2f2f2;
  }
}
</style>
