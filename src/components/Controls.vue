<template>
  <div class="controls">
    <select
      class="controls__select"
      v-model="selectedProgram"
    >
      <option
        v-bind:value="null"
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
        v-bind:disabled="!isReady || !selectedProgram"
        v-on:click="$emit('onStartClick', selectedProgram.id)"
      >
        Start
      </button>

      <button
        class="controls__button controls__button--stop"
        v-bind:disabled="!isReady"
        v-on:click="$emit('onStopClick')"
      >
        Stop
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineModel, onMounted } from 'vue';
import { socket } from '@/socket';

defineEmits(['onStartClick', 'onStopClick']);

const props = defineProps(['isReady', 'programs']);
const selectedProgram = defineModel();
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

const programs = props.programs.map((program, index) => ({
  id: index,
  ...program,
}));

function handleKeyUpDown(event) {
  const { type, code } = event;

  if (keyCodesUsed.includes(code)) {
    event.preventDefault();

    if (type === 'keyup') {
      socket.emit(code);
    }
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleKeyUpDown);
  document.addEventListener('keyup', handleKeyUpDown);
});
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
