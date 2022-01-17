<template>
  <div class="odomLineTest">
    <div class="lineTrack">
      <canvas
        ref="trackCanvas"
        class="trackCanvas"
      />

      <canvas
        ref="poseCanvas"
        class="poseCanvas"
      />

      <div class="legend">
        <div class="legend__item">
          <span class="legend__dash legend__dash--odom" /> Odometry
        </div>

        <div class="legend__item">
          <span class="legend__dash legend__dash--imu" /> IMU
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import roundRect from '@/utils/roundRect';

export default {
  data() {
    return {
      poseContext: null,
      trackContext: null,
      trackWidth: 1150,
      trackHeight: 750,
      cornerRadius: 250,
      lineWidth: 25,
      offsetX: 125,
      offsetY: 100,
    };
  },

  computed: {
    ...mapState('sensors', ['odomPoses', 'imuPoses']),
  },

  watch: {
    odomPoses(poses) {
      poses.forEach(pose => {
        this.drawPose(pose, '#ff4000');
      });
    },

    imuPoses(poses) {
      poses.forEach(pose => {
        this.drawPose(pose, '#4073ff');
      });
    },
  },

  async mounted() {
    const { poseCanvas, trackCanvas } = this.$refs;

    this.poseContext = poseCanvas.getContext('2d');
    this.trackContext = trackCanvas.getContext('2d');

    poseCanvas.setAttribute('width', this.trackWidth + (this.offsetX * 2));
    poseCanvas.setAttribute('height', this.trackHeight + (this.offsetY * 2));

    trackCanvas.setAttribute('width', this.trackWidth + (this.offsetX * 2));
    trackCanvas.setAttribute('height', this.trackHeight + (this.offsetY * 2));

    this.drawLineTrack();
  },

  methods: {
    drawPose(pose, color) {
      this.poseContext.fillStyle = color;
      this.poseContext.fillRect(pose.x - 1, pose.y - 1, 3, 3);
    },

    drawLineTrack() {
      const { trackContext, offsetX, offsetY, trackWidth, trackHeight, cornerRadius } = this;

      this.trackContext.strokeStyle = '#000';
      this.trackContext.lineWidth = this.lineWidth;

      roundRect(trackContext, offsetX, offsetY, trackWidth, trackHeight, cornerRadius);
    },
  },
};
</script>

<style lang="scss" scoped>
.lineTrack {
  position: relative;
  margin: 10px;
}

.poseCanvas {
  position: absolute;
  top: 0;
  left: 0;
}

.trackCanvas {
  background: #fff;
}

.legend {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  padding: 10px;
}

 .legend__item {
   display: flex;
   align-items: center;
   margin: 0 0 5px 0;

   &:last-child {
     margin: 0;
   }
 }

.legend__dash {
  display: inline-block;
  margin: 0 8px 0 0;
  width: 15px;
  height: 4px;

  &--odom {
    background: #ff4000;
  }

  &--imu {
    background: #4073ff;
  }
}
</style>
