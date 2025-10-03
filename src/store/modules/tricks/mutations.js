export default {
  SET_TRICKS(state, tricks) {
    state.tricks = tricks
  },

  SET_LOADING(state, loading) {
    state.isLoading = loading
  },

  SET_ERROR_MESSAGE(state, message) {
    state.errorMessage = message
  },

  CLEAR_ERROR(state) {
    state.errorMessage = ''
  },
}
