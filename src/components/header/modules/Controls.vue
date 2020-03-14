<template>
  <div class="controls">
    <select class="controls__select" v-model="state">
      <option disabled value="">
        Select state
      </option>

      <option
        v-for="(state, index) in states"
        v-bind:key="index"
        v-bind:value="index"
      >
        {{ state.name }}
      </option>
    </select>

    <div class="controls__buttons">
      <button
        class="controls__button controls__button--start"
        v-on:click="onStartClick"
      >
        Start
      </button>

      <button
        class="controls__button controls__button--stop"
        v-on:click="onStopClick"
      >
        Stop
      </button>

      <button
        class="controls__button controls__button--shutdown"
        v-on:click="onShutdownClick"
      >
        Shutdown
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      states: [],
      state: '',
    };
  },

  sockets: {
    setup({ states }) {
      this.states = states;
    },
  },

  methods: {
    onStartClick() {
      const state = parseInt(this.state, 10);

      if (!Number.isNaN(state)) {
        this.$socket.emit('start', state);
      }
    },

    onStopClick() {
      this.$socket.emit('stop');
      this.state = '';
    },

    onShutdownClick() {
      this.$socket.emit('shutdown');
    },

    onKey(event) {
      const { type, keyCode } = event;

      event.preventDefault();

      switch (keyCode) {
        case 32: // spacebar
          if (type === 'keyup') this.$socket.emit('remote.stop');
          break;
        case 38: // arrow up
          if (type === 'keyup') this.$socket.emit('remote.forward');
          break;
        case 40: // arrow down
          if (type === 'keyup') this.$socket.emit('remote.reverse');
          break;
        case 37: // arrow left
          if (type === 'keyup') this.$socket.emit('remote.rotateLeft');
          break;
        case 39: // arrow right
          if (type === 'keyup') this.$socket.emit('remote.rotateRight');
          break;

        case 219: // [
          if (type === 'keyup') this.$socket.emit('umbmark.left');
          break;
        case 221: // ]
          if (type === 'keyup') this.$socket.emit('umbmark.right');
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
.controls {
  display: flex;
  flex-wrap: wrap;
}

.controls__select {
  margin: 0 5px 10px 0;
  padding: 5px 10px;
  width: 100%;
  border-radius: 0;
  border-color: #ccc;
  outline: 0;
  -webkit-appearance: none;

  @media(min-width: 768px) {
    width: auto;
  }
}

.controls__buttons {

}

.controls__button {
  margin: 0 5px 0 0;
  padding: 5px 10px;
  outline: 0;
  cursor: pointer;
  -webkit-appearance: none;

  &:last-child {
    margin: 0;
  }
}

.controls__button--start {
  border-color: #c3e6cb;
  background: #d4edda;
  color: #155724;
}

.controls__button--stop {
  border-color: #ffeeba;
  background: #fff3cd;
  color: #856404;
}

.controls__button--shutdown {
  border-color: #f8d7da;
  background: #f5c6cb;
  color: #721c24;
}

</style>
