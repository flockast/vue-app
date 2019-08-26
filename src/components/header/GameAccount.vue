<template>
  <div class="game-account">
    <a class="game-account-label">
      <div class="game-account-label__img">
        <img src="@/assets/images/guns-of-boom-icon.jpg" alt="guns of boom avatar">
      </div>
      <div class="game-account-label__props">
        <div class="game-account-label__title">Guns of Boom</div>
        <div class="game-account-label__desc">dev</div>
      </div>
    </a>
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
  padding: .6rem 5rem .6rem 1rem;
  overflow: hidden;
  cursor: pointer;
  &:hover,
  &:focus {
    outline: none;
    background: $color-main-dark;
  }
  &__img {
    width: 3.8rem;
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
    font-size: 1.5rem;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 16rem;
    white-space: nowrap;
  }
  &__desc {
    color: $color-font-light;
    font-size: 1.4rem;
  }
}
</style>
