<template>
  <div v-if="firstLoading">
    Загрузка...
  </div>
  <div v-else>
    <div class="template-page" :class="{'is-loading': isLoading}">
      <div v-if="!isEmpty(localTemplate)">
        <div class="">
          <div class="title title--lg">{{ localTemplate.title }}</div>
          <router-link class="button mb-4" :to="{name: 'template', params: {id: localTemplate.id}}" :exact="true">
            <i class="fas fa-edit"></i> Редактировать шаблон
          </router-link>
        </div>
        <Table :template="localTemplate"
               :link-assets="linkAssets"
               :assets="localAssets"/>
      </div>
      <div v-else>
        <span>Такого шаблона не существует</span>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import Asset from '../../api/Asset';
import helpers from '../../mixins/helpers';
import { mapGetters, mapActions } from 'vuex';
import Table from '../../components/Assets/Table';

export default {
  data () {
    return {
      isLoading: false,
      firstLoading: true,
      localTemplate: {},
      localAssets: [],
      linkAssets: []
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
    ...mapActions({ resetLinkedAssets: 'linkedAssets/resetAllAssets' }),
    async initial () {
      this.resetLinkedAssets();
      this.linkAssets = [];
      if (!this.template) return;

      // get current assets
      await this.fetchAssets(this.template);

      // get linkAssets for selects
      let linkAssets = [];
      const paramsLink = this.template.params.filter(param => param.type.type === 'link');
      if (!_.isEmpty(paramsLink)) linkAssets = await Asset.fetchByTemplates(...paramsLink.map(item => item.type.linkId));

      // all data update
      this.localTemplate = this.template;
      this.linkAssets = linkAssets;
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
