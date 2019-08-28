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
        <PageContent />
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';
import PageContent from '@/components/PageContent.vue';

export default {
  name: 'app',
  components: {
    Header,
    Sidebar,
    PageContent
  }
};
</script>

<style lang="scss">
  .wrapper {
    &__header {
      height: $header-height;
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
