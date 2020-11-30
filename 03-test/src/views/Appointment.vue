<template>
  <div>
    <!-- Content here -->
    <b-row>
      <b-col>
        <h1>Solicitud de Turno</h1>
        <p>Para el centro: {{ getCenterName }}</p>
        <hr />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <!-- https://es.vuejs.org/v2/cookbook/form-validation.html -->
        <b-form @submit="onSubmit" @reset="onReset">
          <!-- Name -->

          <b-form-group
            id="input-group-1"
            label="Fecha del turno:"
            label-for="input-1"
          >
            <b-form-datepicker
              id="example-datepicker"
              v-model="form.date"
              class="mb-2"
              :state="datePickedCorrect"
              aria-describedby="input-live-feedback"
            ></b-form-datepicker>
            <b-form-invalid-feedback id="input-live-feedback">
              La fecha seleccionada tiene que ser igual o posterior a hoy
            </b-form-invalid-feedback>
          </b-form-group>

          <!-- Hours -->

          <b-form-group
            id="input-group-hours"
            label="Seleccione un turno disponible:"
            label-for="input-hours"
            v-show="form.date !== null && appointments !== null && datePickedCorrect"
          >
            <b-form-radio
              v-for="(available, hour) in appointments"
              :key="hour"
              name="some-radios"
              :disabled="available == false"
              value=hour
              v-on:change="apptSelected(hour)"
              >
              {{ hour }}</b-form-radio
            >
          </b-form-group>

          <!-- Telephone -->

          <b-form-group
            id="input-group-2"
            label="Teléfono:"
            label-for="input-2"
          >
            <b-form-input
              id="input-2"
              v-model="form.telephone"
              :state="telephoneLenght"
              required
              aria-describedby="input-live-feedback"
              placeholder="+5422.."
            ></b-form-input>
            <b-form-invalid-feedback id="input-live-feedback">
              El telefono debe tener al menos 6 numeros
            </b-form-invalid-feedback>
          </b-form-group>

          <!-- Email -->

          <b-form-group id="input-group-3" label="Email:" label-for="input-3">
            <b-form-input
              id="input-3"
              v-model="form.email"
              type="email"
              required
              placeholder="Ingrese su email"
            ></b-form-input>
          </b-form-group>

          <br />

          <b-button type="submit" variant="primary" class="mr-1"
            >Submit</b-button
          >
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>

        <br />
        <br />
      </b-col>
    </b-row>
  </div>
</template>

<script>

// VUEX

import { mapGetters } from 'vuex'

import AppointmentService from '@/providers/appointment.services'

const appointmentService = new AppointmentService()

// COMPONENTS

// import UploadFiles from '@/components/UploadFiles'

// PROVIDERS

// import CenterService from '@/providers/center.services.js'

// const centerService = new CenterService()

// HELP
// https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Spread_operator
// https://serversideup.net/uploading-files-vuejs-axios/
// https://router.vuejs.org/guide/essentials/dynamic-matching.html

export default {
  data () {
    return {
      form: {
        email: '',
        telephone: '',
        date: null,
        hour: '',
        center_id: Number
      },
      errors: [],
      appointments: null
    }
  },
  computed: {
    ...mapGetters(['getCenterName', 'getCenter']),
    telephoneLenght () {
      if (this.form.telephone.length === 0) {
        return null
      }
      if (this.form.telephone.length > 5) {
        return true
      } else {
        return false
      }
    },
    datePickedCorrect () {
      if (this.form.date === null) {
        return null
      }
      if (!this.$moment(this.form.date, 'YYYY-MM-DD').isSameOrAfter(this.$moment(new Date()).format('YYYY-MM-DD'))) {
        return false
      } else {
        return true
      }
    }
  },
  components: {
  },
  watch: {
    'form.date': {
      handler: function (val) {
        if (val !== null) {
          const formattedDate = this.$moment(val).format('DD/MM/YYYY')
          appointmentService.getAppointments(this.$route.params.id, formattedDate).then((data) => {
            this.appointments = data.data.appointments
            console.log(this.appointments)
          })
        }
      }
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      if (!this.telephoneLenght) {
        return false
      }
      if (!this.datePickedCorrect) {
        this.$alertify.error('Debe seleccionar una fecha')
        return false
      }
      this.form.center_id = parseInt(this.$route.params.id)
      appointmentService.loadNewAppointment(this.form, this.$route.params.id).then(response => {
        setTimeout(() => {
          this.$alertify.success('La solicitud de nuevo turno ha sido enviada.')
        }, 500)
        this.form.email = ''
        this.form.name = ''
        this.form.date = null
        this.form.hour = ''
        this.appointments = null
        this.form.center_id = ''
        this.$router.push({ path: '/centers' })
      }).catch(error => {
        console.log(error)
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
      console.log('reset')
      // Reset our form values
      this.form.email = ''
      this.form.name = ''
      this.form.date = null
      this.form.hour = ''
      this.appointments = null
      this.form.center_id = ''
    },
    validEmail: function (email) {
      var re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/
      return re.test(email)
    },
    apptSelected (value) {
      this.form.hour = value
      this.$alertify.success(this.form.hour)
    }
  },
  mounted () {
    const centerId = parseInt(this.$route.params.id, 10)
    if (centerId !== this.getCenter[0].id) {
      this.$router.push({ path: '/centers' })
    }
    setTimeout(() => {
      this.$alertify.success('')
    }, 500)
    // this.getAppointments()
  }
}
</script>
