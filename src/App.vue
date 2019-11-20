<template>
  <div id="app">
    <header class="header">
      <navBar />

      <div class="header__modules">
        <header-module>
          <div class="header__logo">
            {{ name }}
          </div>
        </header-module>

        <header-module v-if="sensors.includes('battery')">
          <battery />
        </header-module>

        <header-module>
          <FPS />
        </header-module>

        <header-module modifiers="header__module--controls">
          <controls />
        </header-module>
      </div>
    </header>

    <router-view />
  </div>
</template>

<script>
import NavBar from '@/components/header/NavBar.vue';
import HeaderModule from '@/components/header/Module.vue';
import Battery from '@/components/header/modules/Battery.vue';
import FPS from '@/components/header/modules/FPS.vue';
import Controls from '@/components/header/modules/Controls.vue';

export default {
  components: {
    NavBar,
    HeaderModule,
    Battery,
    FPS,
    Controls,
  },

  data() {
    return {
      name: '',
      sensors: [],
    };
  },

  sockets: {
    setup({ sensors, name }) {
      this.name = name;
      this.sensors = sensors;
    },
  },
};
</script>

<style lang="scss">
@import "./scss/base.scss";

.header__modules {
  display: flex;
  padding: 10px;
  height: auto;
  background: #fff;
  align-items: center;
  flex-wrap: wrap;

  @media(min-width: 768px) {
    padding: 10px 20px;
    height: 50px;
  }
}

.header__logo {
  font-size: 15px;
  font-weight: bold;
  color: #303030;
}
</style>
