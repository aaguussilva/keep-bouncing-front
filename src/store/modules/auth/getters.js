export default {
  //isAuthenticated: (state) => !!state.user,
  isAuthenticated: (state) => !!localStorage.getItem('token'),
  getUser: (state) => state.user,
  isLoading: (state) => state.isLoading,
  errorMessage: (state) => state.errorMessage,
  successMessage: (state) => state.successMessage,
}
