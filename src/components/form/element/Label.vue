<template>
  <label class="form__element__label">
    {{ label }}
  </label>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.form__element__label {
  display: block;
  margin: 0 0 5px 0;
}
</style>
