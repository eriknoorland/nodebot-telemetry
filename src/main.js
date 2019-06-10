import Vue from 'vue';
import socketio from 'socket.io-client';
import VueSocketIO from 'vue-socket.io';
import App from './App.vue';
import router from './router';
import store from './store';

const SocketInstance = socketio(process.env.VUE_APP_SOCKETIO_HOST);

Vue.use(VueSocketIO, SocketInstance);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
