<template>
  <div>
    <div v-if="template">
      <div class="title title--lg">{{ template.title }}</div>
      <Table  />
    </div>
    <div v-else>
      <span>Такого шаблона не существует</span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import Table from '../../components/Table/Table';

export default {
  watch: {
    '$route' ({ params }) {
      this.getContent(params.id);
    }
  },
  data () {
    return {
      template: {}
    };
  },
  computed: {
    ...mapGetters('template', ['objects', 'templates'])
  },
  methods: {
    ...mapActions('template', ['getObjectsById']),
    getContent (id) {
      this.template = this.templates.find(item => item.id === id);
      if (this.template) {
        this.getObjectsById(id);
      }
    }
  },
  created () {
    this.getContent(this.$route.params.id);
  },
  components: {
    Table
  }
};
</script>
