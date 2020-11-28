<template>
  <div>
    <p>Route Param: {{ $route.params.id }}</p>
    <p>Animal from store: {{ animal.name }}</p>
  </div>
</template>


<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      animal: {},
    };
  },
  computed: {
    ...mapState(["cats", "dogs"]),
    // cats() {
    //   return this.$store.state.cats;
    // }
  },
  methods: {
    pet() {
      const animal = this["cats"][this.$route.params.id];
      return animal;
    },
  },
  mounted() {
    const animal = this["cats"][this.$route.params.id];
    this.animal = animal;
  },
};
</script>
