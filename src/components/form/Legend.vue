<template>
  <legend class="form__legend">
    {{ label }}
  </legend>
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
.form__legend {
  font-weight: bold;
  margin: 0 0 10px 0;
}
</style>
