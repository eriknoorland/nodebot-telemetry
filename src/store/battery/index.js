import mutations from './mutations';

const state = {
  minVoltage: 3.2,
  minThresholdVoltage: 3.6,
  maxVoltage: 4.2,
  numCells: 0,
  voltage: 0,
};

export default {
  namespaced: true,
  state,
  mutations,
};
