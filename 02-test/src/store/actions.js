// LAS ACCIONES LLAMA A LAS MUTACIONES PARA CAMBIAR EL ESTADO

export default {
    addPet: ({ commit }, payload) => {
        commit('appendPet', payload) //CALL THE MUTATION <NAME_MUTATION, OBJECT> OBJECT = {pet, state, ...}
    }
}