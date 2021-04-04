const mutations = {
  SOCKET_data(state, { odometry }) {
    state.ticks = odometry;
  },
};

export default mutations;
