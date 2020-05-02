const mutations = {
  SOCKET_data(state, { fps }) {
    state.actual = fps.actual;
    state.target = fps.target;
  },
};

export default mutations;
