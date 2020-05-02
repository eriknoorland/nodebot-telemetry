import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const state = {
  actual: 0,
  target: 0,
};

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
