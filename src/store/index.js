import Vue from 'vue';
import Vuex from 'vuex';
import EventBus from '@/EventBus';
import battery from './battery';
import fps from './fps';
import log from './log';
import localization from './localization';
import lidar from './lidar';
import line from './line';
import setup from './setup';
import odometry from './odometry';

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
    line,
    setup,
    odometry,
  },
});
