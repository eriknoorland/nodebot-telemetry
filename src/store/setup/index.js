import mutations from './mutations';

const state = {
  arenas: [
    {
      name: 'HCC Robotica (3600x2400:1)',
      width: 3600,
      height: 2400,
      scale: 1,
    },
    // {
    //   name: 'Home (1800x1200:2)',
    //   width: 1800,
    //   height: 1200,
    //   scale: 2,
    // },
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
