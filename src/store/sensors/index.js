import mutations from './mutations';

const state = {
  imuPoses: [],
  imu: {},
  line: [],
  lidar: {},
  odomPoses: [],
  odomTicksLeft: 0,
  odomTicksRight: 0,
  poses: [],
};

export default {
  namespaced: true,
  state,
  mutations,
};
