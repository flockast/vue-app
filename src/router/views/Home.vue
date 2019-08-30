<template>
  <div>
    <Counter />
  </div>
</template>

<script>
import Counter from '@/components/Counter.vue';
export default {
  components: {
    Counter
  }
};
</script>

<style lang="scss">
.pseudo-content {
  height: 1000px;
  width: 300px;
  border: 2px solid green;
  border-radius: 5px;
}
</style>
