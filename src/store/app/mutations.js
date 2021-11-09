const mutations = {
  SOCKET_connect(state) {
    state.isConnected = true;
  },

  SOCKET_disconnect(state) {
    state.isConnected = false;
    state.isReady = false;
  },

  SOCKET_ready(state) {
    state.isReady = true;
  }
};

export default mutations;
