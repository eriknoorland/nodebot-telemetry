import mutations from './mutations';

const state = {
  arenas: [
    {
      name: 'HCC Robotica (3600x2400:1)',
      width: 3564,
      height: 2364,
      scale: 1,
    },
  ],
  selectedArena: {},
  programs: [],
  selectedProgram: {},
  sensors: [],
  name: '',
};

export default {
  namespaced: true,
  state,
  mutations,
};
