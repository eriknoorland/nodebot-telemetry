<template>
  <div class="controls">
    <select class="controls__select" v-model="state">
      <option disabled value="">Select state</option>
      <option value="0">Remote</option>
      <option value="1">Back and forth</option>
      <!-- <option value="2">Back and forth slalom</option> -->
      <option value="3">Back and forth super slalom</option>
      <option value="4">Linefollower</option>
      <!-- <option value="5">Linefollower obstacle</option> -->
      <option value="6">T-time</option>
      <!-- <option value="7">T-time bonus</option> -->
      <!-- <option value="8">Cans</option> -->
      <!-- <option value="9">Cans pickup and return</option> -->
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
  name: 'Controls',

  data() {
    return {
      state: '',
    };
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
    },

    onShutdownClick() {
      this.$socket.emit('shutdown');
    },
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
