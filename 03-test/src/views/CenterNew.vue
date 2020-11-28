<template>
  <div>
    <!-- Content here -->
    <b-row>
        <b-col>
          <h1>Solicitud de Centro</h1>
          <hr>
        </b-col>
    </b-row>
    <b-row>
        <b-col>
            <!-- https://es.vuejs.org/v2/cookbook/form-validation.html -->
            <b-form @submit="onSubmit">

            <!-- Name -->

            <b-form-group id="input-group-1" label="Nombre del Centro:" label-for="input-1">
                <b-form-input
                id="input-1"
                v-model="form.name"
                required
                placeholder="Centro Akos..."
                :state="Boolean(form.name)"
                ></b-form-input>
            </b-form-group>

            <!-- Address -->

            <b-form-group id="input-group-2" label="Dirección:" label-for="input-2">
                <b-form-input
                id="input-2"
                v-model="form.address"
                required
                placeholder="Calle 45.."
                :state="Boolean(form.address)"
                ></b-form-input>
            </b-form-group>

            <!-- Telephone -->

            <b-form-group id="input-group-3" label="Teléfono:" label-for="input-3">
                <b-form-input
                id="input-3"
                v-model="form.telephone"
                required
                placeholder="+5422.."
                :state="Boolean(form.telephone)"
                ></b-form-input>
            </b-form-group>

            <!-- Openenig Time -->

            <b-form-group id="input-group-4" label="Hora de Apertura:" label-for="input-4">
                <b-form-timepicker
                  id="input-4"
                  required
                  v-model="form.opening_time"
                  locale="es"
                  :state="Boolean(form.opening_time)"
                ></b-form-timepicker>
            </b-form-group>

            <!-- Closing Time -->

            <b-form-group id="input-group-5" label="Hora de Apertura:" label-for="input-5">
                <b-form-timepicker
                  id="input-5"
                  required
                  v-model="form.closing_time"
                  locale="es"
                  :state="Boolean(form.closing_time)"
                ></b-form-timepicker>
            </b-form-group>

            <!-- Center Type  -->

            <b-form-group id="input-group-6" label="Tipo de Centro:" label-for="input-6">
                <b-form-select
                id="input-6"
                v-model="form.center_type_id"
                :options="centerType"
                required
                :state="Boolean(form.center_type_id)"
                ></b-form-select>
            </b-form-group>

            <!-- District -->

            <b-form-group id="input-group-7" label="Ciudad:" label-for="input-7">
                <b-form-select
                id="input-7"
                v-model="form.district_id"
                :options="district"
                required
                :state="Boolean(form.district_id)"
                ></b-form-select>
            </b-form-group>

            <!-- Website -->

            <b-form-group id="input-group-8" label="Website:" label-for="input-8">
                <b-form-input
                id="input-8"
                v-model="form.website"
                required
                placeholder="www.tuweb.com..."
                ></b-form-input>
            </b-form-group>

            <!-- Email -->

            <b-form-group
                id="input-group-9"
                label="Email:"
                label-for="input-9"
            >
                <b-form-input
                id="input-9"
                v-model="form.email"
                type="email"
                required
                placeholder="Ingrese su email"
                :state="Boolean(form.email)"
                ></b-form-input>
            </b-form-group>

            <!-- Visit Protocol -->

            <b-form-group
                id="input-group-10"
                label="Protocolo de Visita:"
                label-for="input-10"
            >
              <b-form-file
                v-model="form.visit_protocol"
                :state="Boolean(form.visit_protocol)"
                required
                placeholder="Seleccione un archivo y arrastrelo aquí..."
                drop-placeholder="Arroje su archivo aquí..."
              ></b-form-file>
            </b-form-group>
            <!-- <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/> -->
            <!-- <upload-files></upload-files> -->

            <!-- Map -->

            <LeafletMap  v-bind:is-new-center="true" :latitudeLongitude.sync="latitudeLongitude" />

            <br>

            <b-button type="submit" variant="primary" class="mr-1">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>

            <br>
            <br>
        </b-col>
    </b-row>
  </div>
</template>

<script>

// COMPONENTS

import LeafletMap from '@/components/LeafletMap'
// import UploadFiles from '@/components/UploadFiles'

// PROVIDERS

import CenterService from '@/providers/center.services.js'

const centerService = new CenterService()

// HELP
// https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Spread_operator
// https://serversideup.net/uploading-files-vuejs-axios/

