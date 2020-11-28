<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <HelloWorld msg="Welcome to Your Vue.js App" />
    {{ getAllCats.length }}
    {{ animalsCount }}
    <button @click="togglePetForm()" class="btn btn-primary">
      Add New Pet
    </button>

    <!-- PREVENDETAULT se utiliza para detener una acción por omisión (cancela) -->
    <b-form @submit.prevent="handleSubmit" v-if="showPetForm">
      <b-form-group id="input-group-2" label="Pet's Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="formData.name"
          required
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Species:" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="formData.species"
          :options="['cats', 'dogs']"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-2" label="Pet's Age:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="formData.age"
          required
          placeholder="Enter age"
          type="number"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  data() {
    return {
      showPetForm: false,
      formData: {
        name: "",
        age: 0,
        species: null,
      },
    };
  },
  computed: {
    ...mapGetters(["animalsCount", "getAllCats"]),
  },
  methods: {
    ...mapActions(["addPet"]),
    togglePetForm() {
      this.showPetForm = !this.showPetForm;
    },
    handleSubmit() {
      const { species, age, name } = this.formData;
      const payload = {
        species,
        pet: {
          name,
          age,
        },
      };
      this.addPet(payload);

      // reset from after submit

      this.formData = {
        name: "",
        age: 0,
        species: null,
      };
    },
  },
};
</script>
