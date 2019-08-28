<template>
  <div class="wrapper">
    <Header />
    <div class="content-wrapper">
      <div class="content-wrapper__sidebar">
        <Sidebar />
      </div>
      <div class="content-wrapper__page">
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
  .content-wrapper {
    display: flex;
    flex: 1 1 auto;
    &__sidebar {

    }
    &__page {
      flex: 1;
    }
  }
</style>
