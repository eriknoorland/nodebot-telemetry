import Vue from 'vue';
import Vuex from 'vuex';
import EventBus from '@/EventBus';
import battery from './battery';
import fps from './fps';
import log from './log';
import localization from './localization';
import lidar from './lidar';
import setup from './setup';
import speed from './speed';

Vue.use(Vuex);

export default new Vuex.Store({
  mutations: {
    SOCKET_connect() {
      EventBus.$emit('reset');
    },
  },

  modules: {
    battery,
    fps,
    log,
    localization,
    lidar,
    setup,
    speed,
  },
});
