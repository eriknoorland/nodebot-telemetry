import Vue from 'vue';
import Vuex from 'vuex';
import EventBus from '@/EventBus';
import app from './app';
import setup from './setup';
import log from './log';
import sensors from './sensors';

import battery from './battery'; // FIXME ?
import localization from './localization'; // FIXME what poses to use?
import odometry from './odometry'; // FIXME need delta to be able to show graphs

Vue.use(Vuex);

export default new Vuex.Store({
  mutations: {
    SOCKET_connect() {
      EventBus.$emit('reset');
    },
  },

  modules: {
    app,
    battery,
    log,
    localization,
    setup,
    odometry,
    sensors,
  },
});
