<template>
  <div class="header-search">
    <input class="header-search__input">
  </div>
</template>

<style lang="scss">
  .header-search {
    display: flex;
    align-items: center;
    height: 100%;
    &__input {
      display: inline-block;
      width: 20rem;
      border: none;
      border-radius: $border-radius;
      padding: .8rem 1.5rem;
      appearance: none;
      font-size: 1.4rem;
      background: $color-main-light;
      transition: width .2s ease-in-out;
      &:focus {
        outline: none;
        background: white;
        width: 32rem;
      }
     }
  }
</style>
