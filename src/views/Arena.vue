<template>
  <div
    class="arenaContainer"
    v-bind:style="{
      '--scale': scale,
      '--resolution': `${matrixResolution}px`,
    }"
  >
    <div class="arena">
      <canvas
        ref="canvas"
        class="arena__canvas"
      />

      <div
        v-show="pose"
        v-bind:style="robotPoseCSS"
        class="arena__robot"
      />
    </div>

    <div
      v-if="pose"
      class="arena__position"
    >
      {{ pose.x.toFixed(0) }}, {{ pose.y.toFixed(0) }}<br />
      {{ (pose.phi * (180 / Math.PI)).toFixed(2) }}°
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import EventBus from '@/EventBus';
import degreesToRadians from '@/utils/degreesToRadians';

const scale = 1 / 3;
const matrixResolution = 30;

export default {
  data() {
    return {
      scale,
      matrixResolution,
      drawOffset: matrixResolution * scale,
      context: null,
      pose: null,
    };
  },

  computed: {
    ...mapState('setup', ['selectedArena']),
    ...mapState('localization', ['poses']),
    ...mapState('lidar', ['lidar']),

    robotPoseCSS() {
      const { x, y, phi } = this.pose || {};

      return {
        left: `${x * this.scale}px`,
        top: `${y * this.scale}px`,
        transform: `rotate(${phi}rad)`,
      };
    },
  },

  watch: {
    poses(poses) {
      poses.forEach((pose) => {
        const x = pose.x * this.scale;
        const y = pose.y * this.scale;

        this.context.fillStyle = '#000';
        this.context.fillRect(x, y, 1, 1);
        this.pose = pose;
      });
    },

    lidar(value) {
      this.draw(value);
    },
  },

  mounted() {
    const { canvas } = this.$refs;

    this.context = canvas.getContext('2d');

    canvas.setAttribute('width', canvas.clientWidth);
    canvas.setAttribute('height', canvas.clientHeight);

    this.drawArena();

    EventBus.$on('reset', () => {
      this.clearCanvas();
      this.drawArena();
    });
  },

  methods: {
    draw(lidarData) {
      this.clearCanvas();
      this.drawArena();
      this.drawLidarData(lidarData);
    },

    drawArena() {
      const { width, height } = this.selectedArena;
      const x0 = 0 + this.drawOffset;
      const x1 = (width * this.scale) / 3 + this.drawOffset;
      const x2 = x1 * 2 + this.drawOffset;
      const x3 = (width * this.scale) + this.drawOffset;
      const y0 = 0 + this.drawOffset;
      const y1 = (height * this.scale) / 2 + this.drawOffset;
      const y2 = (height * this.scale) + this.drawOffset;

      this.context.strokeStyle = '#05f';
      this.context.beginPath();
      this.context.moveTo(x1, y0);
      this.context.lineTo(x2, y0);
      this.context.lineTo(x2, y1);
      this.context.lineTo(x3, y1);
      this.context.lineTo(x3, y2);
      this.context.lineTo(x0, y2);
      this.context.lineTo(x0, y1);
      this.context.lineTo(x1, y1);
      this.context.lineTo(x1, y0);
      this.context.stroke();
    },

    drawLidarData(data) {
      if (this.pose) {
        const { x, y, phi } = this.pose;

        Object.keys(data).forEach((angle) => {
          const distance = data[angle];
          const angleInRadians = degreesToRadians(parseInt(angle, 10));
          const posX = (Math.cos(phi + angleInRadians) * distance) * this.scale;
          const posY = (Math.sin(phi + angleInRadians) * distance) * this.scale;

          this.context.fillStyle = '#000';
          this.context.fillRect(
            (x * this.scale) + posX + this.drawOffset,
            (y * this.scale) + posY + this.drawOffset,
            3,
            3,
          );
        });
      }
    },

    clearCanvas() {
      const { canvas } = this.$refs;

      this.context.clearRect(0, 0, canvas.width, canvas.height);
    },
  },
};
</script>

<style lang="scss" scoped>
  .arenaContainer {
    position: relative;
    margin: 2px auto;
    padding: calc(var(--resolution) * var(--scale));
    width: calc((3600px + (4 * var(--resolution))) * var(--scale));
    background: #fff;
  }

  .arena {
    position: relative;
    width: calc((3600px + (2 * var(--resolution))) * var(--scale));
    height: calc((2400px + (2 * var(--resolution))) * var(--scale));
    background-size: calc(var(--resolution) * var(--scale)) calc(var(--resolution) * var(--scale));
    background-image:
      linear-gradient(to right, #e1e1e1 1px, transparent 1px),
      linear-gradient(to bottom, #e1e1e1 1px, transparent 1px);
    overflow: hidden;
  }

  .arena__canvas {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .arena__position {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 15px;
    line-height: 1.4;
    background: #fff;
  }

  .arena__robot {
    position: absolute;

    &:after {
      content: "";
      position: absolute;
      top: calc((-204px / 2) * var(--scale));
      left: calc((-204px / 2) * var(--scale));
      width: calc(204px * var(--scale));
      height: calc(204px * var(--scale));
      background: url("../assets/img/robot.png") 0 0;
      background-size: cover;
    }
  }
</style>
