<template>
  <div
    class="arenaContainer"
    v-bind:style="{
      '--scale': scale,
      '--resolution': `${matrixResolution}px`,
      '--width': `${selectedArena.width}px`,
      '--height': `${selectedArena.height}px`,
    }"
  >
    <div class="arena">
      <canvas
        ref="poseCanvas"
        class="arena__canvas"
      />

      <canvas
        ref="observationsCanvas"
        class="arena__canvas"
      />

      <div
        v-show="pose"
        v-bind:style="robotPoseCSS"
        class="arena__robot"
      />
    </div>

    <div
      v-if="odomPose || imuPose"
      class="arena__position"
    >
      <div v-if="imuPose">
        <span class="arena__positionDash arena__positionDash--imu" /> IMU<br />
        {{ imuPose.x.toFixed(0) }}, {{ imuPose.y.toFixed(0) }}<br />
        {{ rad2deg(imuPose.phi).toFixed(2) }}°
      </div>

      <br />

      <div v-if="odomPose">
        <span class="arena__positionDash arena__positionDash--odom" /> Odometry<br />
        {{ odomPose.x.toFixed(0) }}, {{ odomPose.y.toFixed(0) }}<br />
        {{ rad2deg(odomPose.phi).toFixed(2) }}°
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import EventBus from '@/EventBus';
import rad2Deg from '@/utils/rad2Deg';

const scale = 1 / 3;
const matrixResolution = 30;

export default {
  data() {
    return {
      scale,
      matrixResolution,
      drawOffset: matrixResolution * scale,
      observationsContext: null,
      poseContext: null,
      pose: null,
      imuPose: null,
      odomPose: null,
    };
  },

  computed: {
    ...mapState('setup', ['selectedArena']),
    ...mapState('sensors', ['poses', 'imuPoses', 'odomPoses']),

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
        this.drawObservations(pose);
        this.pose = pose;
      });
    },

    imuPoses(poses) {
      poses.forEach((pose) => {
        this.drawPose(pose, '#ff4000');
        this.imuPose = pose;
      });
    },

    odomPoses(poses) {
      poses.forEach((pose) => {
        this.drawPose(pose, '#4073ff');
        this.odomPose = pose;
      });
    },
  },

  mounted() {
    const { observationsCanvas, poseCanvas } = this.$refs;

    this.observationsContext = observationsCanvas.getContext('2d');
    this.poseContext = poseCanvas.getContext('2d');

    observationsCanvas.setAttribute('width', observationsCanvas.clientWidth);
    observationsCanvas.setAttribute('height', observationsCanvas.clientHeight);

    poseCanvas.setAttribute('width', poseCanvas.clientWidth);
    poseCanvas.setAttribute('height', poseCanvas.clientHeight);

    this.drawArena();

    EventBus.on('reset', () => {
      this.observationsCanvas();
      this.clearPoseCanvas();
      this.drawArena();
    });
  },

  methods: {
    drawPose(pose, color) {
      const x = pose.x * this.scale;
      const y = pose.y * this.scale;

      this.poseContext.fillStyle = color;
      this.poseContext.fillRect(x, y, 1, 1);
    },

    drawObservations(pose) {
      const { observations } = pose;

      observations.forEach(({ x, y }) => {
        this.observationsContext.fillStyle = '#6accbc';
        this.observationsContext.fillRect(
          (x * this.scale) + this.drawOffset,
          (y * this.scale) + this.drawOffset,
          2,
          2,
        );
      });
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

      this.observationsContext.strokeStyle = '#4073ff';
      this.observationsContext.lineWidth = 2;
      this.observationsContext.beginPath();
      this.observationsContext.moveTo(x1, y0);
      this.observationsContext.lineTo(x2, y0);
      this.observationsContext.lineTo(x2, y1);
      this.observationsContext.lineTo(x3, y1);
      this.observationsContext.lineTo(x3, y2);
      this.observationsContext.lineTo(x0, y2);
      this.observationsContext.lineTo(x0, y1);
      this.observationsContext.lineTo(x1, y1);
      this.observationsContext.lineTo(x1, y0);
      this.observationsContext.stroke();
    },

    observationsCanvas() {
      this.clearCanvas(this.$refs.observationsCanvas, this.observationsContext);
    },

    clearPoseCanvas() {
      this.clearCanvas(this.$refs.poseCanvas, this.poseContext);
    },

    clearCanvas(canvas, context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
    },

    rad2deg(angle) {
      return rad2Deg(angle);
    },
  },
};
</script>

<style lang="scss" scoped>
  .arenaContainer {
    position: relative;
    margin: 10px;
    padding: calc(var(--resolution) * var(--scale));
    width: calc((var(--width) + (4 * var(--resolution))) * var(--scale));
    height: calc((var(--height) + (4 * var(--resolution))) * var(--scale));
    background: #fff;
  }

  .arena {
    position: relative;
    width: calc((var(--width) + (2 * var(--resolution))) * var(--scale));
    height: calc((var(--height) + (2 * var(--resolution))) * var(--scale));
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

  .arena__positionDash {
    display: inline-block;
    margin: 0 4px 0 0;
    width: 15px;
    height: 2px;

    &--imu {
      background: #ff4000;
    }

    &--odom {
      background: #4073ff;
    }
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
