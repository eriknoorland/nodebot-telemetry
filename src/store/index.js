import { createStore } from 'vuex';
import EventBus from '@/EventBus';
import app from './app';
import setup from './setup';
import sensors from './sensors';

import localization from './localization'; // FIXME what poses to use?
import odometry from './odometry'; // FIXME need delta to be able to show graphs

export default createStore({
  mutations: {
    SOCKET_connect() {
      EventBus.emit('reset');
    },
  },

  modules: {
    app,
    localization,
    setup,
    odometry,
    sensors,
  },
});
