<template>
  <div class="lidar">
    <canvas ref="canvas" class="lidar__canvas"></canvas>
    <span class="lidar__heading">{{ heading }}°</span>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import EventBus from '@/EventBus';
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

  computed: {
    ...mapState('lidar', ['lidar', 'imu']),
  },

  watch: {
    imu(value) {
      if (value) {
        this.heading = value.heading || 0;
      }
    },

    lidar(value) {
      this.clearCanvas();
      this.drawSurroundings(value);
      this.drawDistanceCircles();
      this.drawLine(this.heading, '#f00');
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
      const distanceCircles = [0, 20, 40, 60, 80, 100, 120, 140, 160, 180]; // cm radius

      distanceCircles.forEach((distance) => {
        this.context.strokeStyle = '#eee';
        this.context.beginPath();
        this.context.moveTo(0, this.centerY + distance);
        this.context.lineTo(this.centerX * 2, this.centerY + distance);
        this.context.stroke();

        this.context.strokeStyle = '#ccc';

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
