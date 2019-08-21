<template>
  <div class="container">
    <div class="grid">
      <div class="cell cell--12">
        <Header />
      </div>
      <div class="cell cell--12 cell--md-4">
        <Sidebar />
      </div>
      <div class="cell cell--12 cell--md-8">
        <router-view></router-view>
      </div>
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

<style lang="scss">
.btn {
  color: red;
}
</style>
