<template>
  <div
    v-if="setupData"
    id="app"
    class="app"
  >
    <header class="header">
      <nav class="header__nav">
        <router-link
          v-for="(route, index) in routes"
          v-bind:key="index"
          v-bind:to="{ name: route.name }"
          class="header__navLink"
        >
          {{ route.label }}
        </router-link>
      </nav>

      <div class="header__modules">
        <HeaderModule>
          <div class="header__logo">
            {{ setupData.name }}
          </div>
        </HeaderModule>

        <HeaderModule v-if="socketData">
          <Battery v-bind:data="socketData.battery" />
        </HeaderModule>

        <HeaderModule v-if="socketData">
          <FPS v-bind:data="socketData.fps" />
        </HeaderModule>

        <HeaderModule modifiers="controls">
          <Controls
            v-bind:is-ready="isReady"
            v-bind:programs="setupData.programs"
            v-on:onStartClick="handleStartClick"
            v-on:onStopClick="handleStopClick"
          />
        </HeaderModule>
      </div>
    </header>

    <router-view
      v-bind:log="logData"
      v-bind:setup="setupData"
      v-bind:data="socketData"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { socket } from '@/socket';
import HeaderModule from '@/components/header/Module.vue';
import Battery from '@/components/header/modules/Battery.vue';
import FPS from '@/components/header/modules/FPS.vue';
import Controls from '@/components/header/modules/Controls.vue';
import '@/scss/base.scss';

const isReady = ref(false);
const logData = ref(null);
const setupData = ref(null);
const socketData = ref(null);
const routes = [
  { name: 'dashboard', label: 'Dashboard'},
  { name: 'review', label: 'Review'},
  { name: 'line test', label: 'Line Test'},
];

function handleStartClick(programId) {
  socket.emit('start', programId);
}

function handleStopClick() {
  socket.emit('stop');
}

// FIXME migrate state to vuex?
socket.on('ready', () => {
  isReady.value = true;
});

// FIXME migrate state to vuex?
socket.on('disconnect', () => {
  isReady.value = false;
  
  logData.value = [
    '<span style="color: #f92472;">[app] server disconnected</span>',
    logData.value,
  ].join('\n');
});

socket.on('log', (data) => {
  logData.value = data
    .split(',')
    .reverse()
    .join('\n');
});

socket.on('setup', (data) => {
  setupData.value = data;
});

socket.on('data', (data) => {
  socketData.value = data;
});
</script>

<style lang="scss" scoped>
.header__nav {
  display: block;
  padding: 10px;
  background: #333;
  color: #666;
}

.header__navLink {
  display: inline-block;
  margin: 0 5px;
  color: #fff;
  text-decoration: none;
  opacity: 0.5;

  &:hover {
    text-decoration: underline;
    opacity: 1;
  }
}

.header__modules {
  display: flex;
  padding: 10px;
  height: auto;
  background: #fff;
  align-items: center;
  flex-wrap: wrap;

  @media(min-width: 768px) {
    padding: 10px 20px;
    height: 50px;
  }
}

.header__logo {
  font-size: 15px;
  font-weight: bold;
  color: #303030;
}
</style>
