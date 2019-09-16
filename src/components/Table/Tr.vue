<template>
  <tbody>
    <tr :class="{'is-opened': isOpen, 'is-loading': isLoading}">
      <td>{{ object.id }}</td>
      <td v-for="(param, index) in template.params" :key="index">
        <span v-if="param.type.type === 'list'">list</span>
        <span v-else>{{ object.values[param.id] }}</span>
      </td>
      <td>
        <div class="table-options">
          <div class="table-options__item">
            <button class="table-option-btn table-option-btn--save" @click="save">
              <i class="far fa-save"></i>
            </button>
          </div>
          <div class="table-options__item">
            <button class="table-option-btn table-option-btn--remove">
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
                <th>{{ object.id }}</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td>Hidden</td>
                <td>
                  <div class="checkbox">
                    <input type="checkbox" class="checkbox__input" v-model="localObject.hidden">
                    <div class="checkbox__control"></div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>Tags</td>
                <td>
                  <input type="text" class="input input--full" v-model="localObject.tags">
                </td>
              </tr>
              <tr v-for="(param, index) in template.params" :key="index">
                <td>{{ param.title }}</td>
                <td>
                  <div v-if="param.type.type === 'boolean'" class="checkbox">
                    <input type="checkbox" class="checkbox__input" v-model="localObject.values[param.id]">
                    <div class="checkbox__control"></div>
                  </div>
                  <span v-else>
                    <input type="text" class="input input--full" v-model="localObject.values[param.id]">
                  </span>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="sub-col sub-col--full" v-if="notEmptyArray(currentChildren)">
          <div v-for="(child, index) in currentChildren" :key="index">
            <div class="table-wrapper" v-if="notEmptyArray(child.objects)">
            <table class="table">
              <thead>
                <tr>
                  <th :colspan="child.template.params.length + 2">{{ child.template.title }}:</th>
                </tr>
                <tr>
                  <th>id</th>
                  <th>hidden</th>
                  <th v-for="param in child.template.params" :key="param.id">{{ param.title }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(object, index) in child.objects" :key="index">
                  <td>{{ object.id }}</td>
                  <td>
                    <div class="checkbox">
                      <input type="checkbox" class="checkbox__input" v-model="object.hidden">
                      <div class="checkbox__control"></div>
                    </div>
                  </td>
                  <td v-for="(param, index) in child.template.params" :key="index">
                    <input type="text" class="input input--full" v-model="object.values[param.id]">
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          </div>
        </div>
      </div>
    </td>
    </tr>
  </tbody>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import helpers from '../../mixins/helpers';
import _ from 'lodash';
import ObjectApi from '../../api/Object';

export default {
  props: {
    object: [ Object ],
    template: [ Object ]
  },
  data () {
    return {
      isOpen: false,
      isLoading: false,
      localObject: {},
      currentChildren: []
    };
  },
  computed: {
    ...mapGetters('template', ['childrenTemplates']),
    ...mapGetters('object', ['childrenObjects'])
  },
  mixins: [ helpers ],
  methods: {
    ...mapActions('object', ['update']),
    toggleSub () {
      this.isOpen = !this.isOpen;
    },
    async save () {
      this.isLoading = true;
      // preparation data main object
      let data = {
        [this.localObject.id]: {
          data: {
            revision: this.localObject.revision,
            hidden: this.localObject.hidden,
            tags: this.localObject.tags,
            values: this.localObject.values
          }
        }
      };
      // preparation data children objects
      this.currentChildren.forEach(child => {
        child.objects.forEach(object => {
          data[object.id] = {
            data: {
              revision: object.revision,
              hidden: object.hidden,
              values: object.values
            }
          };
        });
      });
      await ObjectApi.update(data);
      // todo: need to update vuex objects
      this.isLoading = false;
    }
  },
  created () {
    this.localObject = _.cloneDeep(this.object);
    this.childrenTemplates.forEach(template => {
      this.currentChildren.push({
        template: template.template,
        paramId: template.paramId,
        objects: this.childrenObjects.filter(object => object.values[template.paramId] === this.object.id)
      });
    });
    this.currentChildren = _.cloneDeep(this.currentChildren);
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
