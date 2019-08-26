<template>
  <div class="wrapper">
    <div class="wrapper__header">
      <Header />
    </div>
    <div class="wrapper-content">
      <div class="wrapper-content__sidebar">
        <Sidebar />
      </div>
      <div class="wrapper-content__content">
        <router-view />
      </div>
    </div>
    <Counter />
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import Counter from '@/components/Counter.vue';

export default {
  name: 'app',
  components: {
    Header,
    Sidebar,
    Counter
  }
};
</script>

<style lang="scss">
  .wrapper {
    &__header {

    }
  }
  .wrapper-content {
    display: flex;
    flex: 1 1 auto;
    &__sidebar {

    }
    &__content {

    }
  }
</style>
