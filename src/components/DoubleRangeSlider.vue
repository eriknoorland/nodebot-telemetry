<template>
  <div class="content">
    <div
      ref="slider"
      v-bind:se-min="minThreshold"
      v-bind:se-step="step"
      v-bind:se-min-value="min"
      v-bind:se-max-value="max"
      v-bind:se-max="maxThreshold"
      class="slider"
    >
      <div class="slider-touch-left">
        <span />
      </div>

      <div class="slider-touch-right">
        <span />
      </div>

      <div class="slider-line">
        <span />
      </div>
    </div>
  </div>
</template>

<script>
import ZbRangeSlider from '@/3rdparty/ZbRangeSlider';

export default {
  props: {
    minThreshold: {
      type: Number,
      default: -100,
    },

    maxThreshold: {
      type: Number,
      default: 100,
    },

    step: {
      type: Number,
      default: 1,
    },

    min: {
      type: Number,
      required: true,
    },

    max: {
      type: Number,
      required: true,
    }
  },

  data() {
    return {
      instance: undefined,
    };
  },

  mounted() {
    this.instance = new ZbRangeSlider(this.$refs.slider);
    this.instance.onChange = (min, max) => this.updateValues(min, max);
  },


  methods: {
    updateValues(min, max) {
      this.$emit('update:min', min);
      this.$emit('update:max', max);
      this.$emit('update', { min, max });
    }
  }
}
</script>

<style lang="scss" scoped>
.slider {
  display: block;
  position: relative;
  height: 36px;
  width: 100%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}
.slider .slider-touch-left,
.slider .slider-touch-right {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  display: block;
  position: absolute;
  height: 36px;
  width: 36px;
  padding: 6px;
  z-index: 2;
}
.slider .slider-touch-left span,
.slider .slider-touch-right span {
  display: block;
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  border: 1px solid #a4a4a4;
  border-radius: 50%;
}
.slider .slider-line {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  position: absolute;
  width: calc(100% - 36px);
  left: 18px;
  top: 16px;
  height: 4px;
  border-radius: 4px;
  background: #f0f0f0;
  z-index: 0;
  overflow: hidden;
}
.slider .slider-line span {
  display: block;
  height: 100%;
  width: 0%;
  background: orange;
}
</style>