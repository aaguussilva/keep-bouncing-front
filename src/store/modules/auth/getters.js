export default {
  isAuthenticated: (state) => !!state.user,
  getUser: (state) => state.user,
  isLoading: (state) => state.isLoading,
  errorMessage: (state) => state.errorMessage,
  successMessage: (state) => state.successMessage,
}
