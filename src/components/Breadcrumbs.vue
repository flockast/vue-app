<template>
  <div class="breadcrumbs">
    <a href="#">Home</a> / <span>Page1</span>
  </div>
</template>

<style lang="scss">
.breadcrumbs {
  margin-bottom: 2rem;
  font-size: 1.4rem;
  span {
    color: $color-font-grey;
  }
  a {
    color: $color-main-light;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
