export default {
  SET_USER(state, user) {
    state.user = user
  },
  SET_LOADING(state, loading) {
    state.isLoading = loading
  },
  SET_ERROR_MESSAGE(state, message) {
    state.errorMessage = message
  },
  SET_SUCCESS_MESSAGE(state, message) {
    state.successMessage = message
  },
  CLEAR_MESSAGES(state) {
    state.errorMessage = ''
    state.successMessage = ''
  },
  LOGOUT(state) {
    state.user = null
    state.errorMessage = ''
    state.successMessage = ''
  },
}
