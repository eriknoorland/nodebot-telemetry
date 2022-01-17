<template>
  <div
    id="app"
    class="app"
  >
    <header class="header">
      <nav class="header__nav">
        <router-link v-bind:to="{ name: 'dashboard' }" class="header__navLink">Dashboard</router-link> |
        <router-link v-bind:to="{ name: 'review' }" class="header__navLink">Review</router-link> |
        <router-link v-bind:to="{ name: 'line test' }" class="header__navLink">Line Test</router-link>
      </nav>

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
import HeaderModule from '@/components/header/Module.vue';
import Battery from '@/components/header/modules/Battery.vue';
import FPS from '@/components/header/modules/FPS.vue';
import Controls from '@/components/header/modules/Controls.vue';
import EventBus from '@/EventBus';

export default {
  components: {
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

.header__nav {
  display: block;
  padding: 10px;
  background: #333;
  color: #666;
}

.header__navLink {
  color: #fff;
  text-decoration: none;
  opacity: 0.5;

  &:hover {
    text-decoration: underline;
    opacity: 1;
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
