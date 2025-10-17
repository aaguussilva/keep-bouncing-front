export default {
  getUserProfile: (state) => state.userProfile,
  getProfileError: (state) => state.errorMessage,
  getProfileSuccess: (state) => state.successMessage,
  isProfileUpdating: (state) => state.isUpdating,
}