<template>
  <div class="wrapper">
    <Header />
    <div class="content-wrapper">
      <div class="content-wrapper__sidebar">
        <Sidebar v-if="templates.length > 0"/>
      </div>
      <div class="content-wrapper__page">
        <PageContent />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Header from '../components/Header.vue';
import Sidebar from '../components/Sidebar.vue';
import PageContent from '../components/PageContent.vue';

export default {
  components: {
    Header,
    Sidebar,
    PageContent
  },
  methods: mapActions('template', ['getAll']),
  computed: mapGetters('template', ['templates']),
  created () {
    this.getAll();
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