export default {
  data () {
    return {
      form: {
        email: '',
        name: '',
        website: '',
        address: '',
        telephone: '',
        center_type_id: null,
        district_id: null,
        latitude: 0,
        longitude: 0,
        visit_protocol: null,
        opening_time: '',
        closing_time: ''
      },
      latitudeLongitude: [],
      centerType: [],
      district: [],
      show: true,
      errors: []
    }
  },
  components: {
    LeafletMap
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      this.errors = []
      var bodyFormData = new FormData()
      const beginningTime = this.$moment('08:59:59', 'HH:mm:ss')
      const closingTimeT = this.$moment('16:00:00', 'HH:mm:ss')

      // NAME VALIDATION

      if (!this.form.name) {
        this.errors.push('El nombre es obligatorio.')
      }

      // OPENING TIME VALIDATION

      if (!this.form.opening_time) {
        this.errors.push('El horario de apertura es obligatorio.')
      } else if (!beginningTime.isBefore(this.$moment(this.form.opening_time, 'HH:mm:ss'))) {
        this.errors.push('El horario de apertura debe comenzar a las 9 am.')
      }

      // CLOSING TIME VALIDATION

      if (!this.form.closing_time) {
        this.errors.push('El horario de cierre es obligatorio.')
      } else if (closingTimeT.isBefore(this.$moment(this.form.closing_time, 'HH:mm:ss'))) {
        this.errors.push('El horario de cierre es hasta las 14 pm inclusive.')
      }

      // EMAIL VALIDATION

      if (!this.form.email) {
        this.errors.push('El correo electrónico es obligatorio.')
      } else if (!this.validEmail(this.form.email)) {
        this.errors.push('El correo electrónico debe ser válido.')
      }

      // LONTIDUDE LATITUDE VALIDATION

      if (this.latitudeLongitude.length !== 2) {
        this.errors.push('Debe seleccionar una región.')
      } else {
        this.form.latitude = this.latitudeLongitude[0]
        this.form.longitude = this.latitudeLongitude[1]
      }

      // VISITI PROTOCOL VALIDATION

      if (!this.form.visit_protocol) {
        this.errors.push('Debe seleccionar un archivo que contenga el protocolo de visita.')
      } else if (this.form.visit_protocol.type !== 'application/pdf') {
        this.errors.push('Debe seleccionar un archivo que sea de tipo pdf.')
        this.form.visit_protocol = null
      }

      // REQUIRED VALIDATION

      if (!this.form.address) {
        this.errors.push('La dirección es obligatoria')
      }

      if (!this.form.telephone) {
        this.errors.push('El teléfono es obligatorio.')
      }

      if (!this.form.center_type_id) {
        this.errors.push('Debe seleccionar tipo de centro.')
      }

      if (!this.form.district_id) {
        this.errors.push('Debe seleccionar un distrito.')
      }

      console.log(this.errors)
      if (this.errors.length > 0) {
        var message = ''
        this.errors.forEach(err => {
          message += `${err} <br>`
        })
        setTimeout(() => {
          this.$alertify.alert('Errores', message)
        }, 500)
        return false
      }

      bodyFormData.append('name', this.form.name)
      bodyFormData.append('address', this.form.address)
      bodyFormData.append('telephone', this.form.telephone)
      bodyFormData.append('center_type_id', this.form.center_type_id)
      bodyFormData.append('opening_time', this.form.opening_time)
      bodyFormData.append('closing_time', this.form.closing_time)
      bodyFormData.append('district_id', this.form.district_id)
      bodyFormData.append('website', this.form.website)
      bodyFormData.append('email', this.form.email)
      bodyFormData.append('latitude', this.form.latitude)
      bodyFormData.append('longitude', this.form.longitude)
      bodyFormData.append('visit_protocol', this.form.visit_protocol)

      centerService.loadNewCenter(bodyFormData).then(response => {
        setTimeout(() => {
          this.$alertify.success('La solicitud de nuevo centro ha sido enviada.')
        }, 500)
        this.form = {
          email: '',
          name: '',
          website: '',
          address: '',
          telephone: '',
          center_type_id: null,
          district_id: null,
          latitude: 0,
          longitude: 0,
          visit_protocol: null,
          opening_time: '',
          closing_time: ''
        }
        this.$router.push({ path: '/centers' })
      }).catch(error => {
        var message = ''
        for (const [key, err] of Object.entries(error.data.errors)) {
          message += `${key}: ${err}`
        }
        setTimeout(() => {
          this.$alertify.alert('Errores', message)
        }, 500)
      })
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.food = null
      this.form.checked = []
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    validEmail: function (email) {
      var re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
      return re.test(email)
    },
    getCenters () {
      centerService.getDistricts().then((data) => {
        var responseList = []
        const response = data.data.data.Town
        responseList.push({ text: 'Select One', value: null })
        // eslint-disable-next-line no-unused-vars
        for (const [key, district] of Object.entries(response)) {
          responseList.push({ text: district.name, value: district.id })
        }
        this.district = [...responseList]
      })
    },
    getCenterTypes () {
      centerService.getCenterTypes().then((data) => {
        var responseList = []
        responseList.push({ text: 'Select One', value: null })
        data.data.center_types.forEach(element => {
          responseList.push({ text: element.name, value: element.id })
        })
        this.centerType = [...responseList]
      })
    }
    /*
    handleFileUpload () {
      this.file = this.$refs.file.files[0]
    }
    */
  },
  mounted () {
    this.getCenters()
    this.getCenterTypes()
  }
}
</script>
