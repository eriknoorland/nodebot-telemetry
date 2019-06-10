<template>
  <div class="panel">
    <form name="measurements" class="form">
      <fieldset class="form__fieldset">
        <legend class="form__legend">
          Dimensions (mm)
        </legend>

        <div class="form__element">
          <label class="form__element__label">
            Wheel radius
          </label>

          <input
            type="number"
            class="form__element__input"
            v-model="settings.dimensions.wheelRadius"
          >
        </div>

        <div class="form__element">
          <label class="form__element__label">
            Wheel base
          </label>

          <input
            type="number"
            class="form__element__input"
            v-model="settings.dimensions.wheelBase"
          >
        </div>
      </fieldset>

      <fieldset class="form__fieldset">
        <legend class="form__legend">
          Speed (mm/s)
        </legend>

        <div class="form__element">
          <label class="form__element__label">
            Straight line speed slow
          </label>

          <input
            type="number"
            class="form__element__input"
            v-model="settings.speed.straightLine.slow"
          >
        </div>

        <div class="form__element">
          <label class="form__element__label">
            Straight line speed fast
          </label>

          <input
            type="number"
            class="form__element__input"
            v-model="settings.speed.straightLine.fast"
          >
        </div>

        <div class="form__element">
          <label class="form__element__label">
            Turning speed
          </label>

          <input
            type="number"
            class="form__element__input"
            v-model="settings.speed.turning"
          >
        </div>

        <div class="form__element">
          <label class="form__element__label">
            Rotation speed
          </label>

          <input
            type="number"
            class="form__element__input"
            v-model="settings.speed.rotation"
          >
        </div>
      </fieldset>

      <fieldset class="form__fieldset">
        <legend class="form__legend">
          Arena
        </legend>

        <div class="form__element">
          <label class="form__element__label">
            Scale factor
          </label>

          <input
            type="number"
            class="form__element__input"
            v-model="settings.arena.scale"
          >
        </div>

        <div class="form__element">
          <label class="form__element__label">
            Grid size (mm)
          </label>

          <input
            type="number"
            class="form__element__input"
            v-model="settings.arena.gridSize"
          >
        </div>
      </fieldset>

      <div class="form__element">
        <button class="form__element__submit" v-on:click.prevent="onSaveClick()">
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import http from '@/http';

export default {
  name: 'Settings',

  data() {
    return {
      settings: {
        dimensions: {
          wheelRadius: 45,
          wheelBase: 206,
        },
        speed: {
          straightLine: {
            slow: 10,
            fast: 20,
          },
          turning: 10,
          rotation: 10,
        },
        arena: {
          scale: 1,
          gridSize: 50,
        },
      },
    };
  },

  methods: {
    onSettingsData(data) {
      this.settings = data;
    },

    onSaveClick() {
      http.put(`${process.env.VUE_APP_API_URL}/v1/settings`, this.settings);
    },
  },

  mounted() {
    // http.get(`${process.env.VUE_APP_API_URL}/v1/settings`)
    //   .then(onSettingsData);
  },
};
</script>

<style lang="scss">
.panel {
  background: #fff;
  margin: 10px;
  padding: 20px;
}
</style>
