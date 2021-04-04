<template>
  <div class="localization">
    <div class="localization__info">
      <div class="localization_arena">
        {{ selectedArena.name }}
      </div>

      <div class="localization__pose">
        position: {{ pose.x.toFixed(0) }}, {{ pose.y.toFixed(0) }}<br>
        heading: {{ heading }}°
      </div>
    </div>

    <canvas
      ref="canvas"
      class="localizationcanvas"
      v-bind:width="(selectedArena.width / 10) * selectedArena.scale"
      v-bind:height="(selectedArena.height / 10) * selectedArena.scale"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import EventBus from '@/EventBus';

export default {
  data() {
    return {
      canvas: null,
      context: null,
      pose: { x: 0, y: 0, phi: 0 },
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
    clearCanvas() {
      const { canvas } = this.$refs;

      this.context.clearRect(0, 0, canvas.width, canvas.height);
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

    reset() {
      this.clearCanvas();
      this.drawArena();
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
  align-items: center;
  justify-content: center;
}

.localization__info {
  position: absolute;
  top: 10px;
  left: 10px;
  line-height: 1.2;
}

.localization__pose {
  color: #666;
}
</style>
