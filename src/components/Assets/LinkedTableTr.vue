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
    keyOfNewAsset: [ Number ]
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
        if (this.localAsset.values[keys[i]] !== this.asset.values[keys[i]]) {
          this.isEdited = true;
          return;
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
