<template>
  <div class="camera">
    <canvas
      ref="canvas"
      class="camera__canvas"
    ></canvas>
  </div>
</template>

<script>
import map from '../../utils/map';

export default {
  name: 'Camera',

  data() {
    return {
      canvas: null,
      context: null,
      centerX: 0,
      centerY: 0,
      heading: 0,
      frameWidth: 0,
      frameHeight: 0,
    };
  },

  sockets: {
    data({ camera }) {
      const { code, frameWidth, frameHeight, x0, y0, x1, y1 } = camera;

      if (code === 200) {
        this.frameWidth = frameWidth;
        this.frameHeight = frameHeight;
        return;
      }

      this.clearCanvas();

      if (x0 || y0 || x1 || y1) {
        this.drawLine(x0, y0, x1, y1);
      }
    },
  },

  methods: {
    clearCanvas() {
      const { canvas } = this.$refs;

      this.context.clearRect(0, 0, canvas.width, canvas.height);
    },

    drawLine(x0, y0, x1, y1) {
      const { canvas } = this.$refs;
      const startX = map(x0, 0, this.frameWidth, 0, canvas.clientWidth);
      const startY = map(y0, 0, this.frameHeight, 0, canvas.clientHeight);
      const endX = map(x1, 0, this.frameWidth, 0, canvas.clientWidth);
      const endY = map(y1, 0, this.frameHeight, 0, canvas.clientHeight);

      this.context.lineWidth = 20;
      this.context.strokeStyle = '#000';
      this.context.beginPath();
      this.context.moveTo(startX, startY);
      this.context.lineTo(endX, endY);
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
.camera__canvas {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
}
</style>
