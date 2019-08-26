<template>
  <div>
    <div>{{ count }}</div>
    <div>
      <button @click="up">up</button>
      <button @click="down">down</button>
    </div>
    <div>
      sign of counter: {{ sign }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  computed: {
    ...mapGetters('counter', ['count', 'is_positive']),
    sign () {
      if (this.is_positive === 0) return 'zero';
      return this.is_positive ? 'positive' : 'negative';
    }
  },
  methods: {
    ...mapActions('counter', ['up', 'down'])
  }
};
</script>
