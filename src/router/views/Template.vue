<template>
  <div>
    <span>{{ $route.params.id }}</span>
    <Table />
  </div>
</template>

<script>
import Table from '../../components/Table/Table';
export default {
  components: {
    Table
  }
};
</script>
