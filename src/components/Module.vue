<template>
  <div v-bind:class="classNames">
    <slot />
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import modifiers from '@/utils/modifiers';

const props = defineProps(['modifiers']);
const classNames = modifiers('module', props.modifiers);
</script>

<style lang="scss" scoped>
.module {
  position: relative;
  margin: 10px 0 0 0;
  padding-top: 100%;
  width: 100%;
  height: 300px;
  background: #fff;

  &:last-child {
    margin-bottom: 10px;
  }

  &--padding {
    padding: 20px;
  }

  @media(min-width: 768px) {
    margin: 10px 0 0 10px;
    padding-top: 0;
    width: 400px;
    height: 400px;

    &--double {
      width: 810px;
    }

    &--triple {
      width: 1220px;
    }
  }
}
</style>
