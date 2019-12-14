const mutations = {
  SET_SELECTED_ARENA(state, arena) {
    state.selectedArena = arena;
    window.localStorage.setItem('selected_arena', JSON.stringify(state.selectedArena));
  },
};

export default mutations;
