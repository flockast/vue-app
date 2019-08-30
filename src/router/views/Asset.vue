<template>
  <div>
    <span>{{ $route.params.id }}</span>
    <Table />
  </div>
</template>

<script>
import Table from '@/components/table/Table';
export default {
  components: {
    Table
  }
};
</script>
