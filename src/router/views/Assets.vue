<template>
  <div v-if="!firstLoading" class="template-page" :class="{'is-loading': isLoading}">
    <div v-if="!isEmpty(localTemplate)">
      <div class="title title--lg">{{ localTemplate.title }}</div>
      <Table :template="localTemplate"
             :assets="localAssets"/>
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
      localTemplate: {},
      localAssets: []
    };
  },
  beforeRouteUpdate ({ params }, from, next) {
    this.isLoading = true;
    this.getContent(params.id);
    next();
  },
  mixins: [ helpers ],
  computed: {
    ...mapGetters('templates', ['getTemplateById']),
    ...mapGetters('template', ['template', 'assets'])
  },
  methods: {
    ...mapActions('template', ['changeTemplate']),
    async getContent (id) {
      await this.changeTemplate(this.getTemplateById(id));
      this.localTemplate = this.template;
      this.localAssets = this.assets;
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
