<template>
  <div class="lidar">
    <canvas ref="canvas" class="lidar__canvas"></canvas>
    <span class="lidar__heading">{{ heading }}°</span>
  </div>
</template>

<script>
import degreesToRadians from '@/utils/degreesToRadians';

export default {
  data() {
    return {
      canvas: null,
      context: null,
      centerX: 0,
      centerY: 0,
      heading: 0,
    };
  },

  sockets: {
    data({ lidar, imu }) {
      const { heading } = imu;

      this.heading = heading || 0;
      this.clearCanvas();
      this.drawSurroundings(lidar);
      this.drawDistanceCircles();
      this.drawLine(heading, '#f00');
      this.drawMe();
    },
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
      this.context.lineTo(this.centerX, 10);
      this.context.stroke();
    },

    drawSurroundings(data) {
      Object.keys(data).forEach((angle) => {
        const distance = data[angle];

        if (distance < 120) {
          return;
        }

        const distanceInCm = distance / 10;
        const angleInRadians = degreesToRadians(parseInt(angle - 90, 10));
        const posX = Math.cos(angleInRadians) * distanceInCm;
        const posY = Math.sin(angleInRadians) * distanceInCm;

        this.context.fillStyle = '#000';
        this.context.fillRect(this.centerX + posX, this.centerY + posY, 3, 3);
      });
    },

    drawLine(angle = 0, color = '#ccc') {
      const posX = this.centerX + ((this.centerX - 10) * Math.cos(degreesToRadians(angle - 90)));
      const posY = this.centerY + ((this.centerY - 10) * Math.sin(degreesToRadians(angle - 90)));

      this.context.lineWidth = 2;
      this.context.strokeStyle = color;
      this.context.beginPath();
      this.context.moveTo(this.centerX, this.centerY);
      this.context.lineTo(posX, posY);
      this.context.stroke();
    },
  },

  mounted() {
    const { canvas } = this.$refs;

    this.context = canvas.getContext('2d');

    canvas.setAttribute('width', canvas.clientWidth);
    canvas.setAttribute('height', canvas.clientWidth);

    this.centerX = canvas.width * 0.5;
    this.centerY = canvas.height * 0.5;
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
</style>
