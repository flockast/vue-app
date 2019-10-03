<template>
  <tbody>
    <tr :class="{'is-opened': isOpen, 'is-loading': isLoading, 'is-edited': !isEmpty(editedValues)}">
      <td>
        <div class="options">
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
      <td>{{ asset.id }}</td>
      <td v-for="(param, index) in template.params" :key="index">
        <div v-if="asset.values[param.id]">
          <div v-if="param.type.type === 'boolean'" class="checkbox checkbox--readonly">
            <input type="checkbox" class="checkbox__input" :checked="asset.values[param.id]" readonly onclick="return false;">
            <div class="checkbox__control"></div>
          </div>
          <span v-else-if="param.type.type === 'link'">
            {{
              getTitleByLinkAsset (
                linkAssets.find(
                  item => item.templateId === param.type.linkId && item.id === asset.values[param.id]
                )
              )
            }}
          </span>
          <span v-else-if="param.type.type === 'list'">list</span>
          <input v-else :value="asset.values[param.id]" class="input input--readonly" readonly/>
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
              <tr v-for="(param, index) in template.params"
                  :class="{'is-edited': editedValues.includes(param.id)}"
                  :key="index">
                <td>{{ param.title }}</td>
                <td>
                  <div v-if="param.type.type === 'boolean'" class="checkbox">
                    <input type="checkbox" class="checkbox__input"
                           v-model="localAsset.values[param.id]"
                           @change="handleChangeInput">
                    <div class="checkbox__control"></div>
                  </div>
                  <select v-else-if="param.type.type === 'link'" class="select select--full"
                          v-model="localAsset.values[param.id]"
                          @change="handleChangeInput">
                    <option v-for="linkAsset in linkAssets.filter(item => item.templateId === param.type.linkId)"
                            :value="linkAsset.id"
                            :selected="asset.values[param.id] === linkAsset.id"
                            :key="linkAsset.id">
                      {{ getTitleByLinkAsset(linkAsset) }}
                    </option>
                  </select>
                  <textarea v-else-if="param.type.type === 'list'" class="input input--full"
                            v-model="localAsset.values[param.id]"
                            @input="handleChangeInput"></textarea>
                  <input v-else type="text" class="input input--full"
                         v-model="localAsset.values[param.id]"
                         @input="handleChangeInput">
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
                      <button v-if="!isEmpty(editedValues)" class="option-btn option-btn--save" @click="handleClickSave">
                        <i class="far fa-save"></i>
                      </button>
                    </div>
                    <div class="options__item">
                      <button v-if="!isEmpty(editedValues)" class="option-btn option-btn--clear" @click="handleClickClear">
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
import helpers from '../../mixins/helpers';
import { mapActions } from 'vuex';
import LinkedTables from './LinkedTables';

export default {
  props: {
    asset: [ Object ],
    linkAssets: [ Array ],
    template: [ Object ],
    keyOfNewAsset: [ Number ]
  },
  data () {
    return {
      isOpen: false,
      isLoading: false,
      isReadyToRemove: false,
      editedValues: [],
      localAsset: {}
    };
  },
  mixins: [ helpers ],
  methods: {
    ...mapActions('assets', ['updateAsset', 'createAsset', 'removeAsset']),
    initial () {
      this.initialAllData();
      // open asset - if it's a new asset
      this.isOpen = !_.isUndefined(this.keyOfNewAsset);
    },
    initialAllData () {
      this.asset.values = this.asset.values || {};
      this.localAsset = _.cloneDeep(this.asset);
      // default list object convert to string
      const listParams = this.template.params.filter(param => param.type.type === 'list');
      listParams.forEach(param => {
        this.localAsset.values[param.id] = JSON.stringify(this.localAsset.values[param.id]);
      });
      this.editedValues = [];
    },
    toggleSub () {
      this.isOpen = !this.isOpen;
    },
    handleChangeInput () {
      const keys = Object.keys(this.localAsset.values);
      for (let i = 0; i < keys.length; i++) {
        const param = this.template.params.find(item => item.id === keys[i]);
        // reset for empty values
        this.localAsset.values[keys[i]] = this.localAsset.values[keys[i]] || undefined;
        if (param.type.type === 'list') {
          // check like a object
          if (this.localAsset.values[keys[i]] !== JSON.stringify(this.asset.values[keys[i]])) {
            this.addToEditedValues(keys[i]);
          } else {
            this.removeFromEditedValues(keys[i]);
          }
        } else if (param.type.type === 'boolean') {
          // check like a boolean
          if (this.localAsset.values[keys[i]] !== this.asset.values[keys[i]]) {
            this.addToEditedValues(keys[i]);
          } else {
            this.removeFromEditedValues(keys[i]);
          }
          this.localAsset.values[keys[i]] = this.localAsset.values[keys[i]] || false;
        } else {
          // check others types (number, string)
          if (String(this.localAsset.values[keys[i]]) !== String(this.asset.values[keys[i]])) {
            this.addToEditedValues(keys[i]);
          } else {
            this.removeFromEditedValues(keys[i]);
          }
          this.localAsset.values[keys[i]] = this.localAsset.values[keys[i]] || '';
        }
      }
    },
    addToEditedValues (value) {
      if (!this.editedValues.includes(value)) this.editedValues.push(value);
    },
    removeFromEditedValues (value) {
      this.editedValues = this.editedValues.filter(item => item !== value);
    },
    handleClickClear () {
      this.initialAllData();
    },
    async handleClickSave () {
      this.isLoading = true;
      if (_.isUndefined(this.keyOfNewAsset)) { // update
        await this.updateAsset({
          [this.localAsset.id]: { data: this.localAsset }
        });
      } else { // create
        await this.createAsset({
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
        await this.removeAsset([this.localAsset.id]);
      } else { // remove from New Assets List
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
      this.initialAllData();
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
