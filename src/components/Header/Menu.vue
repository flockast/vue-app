<template>
  <nav class="header-menu">
    <ul class="header-menu__list">
      <li><a href="#">G!Ads</a></li>
      <li><a href="#">Server</a></li>
      <li><a href="#">JIRA</a></li>
      <li><a href="#">Wiki</a></li>
      <li><a href="#">Balance</a></li>
      <li><a href="#">Links</a></li>
    </ul>
  </nav>
</template>

<script>
export default {

};
</script>

<style lang="scss">
  .header-menu {
    height: 100%;
    &__list {
      display: flex;
      height: 100%;
      li {
        a {
          display: flex;
          align-items: center;
          height: 100%;
          padding: 0 2rem;
          color: $color-font-light;
          text-decoration: none;
          &:hover,
          &:focus {
            outline: none;
            background: $color-main-dark;
            color: white;
          }
        }
      }
    }
  }
</style>
