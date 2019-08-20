<template>
  <div>
    <Header />
    <Sidebar />
    <div class="btn3333">hello</div>
    <br />
    <router-view />
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
  &3333 {
    display: inline-block;
    background: rebeccapurple;
    color: white;
    @apply font-bold;
    @apply py-2;
    @apply px-4;
    @apply rounded;
  }
}
</style>
