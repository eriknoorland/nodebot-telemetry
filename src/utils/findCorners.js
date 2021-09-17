import { intersect } from 'mathjs';

const inRange = (value, min, max) => value >= min && value <= max;

// eslint-disable-next-line
const calculateDistance = ({ x: x1, y: y1 }, { x: x2, y: y2 }) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

const findCorners = (lines) => {
  const corners = lines.reduce((acc, line, index, array) => {
    array
      .filter((l, otherIndex) => otherIndex > index)
      .forEach((otherLine) => {
        const intersection = intersect(
          [line.x1, line.y1],
          [line.x2, line.y2],
          [otherLine.x1, otherLine.y1],
          [otherLine.x2, otherLine.y2],
        );

        // intersection angle between two lines is ~90deg
        // https://discuss.codechef.com/t/how-to-find-angle-between-two-lines/14516/2
        const angleLine = Math.atan((line.y2 - line.y1) / (line.x2 - line.x1)) * 180 / Math.PI;
        const angleOtherLine = Math.atan((otherLine.y2 - otherLine.y1) / (otherLine.x2 - otherLine.x1)) * 180 / Math.PI; // eslint-disable-line
        const angleDiff = Math.abs(angleLine - angleOtherLine);

        if (intersection && inRange(angleDiff, 89, 91)) {
          const newCorner = {
            x: intersection[0],
            y: intersection[1],
          };

          const closeCorner = acc.find(corner => calculateDistance(newCorner, corner) < 20);

          if (!closeCorner) {
            acc.push(newCorner);
          }
        }
      });

    return acc;
  }, []);

  return corners;
};

export default findCorners;
