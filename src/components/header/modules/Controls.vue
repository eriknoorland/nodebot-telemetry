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
        -- Select program --
      </option>

      <option
        v-for="program in programs"
        v-bind:key="program.id"
        v-bind:value="program"
        v-bind:disabled="program.module === null"
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

      <button
        class="controls__button controls__button--stop"
        v-bind:disabled="!isReady"
        v-on:click="onStopClick"
      >
        Stop
      </button>
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

    onStopClick() {
      this.$socket.emit('stop');
      this.$store.commit('setup/SET_SELECTED_PROGRAM', {});
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

  &--stop {
    border-color: #ffeeba;
    background: #fff3cd;
    color: #856404;
  }
}
</style>
