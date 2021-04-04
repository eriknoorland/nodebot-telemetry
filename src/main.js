import Vue from 'vue';
import VueSocketIO from 'vue-socket.io';
import App from './App.vue';
import router from './router';
import store from './store';

const defaultArena = store.state.setup.arenas[0];
const selectedArena = window.localStorage.getItem('selected_arena');

Vue.use(new VueSocketIO({
  connection: process.env.VUE_APP_SOCKETIO_HOST,
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_',
  },
}));

Vue.config.productionTip = false;

store.commit('setup/SET_SELECTED_ARENA', selectedArena ? JSON.parse(selectedArena) : defaultArena);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
