<template>
  <div class="table-wrapper">
    <table class="table">
      <thead>
        <tr>
          <th>id</th>
          <th v-for="(param, index) in template.params" :key="index">{{ param.title }}</th>
          <th></th>
        </tr>
      </thead>
      <Tr v-for="asset in assets"
          :asset="asset"
          :template="template"
          :key="asset.id"/>
    </table>
  </div>
</template>

<script>
import Tr from './Tr';

export default {
  props: {
    template: [Object],
    assets: [Array]
  },
  components: {
    Tr
  }
};
</script>
