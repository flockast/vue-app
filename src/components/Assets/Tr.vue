<template>
  <tbody>
    <tr :class="{'is-opened': isOpen, 'is-loading': isLoading}">
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
        <div class="table-options">
          <div class="table-options__item">
            <button class="table-option-btn table-option-btn--save" @click="handleClickSave">
              <i class="far fa-save"></i>
            </button>
          </div>
          <div class="table-options__item">
            <button class="table-option-btn table-option-btn--remove" @click="handleClickRemove">
              <i class="far fa-trash-alt"></i>
            </button>
          </div>
          <div class="table-options__item">
            <button
                class="table-option-btn table-option-btn--open"
                @click="toggleSub"
                :class="{'is-opened': isOpen}">
              <i class="fas fa-chevron-up table-option-btn__icon"></i>
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
                <th>{{ asset.id }}</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(param, index) in template.params" :key="index">
                <td>{{ param.title }}</td>
                <td>
                  <div v-if="param.type.type === 'boolean'" class="checkbox">
                    <input type="checkbox" class="checkbox__input" v-model="asset.values[param.id]">
                    <div class="checkbox__control"></div>
                  </div>
                  <span v-else>
                    <input type="text" class="input input--full" v-model="asset.values[param.id]">
                  </span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="sub-col sub-col--full" v-if="notEmptyArray(linkedTemplatesWidthAssets)">
          <LinkedTables :linkedTemplatesWidthAssets="linkedTemplatesWidthAssets" />
        </div>
      </div>
    </td>
    </tr>
  </tbody>
</template>

<script>
import _ from 'lodash';
import { mapGetters, mapActions } from 'vuex';
import helpers from '../../mixins/helpers';
import LinkedTables from './LinkedTables';

export default {
  props: {
    asset: [ Object ],
    template: [ Object ]
  },
  data () {
    return {
      isOpen: false,
      isLoading: false,
      linkedTemplatesWidthAssets: []
    };
  },
  computed: {
    ...mapGetters('template', ['currentLinkedTemplates', 'getTemplateById']),
    ...mapGetters('asset', ['getAssetsByTemplateId'])
  },
  mixins: [ helpers ],
  methods: {
    ...mapActions('asset', ['updateAssets']),
    toggleSub () {
      this.isOpen = !this.isOpen;
    },
    async handleClickSave () {
      this.isLoading = true;

      // prepare to update main asset
      let updateData = {
        [this.asset.id]: { data: this.asset }
      };

      // prepare to update linked assets
      if (this.linkedTemplatesWidthAssets.length > 0) {
        this.linkedTemplatesWidthAssets.forEach(linked => {
          linked.assets.forEach(asset => {
            updateData[asset.id] = { data: asset };
          });
        });
      }

      // update assets
      await this.updateAssets(updateData);

      this.isLoading = false;
    },
    async handleClickRemove () {
      this.isLoading = true;
      this.isLoading = false;
    }
  },
  created () {
    this.linkedTemplatesWidthAssets = this.currentLinkedTemplates.map(linked => {
      let result = {};
      result.assets = this.getAssetsByTemplateId(linked.templateId, {
        id: linked.paramId,
        value: this.asset.id
      });
      if (result.assets.length === 0) return false;
      result.template = this.getTemplateById(linked.templateId);
      result.paramId = linked.paramId;
      return result;
    });
    this.linkedTemplatesWidthAssets = _.compact(this.linkedTemplatesWidthAssets);
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
