// LAS ACCIONES LLAMA A LAS MUTACIONES PARA CAMBIAR EL ESTADO

export default {
  updateCenter: ({ commit }, centerId) => {
    // CALL THE MUTATION <NAME_MUTATION, OBJECT> OBJECT = {pet, state, ...}
    commit('updateCurrentCenter', centerId)
  },
  updateCenterObject: ({ commit }, payload) => {
    // CALL THE MUTATION <NAME_MUTATION, OBJECT> OBJECT = {pet, state, ...}
    commit('updateCenterObject', payload)
  }
}
