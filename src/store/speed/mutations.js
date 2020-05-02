const mutations = {
  SOCKET_data(state, { odometry }) {
    state.odometry = odometry;
  },
};

export default mutations;
