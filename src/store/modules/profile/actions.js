export default {
  async fetchUserProfile({ commit }, userId) {

    console.log('fetchUserProfile called', userId)
    const token = localStorage.getItem('access_token')

    try {
      const response = await fetch(`http://localhost:8000/users/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.detail || 'Error al obtener el perfil')
      commit('SET_USER_PROFILE', data)
    } catch (error) {
      commit('SET_PROFILE_ERROR', error.message)
    }
  },

  async updateUserProfile({ commit }, profileData) {
    commit('CLEAR_PROFILE_MESSAGES')
    commit('SET_PROFILE_UPDATING', true)

    const { userId } = profileData
    const token = localStorage.getItem('access_token')

    try {
      const response = await fetch(`http://localhost:8000/users/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(profileData),
      })

      if (!response.ok) throw new Error('Error al actualizar el perfil')

      const updated = await response.json()
      commit('SET_USER_PROFILE', updated)
      commit('SET_PROFILE_SUCCESS', '¡Perfil actualizado exitosamente!')
    } catch (error) {
      commit('SET_PROFILE_ERROR', error.message)
    } finally {
      commit('SET_PROFILE_UPDATING', false)
    }
  },
}
