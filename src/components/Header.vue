<template>
  <header class="header">
    <div class="header__container">
      <div class="header__game">
        <GameAccount />
      </div>
      <div class="header__menu">2</div>
      <div class="header__search">3</div>
      <div class="header__user">4</div>
    </div>
  </header>
</template>

<script>
import GameAccount from '@/components/GameAccount';

export default {
  components: {
    GameAccount
  }
};
</script>

<style lang="scss">
  .header {
    height: 5rem;
    padding: .4rem 0;
    background: $color-main;
    color: $color-font-light;
    &__container {
      @include wrapper-full();
      display: flex;
      justify-content: space-between;
      height: 100%;
    }
  }
</style>
