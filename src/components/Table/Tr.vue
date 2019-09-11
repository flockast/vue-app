<template>
  <tbody>
    <tr :class="{'is-opened': isOpen}">
      <td>{{ object.id }}</td>
      <td v-for="(param, index) in template.params" :key="index">
        <span v-if="param.type.type === 'list'">list</span>
        <span v-else>{{ object.values[param.id] }}</span>
      </td>
      <td>
        <div class="table-options">
          <div class="table-options__item">
            <button class="table-option-btn table-option-btn--save">
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
    <tr v-if="isOpen" class="sub">
    <td :colspan="template.params.length + 2">
      <div class="grid">
        <div class="cell cell--4">
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
        <div class="cell cell--8">
          <div class="table-wrapper">
            <table class="table">
              <thead>
                <tr>
                  <th colspan="3">films:</th>
                </tr>
                <tr>
                  <th>id</th>
                  <th>hidden</th>
                  <th>title</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>3210</td>
                  <td>
                    <div class="checkbox">
                      <input class="checkbox__input" type="checkbox">
                      <div class="checkbox__control" aria-hidden="true"></div>
                    </div>
                  </td>
                  <td><input type="text" class="input input--full" value="batman"></td>
                </tr>
                <tr>
                  <td>3211</td>
                  <td><input type="checkbox"></td>
                  <td><input type="text" class="input input--full" value="robin"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </td>
</tr>
  </tbody>
</template>

<script>
import _ from 'lodash';

export default {
  props: {
    object: [ Object ],
    template: [ Object ]
  },
  data () {
    return {
      isOpen: false,
      localObject: {}
    };
  },
  methods: {
    toggleSub () {
      this.isOpen = !this.isOpen;
    }
  },
  created () {
    this.localObject = _.cloneDeep(this.object);
  }
};
</script>
