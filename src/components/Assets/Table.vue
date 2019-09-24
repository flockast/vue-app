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
      <Tr v-for="asset in assets"
          :asset="asset"
          :template="template"
          :key="asset.id"/>
      <Tr v-for="(asset, index) in newAssets"
          :asset="asset"
          :template="template"
          :keyOfNewAsset="index"
          :key="index"/>
      <tr>
        <td :colspan="template.params.length + 2">
          <button class="button button--full button--success" @click="handleClickAddRow"><i class="fas fa-plus"></i> Добавить</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Tr from './Tr';

export default {
  props: {
    template: [Object],
    assets: [Array]
  },
  computed: mapGetters('template', ['newAssets']),
  methods: {
    ...mapActions('template', ['addToNewAssets']),
    handleClickAddRow () {
      this.addToNewAssets();
    }
  },
  components: {
    Tr
  }
};
</script>
