<template>
  <div v-bind:class="classNames">
    <slot />
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import modifiers from '@/utils/modifiers';

const props = defineProps(['modifiers']);
const classNames = modifiers('header__module', props.modifiers);
</script>

<style scoped lang="scss">
.header__module {
  display: flex;
  margin: 0 0 10px 0;
  padding: 0 20px;
  height: 100%;
  border-right: 1px solid #ccc;
  align-items: center;

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    margin: 0;
    border: 0;
  }

  &--controls {
    @media(max-width: 767px) {
      padding: 0;
      border: 0;
    }
  }
}
</style>
