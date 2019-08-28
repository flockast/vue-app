<template>
  <div class="header-wrapper">
    <header class="header">
      <div class="header__container">
        <div class="header__game">
          <GameAccount />
        </div>
        <div class="header__menu">
          <Menu />
        </div>
        <div class="header__search">
          <Search />
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import GameAccount from './header/GameAccount';
import Menu from './header/Menu';
import Search from './header/Search';

export default {
  components: {
    GameAccount,
    Menu,
    Search
  }
};
</script>

<style lang="scss">
  .header-wrapper {
    height: $header-height;
  }
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: $header-height;
    background: $color-main;
    color: $color-font-light;
    &__container {
      @include wrapper-full();
      display: flex;
      justify-content: space-between;
      height: 100%;
    }
    &__menu {
      flex: 1;
    }
  }
</style>
