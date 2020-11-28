// ACTUALIZA/MODIFICA EL ESTADO

export default {
  updateCurrentCenter: (state, centerId) => {
    // <APPLICATION_STATE, PAYLOAD>
    state.currentCenterSelected = centerId
  },
  updateCenterObject: (state, { id, address, centerType, closingTime, district, email, name, openingTime, telephone, visitProtocol, website }) => {
    state.center = {
      id,
      address,
      centerType,
      closingTime,
      district,
      email,
      name,
      openingTime,
      telephone,
      visitProtocol,
      website
    }
  }
}
