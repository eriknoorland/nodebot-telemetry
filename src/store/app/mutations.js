const mutations = {
  SOCKET_connect(state) {
    state.isConnected = true;
  },

  SOCKET_disconnect(state) {
    state.isConnected = false;
  },
};

export default mutations;
