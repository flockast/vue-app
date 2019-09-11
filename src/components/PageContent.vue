<template>
  <div class="content">
    <div class="content__breadcrumbs">
      <Breadcrumbs />
    </div>
    <div class="content__page">
      <transition name="fade-up" mode="out-in">
        <router-view />
      </transition>
    </div>
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
</style>
