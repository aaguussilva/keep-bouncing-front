export default {
  async fetchTricks({ commit }) {
    commit('CLEAR_ERROR')
    commit('SET_LOADING', true)

    try {
      const response = await fetch('http://localhost:8000/tricks')

      if (response.ok) {
        const tricks = await response.json()
        commit('SET_TRICKS', tricks)
        return { success: true, data: tricks }
      } else {
        commit('SET_ERROR_MESSAGE', 'Error al cargar los trucos')
        return { success: false }
      }
    } catch {
      commit('SET_ERROR_MESSAGE', 'Error de conexión al cargar trucos')
      return { success: false }
    } finally {
      commit('SET_LOADING', false)
    }
  },
}
