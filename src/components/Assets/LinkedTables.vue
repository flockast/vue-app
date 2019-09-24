<template>
  <div>
    <div class="table-wrapper" v-for="linked in linkedTemplatesWidthAssets" :key="linked.template.id">
      <table class="table">
        <thead>
        <tr>
          <th :colspan="linked.template.params.length + 2">{{ linked.template.title }}:</th>
        </tr>
        <tr>
          <th>id</th>
          <th v-for="param in linked.template.params" :key="param.id">{{ param.title }}</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="asset in linked.assets" :key="asset.id" :class="{'select-as-removed': removedAssetsList.includes(asset.id)}">
          <td>{{ asset.id }}</td>
          <td v-for="param in linked.template.params" :key="param.id">
            <input type="text" class="input input--full" v-model="asset.values[param.id]">
          </td>
          <td>
            <div class="table-options">
              <div class="table-options__item">
                <button class="table-option-btn table-option-btn--remove" @click="$emit('handleClickRemove', asset.id)">
                  <i class="far fa-trash-alt"></i>
                </button>
              </div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    linkedTemplatesWidthAssets: [ Array ],
    removedAssetsList: [ Array ]
  },
  computed: {

  },
  methods: {

  }
};
</script>
