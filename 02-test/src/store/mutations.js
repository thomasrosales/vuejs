// ACTUALIZA/MODIFICA EL ESTADO

export default {
    appendPet: (state, { species, pet }) => {
        state[species].push(pet)
    }  // <APPLICATION_STATE, PAYLOAD>
}