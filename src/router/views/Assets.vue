<template>
  <div v-if="!firstLoading" class="template-page" :class="{'is-loading': isLoading}">
    <div v-if="notEmptyObject(template)">
      <div class="title title--lg">{{ template.title }}</div>
      <Table
          :template="template"
          :assets="assets"/>
    </div>
    <div v-else>
      <span>Такого шаблона не существует</span>
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
      title: '',
      template: {},
      assets: []
    };
  },
  mixins: [ helpers ],
  computed: {
    ...mapGetters('template', ['currentTemplate', 'currentLinkedTemplates']),
    ...mapGetters('asset', ['currentAssets', 'getAssetsByTemplateId'])
  },
  beforeRouteUpdate ({ params }, from, next) {
    this.isLoading = true;
    this.getContent(params.id);
    next();
  },
  methods: {
    ...mapActions('template', ['changeCurrentTemplate']),
    ...mapActions('asset', ['fetchAssetsByTemplatesIds', 'resetRemovedAssetsList']),
    async getContent (id) {
      this.changeCurrentTemplate(id);

      if (this.currentTemplate) {
        await this.fetchAssetsByTemplatesIds([
          this.currentTemplate.id,
          ...this.currentLinkedTemplates.map(item => item.templateId)
        ]);
      }

      this.resetRemovedAssetsList();

      this.assets = this.getAssetsByTemplateId(this.currentTemplate.id);
      this.template = this.currentTemplate;
      this.isLoading = false;
    }
  },
  async created () {
    await this.getContent(this.$route.params.id);
    this.firstLoading = false;
  },
  components: {
    Table
  }
};
</script>
