<template>
  <div class="wrapper">
    <div class="wrapper__header">
      <Header />
    </div>
    <div class="wrapper__sidebar">
      <Sidebar />
    </div>
    <div class="wrapper__content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue";

export default {
  name: "app",
  components: {
    Header,
    Sidebar
  }
};
</script>

<style lang="scss"></style>
