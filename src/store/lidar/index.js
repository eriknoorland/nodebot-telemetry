import mutations from './mutations';

const state = {
  imu: {},
  lidar: {},
};

export default {
  namespaced: true,
  state,
  mutations,
};
