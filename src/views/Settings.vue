<template>
  <panel>
    <v-form name="arena">
      <v-fieldset>
        <v-legend label="Arena" />

        <form-element>
          <select
            v-model="selectedArena"
            v-on:change="$store.commit('SET_SELECTED_ARENA', selectedArena)"
          >
            <option
              v-for="(arena, index) in $store.state.arenas"
              v-bind:key="index"
              v-bind:value="arena"
            >
              {{ arena.name }}
            </option>
          </select>
        </form-element>
      </v-fieldset>
    </v-form>
  </panel>

  <!-- <div class="panel">
    <form name="measurements" class="form">
      <v-fieldset>
        <v-legend label="Dimensions (mm)" />

        <form-element>
          <label class="form__element__label">
            Wheel radius
          </label>

          <input
            type="number"
            class="form__element__input"
            v-model="settings.dimensions.wheelRadius"
          >
        </form-element>

        <form-element>
          <label class="form__element__label">
            Wheel base
          </label>

          <input
            type="number"
            class="form__element__input"
            v-model="settings.dimensions.wheelBase"
          >
        </form-element>
      </v-fieldset>

      <v-fieldset>
        <v-legend label="Speed (mm/s)" />

        <form-element>
          <label class="form__element__label">
            Straight line speed slow
          </label>

          <input
            type="number"
            class="form__element__input"
            v-model="settings.speed.straightLine.slow"
          >
        </form-element>

        <form-element>
          <label class="form__element__label">
            Straight line speed fast
          </label>

          <input
            type="number"
            class="form__element__input"
            v-model="settings.speed.straightLine.fast"
          >
        </form-element>

        <form-element>
          <label class="form__element__label">
            Turning speed
          </label>

          <input
            type="number"
            class="form__element__input"
            v-model="settings.speed.turning"
          >
        </form-element>

        <form-element>
          <label class="form__element__label">
            Rotation speed
          </label>

          <input
            type="number"
            class="form__element__input"
            v-model="settings.speed.rotation"
          >
        </form-element>
      </v-fieldset>

      <v-fieldset>
        <v-legend label="Arena" />

        <form-element>
          <label class="form__element__label">
            Scale factor
          </label>

          <input
            type="number"
            class="form__element__input"
            v-model="settings.arena.scale"
          >
        </form-element>

        <form-element>
          <label class="form__element__label">
            Grid size (cm)
          </label>

          <input
            type="number"
            class="form__element__input"
            v-model="settings.arena.gridSize"
          >
        </form-element>
      </v-fieldset>

      <form-element>
        <button class="form__element__submit" v-on:click.prevent="onSaveClick()">
          Save
        </button>
      </form-element>
    </form>
  </div> -->
</template>

<script>
import Panel from '@/components/Panel.vue';
import vForm from '@/components/form/Form.vue';
import vFieldset from '@/components/form/Fieldset.vue';
import vLegend from '@/components/form/Legend.vue';
import FormElement from '@/components/form/element/Element.vue';
// import http from '@/http';

export default {
  components: {
    Panel,
    vForm,
    vFieldset,
    vLegend,
    FormElement,
  },

  data() {
    return {
      selectedArena: this.$store.state.selectedArena,
      // settings: {
      //   dimensions: {
      //     wheelRadius: 45,
      //     wheelBase: 206,
      //   },
      //   speed: {
      //     straightLine: {
      //       slow: 10,
      //       fast: 20,
      //     },
      //     turning: 10,
      //     rotation: 10,
      //   },
      // },
    };
  },

  mounted() {
    // http.get(`${process.env.VUE_APP_API_URL}/v1/settings`)
    //   .then(onSettingsData);
  },

  methods: {
    // onSettingsData(data) {
    //   this.settings = data;
    // },

    // onSaveClick() {
    //   http.put(`${process.env.VUE_APP_API_URL}/v1/settings`, this.settings);
    // },
  },
};
</script>
