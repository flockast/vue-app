<template>
  <div class="table-wrapper">
    <table class="table">
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>date</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <Tr />
        <Tr />
        <Tr />
        <Tr />
      </tbody>
    </table>
  </div>
</template>

<script>
import Tr from './Tr';
export default {
  data () {
    return {
      assets: [
        {
          id: 1,
          name: 'name',
          date: 'today',
          childrens: [
            {

            }
          ]
        }
      ]
    };
  },
  components: {
    Tr
  }
};
</script>
