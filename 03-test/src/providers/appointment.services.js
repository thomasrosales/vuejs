// https://github.com/axios/axios
// https://es.vuejs.org/v2/cookbook/using-axios-to-consume-apis.html
// https://www.techiediaries.com/vue-axios-tutorial/
import axios from 'axios'

const axiosInstance = axios.create({
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
})

const URL_CENTER = process.env.VUE_APP_URL_API + '/center'

class AppointmentService {
  async getAppointments (centerId, date) {
    return axiosInstance.get(`${URL_CENTER}/${centerId}/appointments/${date}`).then((response) => response)
  }

  async loadNewAppointment (appointment, centerId) {
    return axios.post(
      `${URL_CENTER}/${centerId}/book`,
      appointment,
      {
        headers: { 'Content-Type': 'application/json' }
      }
    ).then(response => {
      return response
    }).catch(error => {
      return Promise.reject(error.response)
    })
  }
}

export default AppointmentService
