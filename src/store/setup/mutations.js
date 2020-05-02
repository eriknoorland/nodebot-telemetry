const mutations = {
  SET_SELECTED_ARENA(state, arena) {
    state.selectedArena = arena;
    window.localStorage.setItem('selected_arena', JSON.stringify(state.selectedArena));
  },

  SET_SELECTED_PROGRAM(state, program) {
    state.selectedProgram = program;
  },

  SOCKET_setup(state, { name, sensors, states }) {
    const programs = states.map((program, index) => ({
      id: index,
      ...program,
    }));

    state.name = name;
    state.sensors = sensors;
    state.programs = programs;
  },
};

export default mutations;
