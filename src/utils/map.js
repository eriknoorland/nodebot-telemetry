const map = (
  value,
  minIn,
  maxIn,
  minOut,
  maxOut,
) => (value - minIn) * (maxOut - minOut) / (maxIn - minIn) + minOut;

export default map;
