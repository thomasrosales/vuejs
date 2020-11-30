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

class CenterService {
  async getCenters () {
    return axiosInstance.get(`${URL_CENTER}/?page_size=200`).then((response) => response)
  }

  async getDistricts () {
    return axiosInstance.get(`${URL_CENTER}/districts?per_page=400`).then((response) => response)
  }

  async getCenterTypes () {
    return axiosInstance.get(`${URL_CENTER}/kind`).then((response) => response)
  }

  async loadNewCenter (center) {
    return axios.post(
      `${URL_CENTER}/new`,
      center,
      {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
    ).then(response => {
      return response
    }).catch(error => {
      return Promise.reject(error.response)
    })
  }
}

export default CenterService
