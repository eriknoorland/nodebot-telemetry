import Vue from 'vue';
import VueSocketIO from 'vue-socket.io';
import SocketIO from 'socket.io-client';
import App from './App.vue';
import router from './router';
import store from './store';

const socketConnection = SocketIO(import.meta.env.VITE_SOCKETIO_HOST);
const defaultArena = store.state.setup.arenas[0];

Vue.use(new VueSocketIO({
  connection: socketConnection,
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_',
  },
}));

Vue.config.productionTip = false;

store.commit('setup/SET_SELECTED_ARENA', defaultArena);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
