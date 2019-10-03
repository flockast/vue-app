<template>
  <div class="table-wrapper">
    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th>id</th>
          <th v-for="(param, index) in template.params" :key="index">{{ param.title }}</th>
        </tr>
      </thead>
      <Tr v-for="asset in assets"
          :template="template"
          :link-assets="linkAssets"
          :asset="asset"
          :key="asset.id"/>
      <Tr v-for="asset in newAssets"
          :template="template"
          :link-assets="linkAssets"
          :asset="asset"
          :keyOfNewAsset="asset.newKey"
          @removeFromNewAsset="removeFromNewAsset"
          :key="asset.newKey"/>
      <tbody>
        <tr>
          <td :colspan="template.params.length + 2">
            <button class="button button--full button--success" @click="handleClickAddRow"><i class="fas fa-plus"></i> Добавить</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Tr from './TableTr';

export default {
  data () {
    return {
      newAssets: [],
      keyOfNewAsset: 0
    };
  },
  props: {
    template: [ Object ],
    linkAssets: [ Array ],
    assets: [ Array ]
  },
  methods: {
    handleClickAddRow () {
      let data = {
        newKey: this.keyOfNewAsset,
        values: {}
      };
      this.template.params.forEach(param => {
        data.values[param.id] = undefined;
      });
      this.newAssets.push(data);
      this.keyOfNewAsset++;
    },
    removeFromNewAsset (key) {
      this.newAssets = this.newAssets.filter(item => item.newKey !== key);
    }
  },
  watch: {
    template () {
      this.newAssets = [];
    }
  },
  components: {
    Tr
  }
};
</script>
