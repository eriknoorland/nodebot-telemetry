const houghTransform = (canvasWidth, canvasHeight, lidarData, numAngleCells, minNumLinePoints) => {
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;
  const rhoMax = Math.sqrt((canvasWidth ** 2) + (canvasHeight ** 2));
  const cosTable = new Array(numAngleCells);
  const sinTable = new Array(numAngleCells);
  const accum = new Array(numAngleCells);

  // eslint-disable-next-line
  for (let theta = 0, thetaIndex = 0; thetaIndex < numAngleCells; theta += Math.PI / numAngleCells, thetaIndex += 1) {
    cosTable[thetaIndex] = Math.cos(theta);
    sinTable[thetaIndex] = Math.sin(theta);
  }

  function deg2rad(deg) {
    return deg / (180 / Math.PI);
  }

  function mapLidarData2Points(angle) {
    const distance = lidarData[angle];
    const distanceInCm = distance / 10;
    const angleInRadians = deg2rad(parseInt(angle, 10));
    const x = centerX + (Math.cos(angleInRadians) * distanceInCm);
    const y = centerY + (Math.sin(angleInRadians) * distanceInCm);

    return { x, y };
  }

  function findLines(minNumPoints) {
    const peaks = [];

    for (let theta = 0; theta < accum.length; theta += 1) {
      for (let rho = 0; rho < accum[theta].length; rho += 1) {
        if (accum[theta][rho] > minNumPoints) {
          peaks.push({ rho, theta });
        }
      }
    }

    const lines = peaks.map(({ rho, theta }) => {
      // eslint-disable-next-line
      rho <<= 1;
      // eslint-disable-next-line
      rho -= rhoMax;

      const a = cosTable[theta];
      const b = sinTable[theta];
      const x1 = a * rho + 100 * (-b);
      const y1 = (b * rho + 100 * (a));
      const x2 = a * rho - 100 * (-b);
      const y2 = (b * rho - 100 * (a));

      return { x1, y1, x2, y2 };
    });

    return lines;
  }

  function houghAcc({ x, y }) {
    // eslint-disable-next-line
    x -= canvasWidth / 2;
    // eslint-disable-next-line
    y -= canvasHeight / 2;

    for (let thetaIndex = 0; thetaIndex < numAngleCells; thetaIndex += 1) {
      let rho = rhoMax + x * cosTable[thetaIndex] + y * sinTable[thetaIndex];
      // eslint-disable-next-line
      rho >>= 1;

      if (!accum[thetaIndex]) {
        accum[thetaIndex] = [];
      }

      if (!accum[thetaIndex][rho]) {
        accum[thetaIndex][rho] = 1;
      } else {
        accum[thetaIndex][rho] += 1;
      }
    }
  }

  const points = Object
    .keys(lidarData)
    .map(mapLidarData2Points);

  points.forEach(houghAcc);

  return findLines(minNumLinePoints);
};

export default houghTransform;
