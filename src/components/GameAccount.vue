<template>
  <div class="game-account">
    <div class="game-account-label">
      <div class="game-account-label__img"></div>
      <div class="game-account-label__props">
        <div class="game-account-label__title">Guns Of Boom</div>
        <div class="game-account-label__desc">dev</div>
      </div>
    </div>
    <div class="game-account-list">

    </div>
  </div>
</template>

<style lang="scss">
.game-account {
  height: 100%;
}
.game-account-label {
  display: flex;
  align-items: center;
  height: 100%;
  border-radius: $border-radius;
  overflow: hidden;
  &__img {
    width: 4.2rem;
    height: 100%;
    margin-right: 1.2rem;
    border-radius: $border-radius;
    overflow: hidden;
    background: #929988;
    img {
      max-width: 100%;
      height: auto;
    }
  }
  &__title {
    margin-bottom: .2rem;
    color: #ffffff;
    font-size: 1.4rem;
  }
  &__desc {
    color: $color-font-light;
    font-size: 1.2rem;
  }
}
</style>
