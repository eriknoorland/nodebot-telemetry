<template>
  <nav class="navbar">
    <ul class="navbar__list">
      <li class="navbar__item">
        <router-link
          to="/"
          class="navbar__link"
        >
          Dashboard
        </router-link>
      </li>

      <li class="navbar__item">
        <router-link
          to="/arena"
          class="navbar__link"
        >
          Arena
        </router-link>
      </li>

      <li class="navbar__item">
        <router-link
          to="/settings"
          class="navbar__link"
        >
          Settings
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {};
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
  color: #666;
  transition: color .25s;

  &:hover,
  &.router-link-exact-active {
    position: relative;
    color: inherit;

    &:after {
      content: "";
      position: absolute;
      right: 0;
      bottom: -2px;
      left: 0;
      height: 1px;
      background: #fff;
    }
  }
}
</style>
