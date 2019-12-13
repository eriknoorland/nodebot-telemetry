<template>
  <div class="odometry">
    <div class="odometry__arena">
      {{ selectedArena.name }}
    </div>

    <canvas
      ref="canvas"
      class="odometry__canvas"
      v-bind:width="selectedArena.width * selectedArena.scale"
      v-bind:height="selectedArena.height * selectedArena.scale"
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
    };
  },

  computed: {
    ...mapState(['selectedArena']),
  },

  sockets: {
    data({ poses }) {
      poses.forEach((pose) => {
        const { scale } = this.selectedArena;

        this.context.fillRect(pose.x * scale, pose.y * scale, 1, 1);
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
      const x0 = 0;
      const x1 = (width * scale) / 3;
      const x2 = x1 * 2;
      const x3 = (width * scale);
      const y0 = 0;
      const y1 = (height * scale) / 2;
      const y2 = (height * scale);

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
.odometry {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.odometry__arena {
  position: absolute;
  top: 10px;
  left: 10px;
}
</style>
