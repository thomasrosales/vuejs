<template>
  <div style="height: 500px; width: 100%; ">
    <l-map
      v-if="showMap"
      :zoom="zoom"
      :center="center"
      style="height: 95%"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
      @click="addMarker($event)"
    >
      <l-tile-layer :url="url" :attribution="attribution" />
      <l-marker :lat-lng="ll.latLng" v-for="(ll, index) in listMarker" :key="index" @click="showInfoCenter(ll)">
        <l-popup>
          <div @click="innerClick">
            <p>
              <strong>{{ ll.name }}</strong><br>
              <i>Dirección: <span>{{ ll.address }}</span></i><br>
              <i>Horario: <span>{{ ll.opening_time }}- {{ ll.closing_time }}</span></i><br>
              <i>Teléfono: <span>{{ ll.telephone }}</span></i><br>
            </p>
          </div>
        </l-popup>
        <!-- <l-tooltip :options="{ permanent: true, interactive: true }">
          <div>
            I am a tooltip
            <a class="btn" @click="removeMarker(index)">remove</a>
            <p v-show="showParagraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
              Donec finibus semper metus id malesuada.
            </p>
          </div>
        </l-tooltip> -->
      </l-marker>
      <l-marker :lat-lng="newCenterPosition" @click="showInfoCenter(newCenterPosition)" v-if="newCenterPosition !== null">
        <l-popup>
          <div @click="innerClick">
            <p>
              Estoy en: {{ newCenterPosition }}
            </p>
          </div>
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script>

// COMPONENETS LEAFLET

import { latLng, Icon } from 'leaflet'
import { LMap, LTileLayer, LMarker, LPopup } from 'vue2-leaflet'

// VUEX

import { mapActions } from 'vuex'

// ICONS CONFIG

delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

// HELP

// https://es.vuejs.org/v2/guide/components-props.html
// https://vue2-leaflet.netlify.app/examples/simple.html

export default {
  name: 'LeafletMap',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
  props: {
    isNewCenter: Boolean,
    latitudeLongitude: Array,
    longitude: Number,
    centers: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {
      zoom: 8,
      center: latLng(-34.73439, -57.952713),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      withPopup: latLng(-34.73439, -57.952713),
      withTooltip: latLng(47.41422, -1.250482),
      currentZoom: 8,
      currentCenter: latLng(-34.73439, -57.952713),
      showParagraph: false,
      showMap: true,
      newCenterPosition: null
    }
  },
  computed: {
    listMarker () {
      var listMarker = []
      this.centers.forEach(element => {
        listMarker.push({
          id: element.id,
          latLng: latLng(element.latitude, element.longitude),
          name: element.name,
          address: element.address,
          opening_time: element.opening_time,
          closing_time: element.closing_time,
          telephone: element.telephone,
          center_type: element.center_type,
          created: element.created,
          district: element.district,
          email: element.email,
          latitude: element.latitude,
          longitude: element.longitude,
          visit_protocol: element.visit_protocol,
          website: element.website
        })
      })
      return listMarker
    }
  },
  mounted () {
  },
  methods: {
    ...mapActions(['updateCenter', 'updateCenterObject']),
    zoomUpdate (zoom) {
      this.currentZoom = zoom
    },
    centerUpdate (center) {
      this.currentCenter = center
    },
    showLongText () {
      this.showParagraph = !this.showParagraph
    },
    innerClick () {
      alert('Click!')
    },
    addMarker (event) {
      if (this.isNewCenter) {
        this.newCenterPosition = event.latlng
        const latitudeLongitudeTemp = [event.latlng.lat, event.latlng.lng]
        this.$emit('update:latitudeLongitude', latitudeLongitudeTemp)
      }
    },
    removeMarker (index) {
      if (this.isNewCenter) {
        this.newCenterPosition = null
      }
    },
    showInfoCenter (center) {
      this.updateCenter(center.id)
      const c = {
        id: center.id,
        name: center.name,
        address: center.address,
        openingTime: center.opening_time,
        closingTime: center.closing_time,
        telephone: center.telephone,
        centerType: center.center_type.name,
        district: center.district,
        email: center.email,
        latitude: center.latitude,
        longitude: center.longitude,
        visitProtocol: center.visit_protocol,
        website: center.website
      }
      this.updateCenterObject(c)
    }
  }
}
</script>
