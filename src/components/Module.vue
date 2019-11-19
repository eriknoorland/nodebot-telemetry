<template>
  <div
    class="module"
    v-bind:class="modifiers"
  >
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    modifiers: {
      type: String,
      default: '',
    },
  },
};
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
  }
}
</style>
