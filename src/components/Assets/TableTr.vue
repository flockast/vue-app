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
        <div v-if="param.type.type === 'boolean'" class="checkbox checkbox--readonly">
          <input type="checkbox" class="checkbox__input" :checked="asset.values[param.id]" readonly onclick="return false;">
          <div class="checkbox__control"></div>
        </div>
        <input v-else-if="param.type.type === 'link'" :value="getTitleByLinkAsset (
              linkAssets.find(
                item => item.templateId === param.type.linkId && item.id === asset.values[param.id]
              )
            )" class="input input--readonly" readonly/>
        <span v-else-if="param.type.type === 'list'">list</span>
        <input v-else :value="asset.values[param.id]" class="input input--readonly" readonly/>
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
                           @change="handleChangeInput(param.id)">
                    <div class="checkbox__control"></div>
                  </div>
                  <select v-else-if="param.type.type === 'link'" class="select select--full"
                          v-model="localAsset.values[param.id]"
                          @change="handleChangeInput(param.id)">
                    <option v-for="linkAsset in linkAssets.filter(item => item.templateId === param.type.linkId)"
                            :value="linkAsset.id"
                            :selected="asset.values[param.id] === linkAsset.id"
                            :key="linkAsset.id">
                      {{ getTitleByLinkAsset(linkAsset) }}
                    </option>
                  </select>
                  <textarea v-else-if="param.type.type === 'list'" class="input input--full"
                            v-model="localAsset.values[param.id]"
                            @input="handleChangeInput(param.id)"></textarea>
                  <input v-else type="text" class="input input--full"
                         v-model="localAsset.values[param.id]"
                         @input="handleChangeInput(param.id)">
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
    handleChangeInput (paramId) {
      const param = this.template.params.find(item => item.id === paramId);
      // reset for empty value
      this.localAsset.values[paramId] = this.localAsset.values[paramId] || undefined;
      if (param.type.type === 'list') {
        // check like a object
        if (this.localAsset.values[paramId] !== JSON.stringify(this.asset.values[paramId])) {
          this.addToEditedValues(paramId);
        } else {
          this.removeFromEditedValues(paramId);
        }
      } else if (param.type.type === 'boolean') {
        // check like a boolean
        if (this.localAsset.values[paramId] !== this.asset.values[paramId]) {
          this.addToEditedValues(paramId);
        } else {
          this.removeFromEditedValues(paramId);
        }
        this.localAsset.values[paramId] = this.localAsset.values[paramId] || false;
      } else {
        // check others types (number, string)
        if (String(this.localAsset.values[paramId]) !== String(this.asset.values[paramId])) {
          this.addToEditedValues(paramId);
        } else {
          this.removeFromEditedValues(paramId);
        }
        this.localAsset.values[paramId] = this.localAsset.values[paramId] || '';
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
