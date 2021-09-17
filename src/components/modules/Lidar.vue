<template>
  <div class="lidar">
    <canvas ref="canvas" class="lidar__canvas" />

    <span class="lidar__heading">
      {{ heading }}°
    </span>

    <label class="lidar__houghLines">
      <input
        type="checkbox"
        v-model="visualizeHoughLines"
      >

      Visualize Hough Lines

      <!-- <span v-if="numHoughLinesFound">
        &nbsp;{{ parseInt(startVector, 10) }}°
      </span> -->
    </label>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import EventBus from '@/EventBus';
import degreesToRadians from '@/utils/degreesToRadians';
import houghTransform from '@/utils/houghTransform';
import findCorners from '@/utils/findCorners';

export default {
  data() {
    return {
      canvas: null,
      context: null,
      centerX: 0,
      centerY: 0,
      heading: 0,
      visualizeHoughLines: false,
      numHoughLinesFound: 0,
      startVector: 0,
      houghLinesTimeout: null,
      lidarData: {},
    };
  },

  computed: {
    ...mapState('setup', ['selectedArena']),
    ...mapState('lidar', ['lidar', 'imu']),
  },

  watch: {
    imu(value) {
      if (value) {
        this.heading = value.heading || 0;
      }
    },

    lidar(data) {
      if (this.visualizeHoughLines) {
        Object
          .keys(data)
          .forEach((angle) => {
            if (!this.lidarData[angle]) {
              this.lidarData[angle] = [];
            }

            this.lidarData[angle].push(data[angle]);
          });

        return;
      }

      this.clearCanvas();
      this.drawSurroundings(data);
      this.drawDistanceCircles();
      this.drawLine(this.heading, '#f00');
      this.drawMe();
    },

    visualizeHoughLines(value) {
      if (value) {
        this.houghLinesTimeout = setTimeout(this.houghLines, 1000);
      } else {
        clearTimeout(this.houghLinesTimeout);
        this.lidarData = {};
        this.numHoughLinesFound = 0;
      }
    },
  },

  mounted() {
    const { canvas } = this.$refs;

    this.context = canvas.getContext('2d');

    canvas.setAttribute('width', canvas.clientWidth);
    canvas.setAttribute('height', canvas.clientWidth);

    this.centerX = canvas.width * 0.5;
    this.centerY = canvas.height * 0.5;

    EventBus.$on('reset', this.clearCanvas);
  },

  beforeDestroy() {
    clearTimeout(this.houghLinesTimeout);
  },

  methods: {
    clearCanvas() {
      const { canvas } = this.$refs;

      this.context.clearRect(0, 0, canvas.width, canvas.height);
    },

    drawMe() {
      this.context.fillStyle = '#f00';
      this.context.strokeStyle = '#f00';

      this.context.fillRect(this.centerX - 2, this.centerY - 2, 4, 4);
      this.context.beginPath();
      this.context.arc(this.centerX, this.centerY, 6, 0, 2 * Math.PI);
      this.context.stroke();
    },

    drawDistanceCircles() {
      const distanceCircles = [20, 40, 60, 80, 100, 120, 140, 160, 180]; // cm radius

      this.context.strokeStyle = '#ccc';

      distanceCircles.forEach((distance) => {
        this.context.beginPath();
        this.context.arc(this.centerX, this.centerY, distance, 0, 2 * Math.PI);
        this.context.stroke();
      });

      this.context.beginPath();
      this.context.moveTo(this.centerX, this.centerY);
      this.context.lineTo((this.centerX * 2) - 10, this.centerY);
      this.context.stroke();
    },

    drawSurroundings(data) {
      Object.keys(data).forEach((angle) => {
        const distance = data[angle];

        if (distance < 120) {
          return;
        }

        const distanceInCm = distance / 10;
        const angleInRadians = degreesToRadians(parseInt(angle, 10));
        const posX = Math.cos(angleInRadians) * distanceInCm;
        const posY = Math.sin(angleInRadians) * distanceInCm;

        this.context.fillStyle = '#000';
        this.context.fillRect(this.centerX + posX, this.centerY + posY, 3, 3);
      });
    },

    drawLine(angle = 0, color = '#ccc') {
      const posX = this.centerX + ((this.centerX - 10) * Math.cos(degreesToRadians(angle)));
      const posY = this.centerY + ((this.centerY - 10) * Math.sin(degreesToRadians(angle)));

      this.context.lineWidth = 2;
      this.context.strokeStyle = color;
      this.context.beginPath();
      this.context.moveTo(this.centerX, this.centerY);
      this.context.lineTo(posX, posY);
      this.context.stroke();
    },

    drawHoughLine({ x1, y1, x2, y2 }) {
      const { canvas } = this.$refs;

      this.context.beginPath();
      this.context.strokeStyle = 'rgba(0, 255, 0, 0.25)';
      this.context.moveTo(x1 + canvas.width / 2, y1 + canvas.height / 2);
      this.context.lineTo(x2 + canvas.width / 2, y2 + canvas.height / 2);
      this.context.stroke();
      this.context.strokeStyle = 'rgba(0, 0, 0, 1)';
      this.context.closePath();
    },

    drawIntersection({ x, y }) {
      this.context.fillStyle = 'rgba(255, 0, 255, 1)';
      this.context.fillRect(x - 6, y - 6, 12, 12);
    },

    averageMeasurements(measurements) {
      const sum = (acc, value) => (acc + value);

      return Object
        .keys(measurements)
        .reduce((acc, angle) => {
          const m = measurements[angle];
          const total = m.reduce(sum, 0);
          const average = Math.floor(total / m.length);

          acc[angle] = average;

          return acc;
        }, {});
    },

    houghLines() {
      const { canvas } = this.$refs;
      const data = { ...this.lidarData };
      const averagedLidarData = this.averageMeasurements(data);
      const threshold = this.selectedArena.width * 0.75;

      const lidarData = Object
        .keys(averagedLidarData)
        .reduce((acc, angle) => {
          const distance = averagedLidarData[angle];

          if (distance < threshold) {
            acc[angle] = distance;
          }

          return acc;
        }, {});

      const size = canvas.width * 2;
      const lines = houghTransform(size, size, lidarData, 50, 20);

      this.numHoughLinesFound = lines.length;

      this.clearCanvas();
      this.drawSurroundings(lidarData);
      this.drawDistanceCircles();
      this.drawLine(this.heading, '#f00');
      this.drawMe();

      lines.forEach(this.drawHoughLine);

      const corners = findCorners(lines, this.centerX);
      console.log(corners.length);

      corners.forEach(({ x, y }) => {
        this.drawIntersection({ x: this.centerX + x, y: this.centerY + y });
      });

      // if (corners.length === 2) {
      //   const angle = this.getAngleBetweenCoordinates(corners[0], corners[1]) - (Math.PI / 2);

      //   this.startVector = this.rad2deg(angle);
      // }
    },

    rad2deg(rad) {
      return rad * (180 / Math.PI);
    },

    getAngleBetweenCoordinates({ x: x1, y: y1 }, { x: x2, y: y2 }) {
      return Math.atan2(y2 - y1, x2 - x1);
    },
  },
};
</script>

<style>
.lidar__canvas {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
}

.lidar__heading {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 12px;
}

.lidar__houghLines {
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 10px;
  left: 10px;
}
</style>
