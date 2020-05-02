const mutations = {
  SOCKET_data(state, { poses }) {
    state.poses = poses;
  },
};

export default mutations;
