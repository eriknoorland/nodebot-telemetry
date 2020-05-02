const mutations = {
  SOCKET_log(state, log) {
    state.log = log
      .split(',')
      .reverse()
      .join('\n');
  },

  SOCKET_disconnect(state) {
    state.log = [
      '<span style="color: #f92472;">[app] server disconnected</span>',
      state.log,
    ].join('\n');
  },
};

export default mutations;
