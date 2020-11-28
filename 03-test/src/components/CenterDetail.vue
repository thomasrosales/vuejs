<template>
    <div v-if="getCenterName !== null">
    <h1>{{ getCenterName }}</h1>
    <br>
    <b-table striped hover :items="getCenter"></b-table>
  </div>
</template>

<script>

// VUEX
import { mapGetters } from 'vuex'

export default {
  props: {
    items: Array
  },
  computed: {
    ...mapGetters(['getCenterName', 'getCenter'])
  }
}
</script>
