<template>
  <div v-if="next" class="table-wrapper">
    <table class="table">
      <thead>
        <tr>
          <th :colspan="this.params.length + 2">
            <div class="title title--sm">
              <router-link :to="{name: 'assets', params: {id: template.id}}"
                           :exact="true">
                {{ template.title }}
              </router-link>
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
                     :linkAssets="linkAssets"
                     :key="asset.id"/>
      <LinkedTableTr v-for="asset in newAssets"
                     :asset="asset"
                     :template="template"
                     :parentAssetId="parentAssetId"
                     :params="params"
                     :linkAssets="linkAssets"
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
import _ from 'lodash';
import Asset from '../../api/Asset';
import LinkedTableTr from './LinkedTableTr';

export default {
  data () {
    return {
      linkAssets: [],
      newAssets: [],
      keyOfNewAsset: 0,
      next: false
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
    async getLinkAssets () {
      // get linkAssets for selects
      let linkAssets = [];
      const paramsLink = this.template.params.filter(param => param.type.type === 'link' && param.id !== this.paramId);
      if (!_.isEmpty(paramsLink)) linkAssets = await Asset.fetchByTemplates(...paramsLink.map(item => item.type.linkId));
      this.linkAssets = linkAssets;
    },
    handleClickAddRow () {
      let data = {
        newKey: this.keyOfNewAsset,
        values: {}
      };
      this.template.params.forEach(param => {
        data.values[param.id] = undefined;
      });
      data.values[this.paramId] = this.parentAssetId;
      this.newAssets.push(data);
      this.keyOfNewAsset++;
    },
    removeFromNewAsset (key) {
      this.newAssets = this.newAssets.filter(item => item.newKey !== key);
    }
  },
  created () {
    this.getLinkAssets().finally(() => { this.next = true; });
  },
  components: {
    LinkedTableTr
  }
};
</script>
