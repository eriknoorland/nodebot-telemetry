<template>
  <div class="controls">
    <select
      class="controls__select"
      v-model="program"
    >
      <option
        v-bind:value="{}"
        disabled
      >
        Select program
      </option>

      <option
        v-for="(program) in programs"
        v-bind:key="program.id"
        v-bind:value="program"
      >
        {{ program.name }}
      </option>
    </select>

    <div class="controls__buttons">
      <button
        class="controls__button controls__button--start"
        v-bind:disabled="!isReady"
        v-on:click="onStartClick"
      >
        Start
      </button>

      <!-- <button
        class="controls__button controls__button--restart"
        v-bind:disabled="!isReady"
        v-on:click="onRestartClick"
      >
        Restart
      </button> -->

      <!-- <button
        class="controls__button controls__button--stop"
        v-bind:disabled="!isReady"
        v-on:click="onStopClick"
      >
        Stop
      </button> -->

      <!-- <button
        class="controls__button controls__button--reboot"
        v-bind:disabled="!isReady"
        v-on:click="onRebootClick"
      >
        Reboot
      </button> -->

      <!-- <button
        class="controls__button controls__button--shutdown"
        v-bind:disabled="!isReady"
        v-on:click="onShutdownClick"
      >
        Shutdown
      </button> -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

const keyCodesUsed = [
  'ArrowUp',
  'ArrowLeft',
  'ArrowDown',
  'ArrowRight',
  'Numpad0',
  'Space',
  'KeyG',
  'KeyH',
  'KeyJ',
  'KeyK',
  'KeyL',
];

export default {
  computed: {
    ...mapState('app', ['isReady']),
    ...mapState('setup', ['programs', 'selectedProgram']),

    program: {
      get() {
        return this.selectedProgram;
      },

      set(value) {
        this.$store.commit('setup/SET_SELECTED_PROGRAM', value);
      },
    },
  },

  methods: {
    onStartClick() {
      if (!Number.isNaN(this.selectedProgram.id)) {
        this.$socket.emit('start', this.selectedProgram.id);
      }
    },

    onRestartClick() {
      this.$socket.emit('restart');
      this.$store.commit('setup/SET_SELECTED_PROGRAM', {});
    },

    onStopClick() {
      this.$socket.emit('stop');
      this.$store.commit('setup/SET_SELECTED_PROGRAM', {});
    },

    onRebootClick() {
      this.$socket.emit('reboot');
    },

    onShutdownClick() {
      this.$socket.emit('shutdown');
    },

    onKey(event) {
      const { type, code } = event;

      if (keyCodesUsed.includes(code)) {
        event.preventDefault();

        if (type === 'keyup') {
          this.$socket.emit(code);
        }
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

.controls__button {
  margin: 0 5px 0 0;
  padding: 5px 10px;
  outline: 0;
  cursor: pointer;
  -webkit-appearance: none;

  &:disabled {
    opacity: 0.5;
  }

  &:last-child {
    margin: 0;
  }

  &--start {
    border-color: #c3e6cb;
    background: #d4edda;
    color: #155724;
  }

  &--restart {
    border-color: #ffeeba;
    background: #fff3cd;
    color: #856404;
  }

  &--stop {
    border-color: #ffeeba;
    background: #fff3cd;
    color: #856404;
  }

  &--reboot {
    border-color: #f8d7da;
    background: #facfb2;
    color: #721c24;
  }

  &--shutdown {
    border-color: #f8d7da;
    background: #f5c6cb;
    color: #721c24;
  }
}
</style>
