<template>
  <div class="table-wrapper">
    <table class="table">
      <thead>
        <tr>
          <th :colspan="this.params.length + 2">
            <div class="title title--sm">
              «{{ template.title }}» [{{ paramId }} = {{ parentAssetId }}]
            </div>
          </th>
        </tr>
        <tr>
          <th>id</th>
          <th v-for="param in params" :key="param.id">{{ param.title }}</th>
          <th></th>
        </tr>
      </thead>
      <LinkedTableTr v-for="asset in assets"
                     :asset="asset"
                     :template="template"
                     :parentAssetId="parentAssetId"
                     :params="params"
                     :key="asset.id"/>
      <LinkedTableTr v-for="asset in newAssets"
                     :asset="asset"
                     :template="template"
                     :parentAssetId="parentAssetId"
                     :params="params"
                     :keyOfNewAsset="asset.newKey"
                     @removeFromNewAsset="removeFromNewAsset"
                     :key="asset.newKey"/>
      <tbody>
        <tr>
          <td :colspan="this.params.length + 2"><button @click="handleClickAddRow" class="button button--success button--full"><i class="fas fa-plus"></i> Добавить</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import LinkedTableTr from './LinkedTableTr';

export default {
  data () {
    return {
      newAssets: [],
      keyOfNewAsset: 0
    };
  },
  props: {
    template: [ Object ],
    paramId: [ String ],
    assets: [ Array ],
    parentAssetId: [ Number ]
  },
  computed: {
    params () {
      return this.template.params.filter(item => item.id !== this.paramId);
    }
  },
  methods: {
    handleClickAddRow () {
      let data = {
        newKey: this.keyOfNewAsset,
        values: {}
      };
      this.template.params.forEach(param => {
        data.values[param.id] = '';
      });
      data.values[this.paramId] = this.parentAssetId;
      this.newAssets.push(data);
      this.keyOfNewAsset++;
    },
    removeFromNewAsset (key) {
      const index = this.newAssets.findIndex(item => item.newKey === key);
      this.newAssets.splice(index, 1);
    }
  },
  components: {
    LinkedTableTr
  }
};
</script>
