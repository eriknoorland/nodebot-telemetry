import mutations from './mutations';

const state = {
  fps: {},
  imuPoses: [],
  imu: {},
  line: [],
  lidar: {},
  odomPoses: [],
  odomTicksLeft: 0,
  odomTicksRight: 0,
};

export default {
  namespaced: true,
  state,
  mutations,
};
