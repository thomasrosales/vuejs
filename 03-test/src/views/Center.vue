<template>
  <div>
    <!-- Content here -->
    <b-row>
        <b-col>
          <h1>Centros Activos</h1>
          <p>
            Para elegir un turno, debe seleccionar un centro disponible.
          </p>
          <hr>
          <LeafletMap v-bind:centers="centers"/>
        </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-button  @click="redirectTo(getCenter[0].id)" v-if="getCenter[0].id !== null">Turno Para {{ getCenter[0].name }}</b-button>
        <br>
        <br>
        <CenterDetail />
      </b-col>
    </b-row>
  </div>
</template>

<script>

// VUEX

import { mapGetters } from 'vuex'

// COMPONENTS

import LeafletMap from '@/components/LeafletMap'
import CenterDetail from '@/components/CenterDetail'

// PROVIDERS

import CenterService from '@/providers/center.services.js'

const centerService = new CenterService()

// HELP
// https://router.vuejs.org/guide/essentials/navigation.html

export default {
  name: 'Center',
  data () {
    return {
      centers: []
    }
  },
  components: {
    LeafletMap,
    CenterDetail
  },
  computed: {
    ...mapGetters(['getCenterName', 'getCenter'])
  },
  methods: {
    getCenters () {
      centerService.getCenters().then((data) => {
        console.log(data.data)
        this.centers = [...data.data.centers]
      })
    },
    redirectTo (centerId) {
      this.$router.push({ path: `/centers/${centerId}/appointment` })
    }
  },
  mounted () {
    this.getCenters()
  }
}
</script>
