<template>
  <div class="review">
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
        v-if="pose"
        class="arena__position"
      >
        {{ pose.x.toFixed(0) }}, {{ pose.y.toFixed(0) }}<br />
        {{ (pose.phi * (180 / Math.PI)).toFixed(2) }}°
      </div>
    </div>

    <div class="review__log">
      <select v-model="selectedLogFile">
        <option
          value="null"
          disabled
        >
          -- select log file --
        </option>

        <option
          v-for="(logFile, index) in logFiles"
          v-bind:key="index"
          v-bind:value="logFile"
        >
          {{ logFile }}
        </option>
      </select>

      <button
        class="review__logButton"
        v-bind:disabled="!selectedLogFile"
        v-on:click="downloadLog"
      >
        Download
      </button>

      <double-range-slider
        v-if="observations.length"
        v-bind:min="0"
        v-bind:minThreshold="0"
        v-bind:max="observations.length"
        v-bind:maxThreshold="observations.length"
        v-on:update="onSliderIndexChange"
        class="review__slider"
      />

      <textarea
        class="review__logFile"
        v-model="logFile"
      />

      <button
        class="review__logButton"
        v-bind:disabled="!logFile"
        v-on:click="visualizeLog"
      >
        Visualize
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
import DoubleRangeSlider from '@/components/DoubleRangeSlider';

const scale = 1 / 3;
const matrixResolution = 30;

export default {
  components: {
    DoubleRangeSlider,
  },

  data() {
    return {
      scale,
      matrixResolution,
      drawOffset: matrixResolution * scale,
      observationsContext: null,
      poseContext: null,
      logFiles: [],
      selectedLogFile: null,
      logFile: '',
      observations: [],
      observationsStartIndex: 0,
      observationsEndIndex: 0,
      pose: null,
    };
  },

  computed: {
    ...mapState('setup', ['selectedArena']),

    robotPoseCSS() {
      const { x, y, phi } = this.pose || {};

      return {
        left: `${x * this.scale}px`,
        top: `${y * this.scale}px`,
        transform: `rotate(${phi}rad)`,
      };
    },
  },

  async mounted() {
    const { observationsCanvas, poseCanvas } = this.$refs;

    this.observationsContext = observationsCanvas.getContext('2d');
    this.poseContext = poseCanvas.getContext('2d');

    observationsCanvas.setAttribute('width', observationsCanvas.clientWidth);
    observationsCanvas.setAttribute('height', observationsCanvas.clientHeight);

    poseCanvas.setAttribute('width', poseCanvas.clientWidth);
    poseCanvas.setAttribute('height', poseCanvas.clientHeight);

    this.drawArena();

    const logFiles = await axios.get(`${process.env.VUE_APP_API_URL}/v1/logs`);
    this.logFiles = logFiles.data;
  },

  methods: {
    async downloadLog() {
      try {
        const logFile = await axios.get(`${process.env.VUE_APP_API_URL}/v1/logs/${this.selectedLogFile}`);
        this.logFile = JSON.stringify(logFile.data);
      } catch (error) {
        //
      }
    },

    onSliderIndexChange({ min, max }) {
      const { observationsCanvas, poseCanvas } = this.$refs;

      this.clearCanvas(observationsCanvas, this.observationsContext);
      this.clearCanvas(poseCanvas, this.poseContext);
      this.drawArena();

      this.observations
        .filter((observation, index) => index >= min && index <= max)
        .forEach(observation => {
          this.drawPose(observation.value);
          this.drawObservations(observation.value);
        });

      this.pose = this.observations[max].value;
    },

    visualizeLog() {
      const log = JSON.parse(this.logFile);

      this.observations = log.entries
        .filter(({ type }) => type === 'data')
        .filter(({ dataType }) => dataType === 'observation');

      this.observationsStartIndex = this.observations.length - 1;

      this.onSliderIndexChange({ min: 0, max: this.observations.length });
    },

    drawPose(pose) {
      const x = pose.x * this.scale;
      const y = pose.y * this.scale;

      this.poseContext.fillStyle = '#ff4000';
      this.poseContext.fillRect(x, y, 1, 1);
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

    drawObservations({ observations }) {
      observations.forEach(observation => {
        const x = (observation.x * this.scale) + this.drawOffset;
        const y = (observation.y * this.scale) + this.drawOffset;

        this.observationsContext.fillStyle = '#6accbc';
        this.observationsContext.fillRect(x, y, 2, 2);
      });
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

  .review__log {
    margin: 10px;
  }

  .review__slider {
    margin: 10px 0;
    width: 600px;
  }

  .review__logFile {
    display: block;
    width: 600px;
    height: 100px;
  }

  .review__logButton {
    margin: 10px 0 0 0;
  }
</style>
