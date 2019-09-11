<template>
  <div class="table-wrapper">
    <table class="table">
      <thead>
        <tr>
          <th>id</th>
          <th v-for="(param, index) in template.params" :key="index">{{ param.title }}</th>
          <th></th>
        </tr>
      </thead>
      <Tr v-for="object in objects"
          :object="object"
          :template="template"
          :key="object.id"/>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Tr from './Tr';

export default {
  computed: {
    ...mapGetters('template', ['template']),
    ...mapGetters('object', ['objects'])
  },
  components: {
    Tr
  }
};
</script>
