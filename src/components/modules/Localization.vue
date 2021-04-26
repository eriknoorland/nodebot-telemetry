<template>
  <div class="localization">
    <div class="localization__header">
      <div class="localization__info">
        <div class="localization_arena">
          {{ selectedArena.name }}
        </div>

        <div class="localization__pose">
          position: {{ pose.x.toFixed(0) }}, {{ pose.y.toFixed(0) }}<br>
          heading: {{ heading }}°
        </div>
      </div>

      <div class="localization__waypointButtons">
        <button
          class="localization__clearWaypoints"
          v-on:click="onClearWaypointsClick"
        >
          Clear WP's
        </button>

        <button
          class="localization__sendWaypoints"
          v-on:click="onSendWaypointsClick"
        >
          Send WP's
        </button>
      </div>
    </div>

    <div class="localization__canvasContainer">
      <div class="localization__canvasWrapper">
        <canvas
          ref="canvas"
          class="localization__canvas"
          v-bind:width="(selectedArena.width / 10) * selectedArena.scale"
          v-bind:height="(selectedArena.height / 10) * selectedArena.scale"
          v-on:click="onWaypointsClick"
        />

        <div class="localization__waypoints">
          <div
            v-for="(waypoint, index) in waypoints"
            v-bind:key="index"
            v-bind:style="{
              top: `${waypoint.y - 4}px`,
              left: `${waypoint.x - 4}px`,
            }"
            v-bind:data-index="index+1"
            class="localization__waypoint"
          />
        </div>

        <div
          v-show="pose.x !== 0 && pose.y !== 0"
          v-bind:style="robotCss"
          class="localization__robot"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import EventBus from '@/EventBus';

export default {
  data() {
    return {
      context: null,
      pose: { x: 0, y: 0, phi: 0 },
      waypoints: [],
    };
  },

  computed: {
    ...mapState('setup', ['selectedArena']),
    ...mapState('localization', ['poses']),

    heading() {
      const angleDegrees = (this.pose.phi * (180 / Math.PI)) % 360;

      if (angleDegrees < 0) {
        return 360 + angleDegrees;
      }

      return angleDegrees.toFixed(2);
    },

    robotCss() {
      const { scale } = this.selectedArena;
      const xOffset = 5;
      const yOffset = 10;

      return {
        left: `${((this.pose.x / 10) * scale) - xOffset}px`,
        top: `${((this.pose.y / 10) * scale) - yOffset}px`,
        transform: `rotate(${this.pose.phi}rad)`,
      };
    },
  },

  watch: {
    poses(poses) {
      poses.forEach((pose) => {
        const { scale } = this.selectedArena;
        const x = (pose.x / 10) * scale;
        const y = (pose.y / 10) * scale;

        this.context.fillRect(x, y, 1, 1);
        this.pose = pose;
      });
    },
  },

  methods: {
    onWaypointsClick(event) {
      this.waypoints.push({
        x: event.offsetX,
        y: event.offsetY,
      });
    },

    onSendWaypointsClick() {
      const { scale } = this.selectedArena;
      const waypoints = this.waypoints.map(({ x, y }) => ({
        x: (x * 10) / scale,
        y: (y * 10) / scale,
      }));

      this.$socket.emit('waypoints', waypoints);
    },

    onClearWaypointsClick() {
      this.waypoints = [];
    },

    drawArena() {
      const { width, height, scale } = this.selectedArena;
      const scaledWidth = width / 10;
      const scaledHeight = height / 10;

      const x0 = 0;
      const x1 = (scaledWidth * scale) / 3;
      const x2 = x1 * 2;
      const x3 = (scaledWidth * scale);
      const y0 = 0;
      const y1 = (scaledHeight * scale) / 2;
      const y2 = (scaledHeight * scale);

      this.context.strokeStyle = '#ccc';
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

    clearCanvas() {
      const { canvas } = this.$refs;

      this.context.clearRect(0, 0, canvas.width, canvas.height);
    },

    reset() {
      this.clearCanvas();
      this.drawArena();
      this.pose = { x: 0, y: 0, phi: 0 };
      this.waypoints = [];
    },
  },

  mounted() {
    const { canvas } = this.$refs;

    this.context = canvas.getContext('2d');
    this.drawArena();

    EventBus.$on('reset', this.reset);
  },
};
</script>

<style lang="scss" scoped>
.localization {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
}

.localization__header {
  display: flex;
  flex: 0 0 auto;
  justify-content: space-between;
  padding: 20px;
}

.localization__info {
  line-height: 1.2;
}

.localization__pose {
  color: #666;
}

.localization__clearWaypoints,
.localization__sendWaypoints {
  appearance: none;
  padding: 6px;
  border: 1px solid;
  border-radius: 6px;
  font-size: 11px;
}

.localization__clearWaypoints {
  margin: 0 4px 0 0;
  background: #ffeeba;
  border-color: #fff3cd;
}

.localization__sendWaypoints {
  background: #d4edda;
  border-color: #c3e6cb;
}

.localization__canvasContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 auto;
}

.localization__canvasWrapper {
  position: relative;
  font-size: 0;
}

.localization__waypoints {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
}

.localization__waypoint {
  --size: 8px;

  position: absolute;
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background: rgba(green, .5);

  &:after {
    content: attr(data-index);
    position: relative;
    top: -2px;
    left: 10px;
    font-size: 10px;
    color: rgba(#000, .5);
  }
}

.localization__robot {
  --size: 10px;

  position: absolute;
  width: 0;
  height: 0;
  border-top: var(--size) solid transparent;
  border-bottom: var(--size) solid transparent;
  border-left: var(--size) solid rgba(#05f, .5);
}
</style>
