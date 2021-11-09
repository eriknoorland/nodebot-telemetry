import mutations from './mutations';

const state = {
  isConnected: false,
  isReady: false,
};

export default {
  namespaced: true,
  state,
  mutations,
};
