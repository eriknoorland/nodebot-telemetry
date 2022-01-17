const mutations = {
  SOCKET_data(state, { fps, imu, lidar, line, odomPoses, imuPoses, poses }) {
    state.fps = fps;
    state.imu = imu;
    state.imuPoses = imuPoses;
    state.line = line;
    state.lidar = lidar;
    state.odomPoses = odomPoses;
    state.poses = poses;
  },
};

export default mutations;
