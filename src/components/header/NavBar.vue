<template>
  <nav class="navbar">
    <ul class="navbar__list">
      <li class="navbar__item">
        <router-link to="/" class="navbar__link">
          Dashboard
        </router-link>
      </li>

      <li class="navbar__item">
        <router-link to="/settings" class="navbar__link">
          Settings
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'NavBar',
};
</script>

<style lang="scss">
.navbar {
  padding: 10px 20px;
  background: #303030;
  color: #fff;
}

.navbar__list {
  display: flex;
}

.navbar__item {
  margin: 0 20px 0 0;
}

.navbar__link {
  text-transform: uppercase;
  text-decoration: none;
  color: inherit;

  &.router-link-exact-active {
    color: #999;
    cursor: default;
  }
}
</style>
