<template>
  <div>
    <h1>Countries</h1>
    <b-table striped hover :items="cats">
      <template #cell(name)="data">
        <!-- `data.value` is the value after formatted by the Formatter -->
        <a :href="`/pet/${data.index}`">{{ data.value }}</a>
      </template>
    </b-table>
  </div>
</template>

<script>
import CoinDeskService from "@/services/coindesk.service.js";

const coinDeskService = new CoinDeskService();

export default {
  data() {
    return {
      cats: [],
    };
  },
  methods: {
    getPosts() {
      coinDeskService.getPosts().then((data) => {
        console.log(data.data);
        this.cats = data.data;
      });
    },
  },
  mounted() {
    this.getPosts();
  },
};
</script>
