<template>
  <div>
    <!-- Content here -->
    <b-row>
        <b-col>
          <h1>Solicitud de Turno</h1>
          <p>Para el centro: {{getCenterName}}</p>
          <hr>
        </b-col>
    </b-row>
    <b-row>
        <b-col>
            <!-- https://es.vuejs.org/v2/cookbook/form-validation.html -->
            <b-form @submit="onSubmit" novalidate="novalidate">

            <!-- Name -->

            <b-form-group id="input-group-1" label="Nombre del Centro:" label-for="input-1">
              <b-form-datepicker id="example-datepicker" v-model="form.date" class="mb-2"></b-form-datepicker>
            </b-form-group>

             <!-- Telephone -->

            <b-form-group id="input-group-2" label="Teléfono:" label-for="input-2">
                <b-form-input
                id="input-2"
                v-model="form.telephone"
                required
                placeholder="+5422.."
                ></b-form-input>
            </b-form-group>

            <!-- Email -->

            <b-form-group
                id="input-group-3"
                label="Email:"
                label-for="input-3"
            >
                <b-form-input
                id="input-3"
                v-model="form.email"
                type="email"
                required
                placeholder="Ingrese su email"
                ></b-form-input>
            </b-form-group>

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

// VUEX

import { mapGetters } from 'vuex'

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
        date: null
      },
      errors: []
    }
  },
  computed: {
    ...mapGetters(['getCenterName', 'getCenter'])
  },
  components: {
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      this.errors = []
      const today = this.$moment(new Date()).format('YYYY-MM-DD')

      if (!this.form.email) {
        this.errors.push('El correo electrónico es obligatorio.')
      } else if (!this.validEmail(this.form.email)) {
        this.errors.push('El correo electrónico debe ser válido.')
      }
      if (!this.form.telephone) {
        this.errors.push('El teléfono es obligatorio.')
      }
      if (this.form.data === null) {
        this.errors.push('La fecha es obligatoria.')
      } else if (!this.$moment(this.form.date, 'YYYY-MM-DD').isSameOrAfter(today)) {
        this.errors.push('La fecha debe ser superior al día de hoy.')
      }
      console.log(this.errors)
      if (this.errors.length > 0) {
        return false
      }

      alert(JSON.stringify(this.form))
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
    }
    /*
    handleFileUpload () {
      this.file = this.$refs.file.files[0]
    }
    */
  },
  mounted () {
    const centerId = parseInt(this.$route.params.id, 10)
    if (centerId !== this.getCenter[0].id) {
      this.$router.push({ path: '/centers' })
    }
    setTimeout(() => {
      this.$alertify.success('Hell Alertify')
    }, 500)
  }
}
</script>
