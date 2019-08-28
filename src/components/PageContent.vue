<template>
  <div class="content">
    <Breadcrumbs />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import Breadcrumbs from './Breadcrumbs';
export default {
  components: {
    Breadcrumbs
  }
};
</script>

<style lang="scss">
  .content {
    padding: 1.5rem;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
