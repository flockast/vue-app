<template>
  <div>
    <div class="title title--lg">{{ template.title }}</div>
    <router-link class="button mb-4" :to="{name: 'assets', params: { id: template.id}}" :exact="true">
      <i class="fas fa-chevron-left"></i> Элементы шаблона «{{ template.title }}»</router-link>
  </div>
</template>

<script>
export default {
  computed: {
    template () {
      return this.$store.getters['templates/getTemplateById'](this.$route.params.id);
    }
  }
};
</script>
