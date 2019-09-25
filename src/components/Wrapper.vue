<template>
  <div class="wrapper">
    <Header />
    <div v-if="!isEmpty(templates)" class="content-wrapper">
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
import { mapActions, mapGetters } from 'vuex';
import Header from './Header/Header.vue';
import Sidebar from './Sidebar/Sidebar.vue';
import PageContent from '../components/PageContent.vue';
import helpers from '../mixins/helpers';

export default {
  components: {
    Header,
    Sidebar,
    PageContent
  },
  methods: mapActions('templates', ['getAllTemplates']),
  computed: mapGetters('templates', ['templates']),
  mixins: [ helpers ],
  created () {
    this.getAllTemplates();
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
    overflow: hidden;
  }
}
</style>
