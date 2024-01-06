<template>
  <div class="fps">
    FPS {{ props.data.actual.toFixed(0) }} / {{ props.data.target }}
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps(['data']);
</script>
