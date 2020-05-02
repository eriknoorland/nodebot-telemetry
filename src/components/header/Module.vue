<template>
  <div
    class="header__module"
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
