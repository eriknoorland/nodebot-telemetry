<template>
  <div class="emergencyStop">
    <div
      class="emergencyStop__yellow"
      v-on:click="onClick"
    >
      <div class="emergencyStop__red">
        <div class="emergencyStop__label">
          Stop
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onClick() {
      this.$socket.emit('emergencyStop');
    },
  },
};
</script>

<style lang="scss" scoped>
.emergencyStop {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 20px;
}

.emergencyStop__yellow {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  background: #f5e432;
  box-shadow: 2px 2px 15px 2px rgba(#000, 0.2);
  cursor: pointer;
}

.emergencyStop__red {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60%;
  height: 60%;
  border-radius: 50%;
  background: #bd231d;
  background: linear-gradient(#bd231d 0%, #bd0404 10%, #7d0404 50%, #4a0202 100%);
  box-shadow: 5px 9px 15px 5px rgba(#000, 0.4);
}

.emergencyStop__label {
  font-size: 50px;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
  color: #f1f1f1;
  text-shadow: 2px 2px 3px rgba(#000, 0.3);
  user-select: none;
}
</style>
