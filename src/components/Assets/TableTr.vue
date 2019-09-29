<template>
  <tbody>
    <tr :class="{'is-opened': isOpen, 'is-loading': isLoading, 'is-edited': isEdited}">
      <td>{{ asset.id }}</td>
      <td v-for="(param, index) in template.params" :key="index">
        <span v-if="param.type.type === 'list'">list</span>
        <div v-else-if="param.type.type === 'boolean'" class="checkbox checkbox--readonly">
          <input type="checkbox" class="checkbox__input" :checked="asset.values[param.id]" readonly onclick="return false;">
          <div class="checkbox__control"></div>
        </div>
        <input v-else :value="asset.values[param.id]" class="input input--readonly" readonly/>
      </td>
      <td>
        <div class="options options--right">
          <div class="options__item">
            <button
                class="option-btn option-btn--open"
                @click="toggleSub"
                :class="{'is-opened': isOpen}">
              <i class="fas fa-chevron-down option-btn__icon"></i>
            </button>
          </div>
        </div>
      </td>
    </tr>
    <tr v-if="isOpen" class="sub" :class="{'is-loading': isLoading}">
    <td :colspan="template.params.length + 2">
      <div class="sub-row">
        <div class="sub-col sub-col--main">
          <div class="table-wrapper">
            <table class="table">
              <thead>
              <tr>
                <th>id</th>
                <th>{{ localAsset.id }}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(param, index) in template.params" :key="index">
                <td>{{ param.title }}</td>
                <td>
                  <div v-if="param.type.type === 'boolean'" class="checkbox">
                    <input type="checkbox" class="checkbox__input"
                           @change="handleChangeInput"
                           v-model="localAsset.values[param.id]">
                    <div class="checkbox__control"></div>
                  </div>
                  <span v-else>
                    <input type="text" class="input input--full"
                           @input="handleChangeInput"
                           v-model="localAsset.values[param.id]">
                  </span>
                </td>
              </tr>
              <tr>
                <td :colspan="2">
                  <div class="options">
                    <div class="options__item">
                      <button class="option-btn option-btn--remove" :class="{'is-ready': isReadyToRemove}" @click="handleClickRemove">
                        <i class="far fa-trash-alt"></i>
                      </button>
                    </div>
                    <div class="options__item">
                      <button v-if="isEdited" class="option-btn option-btn--save" @click="handleClickSave">
                        <i class="far fa-save"></i>
                      </button>
                    </div>
                    <div class="options__item">
                      <button v-if="isEdited" class="option-btn option-btn--clear" @click="handleClickClear">
                        <i class="fas fa-broom"></i>
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="sub-col sub-col--full">
          <LinkedTables :asset="asset" :template="template"/>
        </div>
      </div>
    </td>
    </tr>
  </tbody>
</template>

<script>
import _ from 'lodash';
import { mapActions } from 'vuex';
import LinkedTables from './LinkedTables';

export default {
  props: {
    asset: [ Object ],
    template: [ Object ],
    keyOfNewAsset: [ Number ]
  },
  data () {
    return {
      isOpen: false,
      isLoading: false,
      isEdited: false,
      isReadyToRemove: false,
      localAsset: {}
    };
  },
  methods: {
    ...mapActions('assets', ['updateAsset', 'createAsset', 'removeAsset', 'removeFromNewAssets']),
    initial () {
      this.asset.values = this.asset.values || {};
      this.localAsset = _.cloneDeep(this.asset);
      // open asset - if it's a new asset
      this.isOpen = !_.isUndefined(this.keyOfNewAsset);
      this.isEdited = false;
    },
    toggleSub () {
      this.isOpen = !this.isOpen;
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
      this.localAsset = _.cloneDeep(this.asset);
      this.isEdited = false;
    },
    async handleClickSave () {
      this.isLoading = true;
      if (_.isUndefined(this.keyOfNewAsset)) { // update
        await this.updateAsset({
          [this.localAsset.id]: { data: this.localAsset }
        });
      } else { // create
        await this.createAsset({
          key: this.keyOfNewAsset,
          templateId: this.template.id,
          data: {
            '0': { data: this.localAsset }
          }
        });
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
        await this.removeAsset([this.localAsset.id]);
      } else { // remove from New Assets List
        this.removeFromNewAssets(this.keyOfNewAsset);
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
  },
  components: {
    LinkedTables
  }
};
</script>

<style lang="scss">
.sub-container {
  width: 100%;
  overflow: hidden;
}
.sub-row {
  display: flex;
  margin: 0 -.5rem;
}
.sub-col {
  padding: 0 .5rem;
  &--main {
    width: 300px;
  }
  &--full {
    flex: 1;
  }
}
</style>
