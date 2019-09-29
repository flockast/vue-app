<template>
  <div v-if="isLoading">
    Загрузка...
  </div>
  <div v-else>
    <div v-if="!this.isEmpty(this.linkedAssets)">
      <div class="title title--sm">Связанные таблицы:</div>
      <LinkedTable v-for="linked in this.linkedAssets.data"
                   :template="linked.template"
                   :param-id="linked.paramId"
                   :assets="linked.assets"
                   :parent-asset-id="asset.id"
                   :key="linked.template.id"/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import helpers from '../../mixins/helpers';
import LinkedTable from './LinkedTable';

export default {
  data () {
    return {
      isLoading: true
    };
  },
  props: {
    asset: [ Object ],
    template: [ Object ]
  },
  computed: {
    ...mapGetters({ getLinkedTemplatesById: 'templates/getLinkedTemplatesById' }),
    ...mapGetters({ allLinkedAssets: 'linkedAssets/all' }),
    linkedAssets () {
      return this.$store.getters['linkedAssets/getAssetsByParentId'](this.asset.id);
    }
  },
  mixins: [ helpers ],
  methods: {
    ...mapActions({ fetchLinkedAssets: 'linkedAssets/fetchAssets' }),
    async fetchAllAssets () {
      const linkedTemplates = this.getLinkedTemplatesById(this.template.id);
      if (linkedTemplates && this.asset.id) {
        await this.fetchLinkedAssets({
          templates: linkedTemplates,
          parentAssetId: this.asset.id
        });
      }
    }
  },
  created () {
    this.fetchAllAssets().finally(() => {
      this.isLoading = false;
    });
  },
  components: {
    LinkedTable
  }
};
</script>
