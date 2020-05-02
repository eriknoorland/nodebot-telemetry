const mutations = {
  SOCKET_data(state, { battery }) {
    if (!battery) {
      return;
    }

    const { voltage, numCells } = battery;

    state.numCells = numCells || 0;
    state.voltage = voltage || 0;
  },
};

export default mutations;
