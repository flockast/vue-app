<template>
  <div v-if="!firstLoading" class="template-page" :class="{'is-loading': isLoading}">
    <div v-if="notEmptyObject(template) && notEmptyArray(objects)">
      <div class="title title--lg">{{ template.title }}</div>
      <Table />
    </div>
    <div v-else>
      <span>Такого шаблона не существует</span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import Object from '../../api/Object';
import Table from '../../components/Table/Table';
import helpers from '../../mixins/helpers';

export default {
  async beforeRouteUpdate ({ params }, from, next) {
    this.isLoading = true;
    await this.getContent(params.id);
    next();
  },
  data () {
    return {
      isLoading: false,
      firstLoading: true
    };
  },
  mixins: [ helpers ],
  computed: {
    ...mapGetters('template', ['template', 'templates', 'getTemplateById', 'childrenTemplates']),
    ...mapGetters('object', ['objects', 'childrenObjects'])
  },
  methods: {
    ...mapActions('object', ['fetchObjectsByTemplateId']),
    ...mapMutations('template', ['setChildrenTemplates', 'setTemplate']),
    ...mapMutations('object', ['setChildrenObjects']),
    async getContent (id) {
      if (!this.getTemplateById(id)) return;

      let childrenTemplates = [];
      let childrenObjects = [];

      // get children templates
      this.templates.forEach(item => {
        if (!item.params) return;
        item.params.forEach(param => {
          if (param.type.type === 'link' &&
              param.type.parentCanShowMe &&
              param.type.linkId === id) {
            childrenTemplates.push({
              template: this.getTemplateById(item.id),
              paramId: param.id
            });
          }
        });
      });

      // get children objects
      if (this.notEmptyArray(childrenTemplates)) {
        childrenObjects = await Object.fetchByTemplate(
          ...childrenTemplates.map(item => item.template.id)
        );
      }

      // set children templates
      this.setChildrenTemplates(childrenTemplates);

      // set children objects
      this.setChildrenObjects(childrenObjects);

      // get and set objects
      await this.fetchObjectsByTemplateId(id);

      // set current template
      this.setTemplate(id);

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

<style lang="scss">
.template-page {
  position: relative;
  &.is-loading {
    &:after {
      display: block;
    }
  }
  &:after {
    content: '';
    display: none;
    position: absolute;
    z-index: 99;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255 , .8);
  }
}
</style>
