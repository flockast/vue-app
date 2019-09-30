<template>
  <div v-if="firstLoading">
    Загрузка...
  </div>
  <div v-else>
    <div class="template-page" :class="{'is-loading': isLoading}">
      <div v-if="!isEmpty(localTemplate)">
        <div class="title title--lg">{{ localTemplate.title }}</div>
        <Table :template="localTemplate"
               :assets="localAssets"/>
      </div>
      <div v-else>
        <span>Такого шаблона не существует</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Table from '../../components/Assets/Table';
import helpers from '../../mixins/helpers';

export default {
  data () {
    return {
      isLoading: false,
      firstLoading: true,
      localTemplate: {},
      localAssets: []
    };
  },
  mixins: [ helpers ],
  computed: {
    ...mapGetters({ assets: 'assets/all' }),
    template () {
      return this.$store.getters['templates/getTemplateById'](this.$route.params.id);
    }
  },
  watch: {
    template () {
      this.isLoading = true;
      this.initial();
    }
  },
  methods: {
    ...mapActions({ fetchAssets: 'assets/fetchAssets' }),
    ...mapActions({ resetNewAssets: 'assets/resetNewAssets' }),
    ...mapActions({ resetLinkedAssets: 'linkedAssets/resetAllAssets' }),
    async initial () {
      this.resetLinkedAssets();
      this.resetNewAssets();
      if (!this.template) return;
      await this.fetchAssets(this.template);
      this.localTemplate = this.template;
      this.localAssets = this.assets;
      this.isLoading = false;
    }
  },
  created () {
    this.initial().finally(() => { this.firstLoading = false; });
  },
  components: {
    Table
  }
};
</script>
