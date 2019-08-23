<template>
  <div>
    <div>{{ counter }}</div>
    <button @click="increment">up</button>

  </div>
</template>

<script>
export default {
  computed: {
  	counter () {
      return this.$store.state.count
    }
  },
  methods: {
    increment (event) {
    	this.$store.commit('increment')
    }
  }
}
</script>
