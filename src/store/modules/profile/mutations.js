export default {
  SET_USER_PROFILE(state, profile) {
    state.userProfile = profile
  },
  SET_PROFILE_UPDATING(state, status) {
    state.isUpdating = status
  },
  SET_PROFILE_ERROR(state, message) {
    state.errorMessage = message
  },
  SET_PROFILE_SUCCESS(state, message) {
    state.successMessage = message
  },
  CLEAR_PROFILE_MESSAGES(state) {
    state.errorMessage = null
    state.successMessage = null
  },
}