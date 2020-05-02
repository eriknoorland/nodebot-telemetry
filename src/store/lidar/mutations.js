const mutations = {
  SOCKET_data(state, { imu, lidar }) {
    state.imu = imu;
    state.lidar = lidar;
  },
};

export default mutations;
