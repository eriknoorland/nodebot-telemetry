<template>
  <div
    id="app"
    v-bind:class="{
      'app': true,
      'app--disconnected': !isConnected,
    }"
  >
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
import { mapState } from 'vuex';
import NavBar from '@/components/header/NavBar.vue';
import HeaderModule from '@/components/header/Module.vue';
import Battery from '@/components/header/modules/Battery.vue';
import FPS from '@/components/header/modules/FPS.vue';
import Controls from '@/components/header/modules/Controls.vue';
import EventBus from '@/EventBus';

export default {
  components: {
    NavBar,
    HeaderModule,
    Battery,
    FPS,
    Controls,
  },

  computed: {
    ...mapState('app', ['isConnected']),
    ...mapState('setup', ['selectedArena', 'sensors', 'name']),
  },

  watch: {
    selectedArena(newValue) {
      this.$socket.emit('selected_arena', newValue);
    },
  },

  mounted() {
    EventBus.$on('reset', () => {
      this.$socket.emit('selected_arena', this.selectedArena);
    });
  },
};
</script>

<style lang="scss">
@import "./scss/base.scss";

.app {
  &--disconnected {
    &:before {
      content: "";
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: rgba(#000, .85);
      z-index: 1;
    }

    &:after {
      display: flex;
      align-items: center;
      justify-content: center;
      content: "Disconnected from server";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      font-size: 20px;
      color: #fff;
      z-index: 2;
    }
  }
}

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
