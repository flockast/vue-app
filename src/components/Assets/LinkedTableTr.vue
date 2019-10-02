<template>
  <tbody>
    <tr :class="{'is-edited': isEdited, 'is-loading': isLoading}">
      <td>{{ localAsset.id }}</td>
      <td v-for="(param, index) in params" :key="index">
        <div v-if="param.type.type === 'boolean'" class="checkbox">
          <input type="checkbox" class="checkbox__input"
                 @change="handleChangeInput"
                 v-model="localAsset.values[param.id]">
          <div class="checkbox__control"></div>
        </div>
        <select v-else-if="param.type.type === 'link'" class="select select--full"
                @change="handleChangeInput"
                v-model="localAsset.values[param.id]">
          <option v-for="linkAsset in linkAssets.filter(item => item.templateId === param.type.linkId)"
                  :value="linkAsset.id"
                  :selected="asset.values[param.id] === linkAsset.id"
                  :key="linkAsset.id">
            {{ getTitleByLinkAsset(linkAsset) }}
          </option>
        </select>
        <input v-else type="text" class="input input--full"
               @input="handleChangeInput"
               v-model="localAsset.values[param.id]">
      </td>
      <td>
        <div class="options options--right">
          <div class="options__item">
            <button v-if="isEdited" class="option-btn option-btn--clear" @click="handleClickClear">
              <i class="fas fa-broom"></i>
            </button>
          </div>
          <div class="options__item">
            <button v-if="isEdited" class="option-btn option-btn--save" @click="handleClickSave">
              <i class="far fa-save"></i>
            </button>
          </div>
          <div class="options__item">
            <button class="option-btn option-btn--remove" :class="{'is-ready': isReadyToRemove}" @click="handleClickRemove">
              <i class="far fa-trash-alt"></i>
            </button>
          </div>
        </div>
      </td>
    </tr>
  </tbody>
</template>

<script>
import _ from 'lodash';
import { mapActions } from 'vuex';

export default {
  data () {
    return {
      isEdited: false,
      isLoading: false,
      isReadyToRemove: false,
      localAsset: {}
    };
  },
  props: {
    asset: [ Object ],
    template: [ Object ],
    parentAssetId: [ Number ],
    params: [ Array ],
    keyOfNewAsset: [ Number ],
    linkAssets: [ Array ]
  },
  methods: {
    ...mapActions('linkedAssets', ['updateAsset', 'removeAsset', 'createAsset']),
    initial () {
      this.localAsset = _.cloneDeep(this.asset);
      this.isEdited = false;
      this.isLoading = false;
    },
    handleChangeInput () {
      let keys = Object.keys(this.localAsset.values);
      for (let i = 0; i < keys.length; i++) {
        const param = this.template.params.find(item => item.id === keys[i]);
        if (this.localAsset.values[keys[i]] === '') this.localAsset.values[keys[i]] = undefined;
        if (param.type.type === 'list') {
          // check like a object
          if (JSON.stringify(this.localAsset.values[keys[i]]) !== JSON.stringify(this.asset.values[keys[i]])) {
            this.isEdited = true;
            return;
          }
        } else {
          // check others types (number, string, boolean)
          if (String(this.localAsset.values[keys[i]]) !== String(this.asset.values[keys[i]])) {
            this.isEdited = true;
            return;
          }
        }
      }
      this.isEdited = false;
    },
    handleClickClear () {
      this.initial();
    },
    async handleClickSave () {
      this.isLoading = true;
      if (_.isUndefined(this.keyOfNewAsset)) {
        await this.updateAsset({
          parentAssetId: this.parentAssetId,
          templateId: this.template.id,
          data: {
            [this.localAsset.id]: { data: this.localAsset }
          }
        });
      } else {
        await this.createAsset({
          parentAssetId: this.parentAssetId,
          templateId: this.template.id,
          data: {
            '0': { data: this.localAsset }
          }
        });
        this.$emit('removeFromNewAsset', this.keyOfNewAsset);
      }
      this.isLoading = false;
    },
    async handleClickRemove () {
      if (!this.isReadyToRemove) {
        this.isReadyToRemove = !this.isReadyToRemove;
        return;
      }
      this.isLoading = true;
      if (_.isUndefined(this.keyOfNewAsset)) { // remove Asset
        await this.removeAsset({
          parentAssetId: this.parentAssetId,
          templateId: this.template.id,
          data: [this.localAsset.id]
        });
      } else {
        this.$emit('removeFromNewAsset', this.keyOfNewAsset);
      }
      this.isLoading = false;
    },
    getTitleByLinkAsset (asset) {
      if (!asset) return '';
      if (asset.values) {
        if (asset.values.title) return asset.values.title;
        if (asset.values.code) return asset.values.code;
      } else {
        return asset.id;
      }
    }
  },
  watch: {
    asset () {
      this.initial();
    }
  },
  created () {
    this.initial();
  }
};
</script>
