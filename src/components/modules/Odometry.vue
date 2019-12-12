<template>
  <div class="odometry">
    <div class="odometry__inner">
      <canvas
        ref="canvas"
        class="odometry__canvas"
        width="360"
        height="240"
      />

      <!-- <div
        v-if="grid.length"
        ref="grid"
        class="odometry__grid"
      >
        <div
          v-for="(row, rowIndex) in numRows"
          v-bind:key="rowIndex"
          class="odometry__grid__row"
        >
          <div
            v-for="(col, colIndex) in numColumns"
            v-bind:key="colIndex"
            v-bind:ref="`cell-${rowIndex}-${colIndex}`"
            class="odometry__grid__col"
            :class="`odometry__grid__col--${grid[rowIndex][colIndex]}`"
          />
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import EventBus from '@/EventBus';

const ARENA_WIDTH = 360;
const ARENA_HEIGHT = 240;
// const TILE_SIZE = 5;

// const NUM_COLUMNS = ARENA_WIDTH / TILE_SIZE;
// const NUM_ROWS = ARENA_HEIGHT / TILE_SIZE;

const GEAR_RATIO = 46.85; // FIXME from env file
const TICKS_PER_REVOLUTION = 48 * GEAR_RATIO;
const WHEEL_DIAMETER = 6; // FIXME from env file
const WHEEL_BASE = 16.8; // FIXME from env file
const WHEEL_CIRCUMFERENCE = WHEEL_DIAMETER * Math.PI;
// const WHEEL_BASE_CIRCUMFERENCE = WHEEL_BASE * Math.PI;

const DISTANCE_PER_TICK = WHEEL_CIRCUMFERENCE / TICKS_PER_REVOLUTION;
// const NUM_REVOLUTION_PER_FULL_TURN = WHEEL_BASE_CIRCUMFERENCE / WHEEL_CIRCUMFERENCE;
// const NUM_ROTATION_TICKS_FULL_TURN = NUM_REVOLUTION_PER_FULL_TURN * TICKS_PER_REVOLUTION;

// const cellTypes = {
//   OUT_OF_BOUNDS: 0,
//   EMPTY: 1,
//   ROBOT: 2,
//   OBSTACLE: 3,
// };

const startPose = {
  x: 19, // FIXME measured from back wall
  y: 58 + (ARENA_HEIGHT / 2), // FIXME measured from left wall
  phi: 0,
};

export default {
  data() {
    return {
      canvas: null,
      context: null,
      // numRows: NUM_ROWS,
      // numColumns: NUM_COLUMNS,
      // grid: [],
      poses: [startPose],
    };
  },

  sockets: {
    data({ odometry }) {
      odometry.forEach(({ leftTicks, rightTicks }) => {
        const distanceLeft = this.getWheelDistanceTraveled(leftTicks);
        const distanceRight = this.getWheelDistanceTraveled(rightTicks);
        const lastPose = this.poses[this.poses.length - 1];
        const pose = this.getPose(distanceLeft, distanceRight, lastPose);

        if (JSON.stringify(pose) !== JSON.stringify(lastPose)) {
          this.context.fillRect(pose.x, pose.y, 1, 1);
          this.poses.push(pose);
        }
      });
    },
  },

  methods: {
    getWheelDistanceTraveled(ticks) {
      return DISTANCE_PER_TICK * ticks;
    },

    getPose(distanceLeft, distanceRight, lastPose = { x: 0, y: 0, phi: 0 }) {
      const distanceCenter = (distanceLeft + distanceRight) / 2;
      const x = lastPose.x + (distanceCenter * Math.cos(lastPose.phi));
      const y = lastPose.y + (distanceCenter * Math.sin(lastPose.phi));
      const phi = lastPose.phi - ((distanceRight - distanceLeft) / WHEEL_BASE);

      return { x, y, phi };
    },

    clearCanvas() {
      const { canvas } = this.$refs;

      this.context.clearRect(0, 0, canvas.width, canvas.height);
    },

    drawArena() {
      const x0 = 0;
      const x1 = ARENA_WIDTH / 3;
      const x2 = x1 * 2;
      const x3 = ARENA_WIDTH;
      const y0 = 0;
      const y1 = ARENA_HEIGHT / 2;
      const y2 = ARENA_HEIGHT;

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

    // generateGrid() {
    //   const grid = [];

    //   for (let row = 0; row < this.numRows; row += 1) {
    //     grid[row] = [];

    //     for (let col = 0; col < this.numColumns; col += 1) {
    //       grid[row].push(cellTypes.EMPTY);
    //     }
    //   }

    //   return Promise.resolve(grid);
    // },

    // adjustGridToTShape(grid) {
    //   const newGrid = this.copyTwoDimensionalArray(grid);

    //   for (let row = 0; row < this.numRows; row += 1) {
    //     if (row < this.numRows / 2) {
    //       for (let col = 0; col < newGrid[row].length; col += 1) {
    //         if (col < this.numColumns / 3 || col > (this.numColumns / 3) * 2) {
    //           newGrid[row][col] = cellTypes.OUT_OF_BOUNDS;
    //         }
    //       }
    //     }
    //   }

    //   return Promise.resolve(newGrid);
    // },

    // copyTwoDimensionalArray(array) {
    //   return array.map(value => value.slice(0));
    // },

    reset() {
      this.poses = [startPose];
      this.clearCanvas();
    },
  },

  mounted() {
    const { canvas } = this.$refs;

    this.context = canvas.getContext('2d');
    this.drawArena();

    EventBus.$on('reset', this.reset);

    // this.generateGrid()
    //   .then(this.adjustGridToTShape)
    //   .then((grid) => {
    //     this.grid = grid;
    //   });
  },
};
</script>

<style lang="scss" scoped>
$width: 360px;
$height: 240px;

.odometry__inner {
  position: absolute;
  top: calc((100% - #{$height}) / 2);
  right: calc((100% - #{$width}) / 2);
  bottom: calc((100% - #{$height}) / 2);
  left: calc((100% - #{$width}) / 2);
  width: $width;
  height: $height;
  background: #fff;
}

.odometry__canvas {
  // position: absolute;
  // top: 0;
  // left: 0;
}

// .odometry__grid {
//   display: flex;
//   width: $width;
//   flex-wrap: wrap;
// }

// .odometry__grid__row {
//   display: flex;
// }

// .odometry__grid__col {
//   width: 5px;
//   height: 5px;
//   border-right: 1px solid #fff;
//   border-bottom: 1px solid #fff;

//   &--0 { background: #fff; }
//   &--1 { background: #eee; }
//   &--2 { background: #00f; }
//   &--3 { background: #f00; }
// }
</style>
