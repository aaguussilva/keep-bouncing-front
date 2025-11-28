export default {
  async login({ commit }, loginData) {
    commit('CLEAR_MESSAGES')
    commit('SET_LOADING', true)

    try {
      const response = await fetch('http://localhost:8000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('access_token', data.token)
        commit('SET_SUCCESS_MESSAGE', data.message)
        commit('SET_USER', data.user)
        return { success: true }
      } else {
        commit('SET_ERROR_MESSAGE', data.detail || 'Error al iniciar sesión')
        return { success: false }
      }
    } catch (error) {
      commit('SET_ERROR_MESSAGE', 'Error de conexión. Verifica que el servidor esté ejecutándose.')
      return { success: false }
    } finally {
      commit('SET_LOADING', false)
    }
  },

  async register({ commit }, registerData) {
    commit('CLEAR_MESSAGES')
    commit('SET_LOADING', true)

    try {
      const response = await fetch('http://localhost:8000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: registerData.name,
          email: registerData.email,
          password: registerData.password,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        commit('SET_SUCCESS_MESSAGE', '¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.')
        return { success: true }
      } else {
        commit('SET_ERROR_MESSAGE', data.detail || 'Error al crear la cuenta')
        return { success: false }
      }
    } catch (error) {
      commit('SET_ERROR_MESSAGE', 'Error de conexión. Verifica que el servidor esté ejecutándose.')
      return { success: false }
    } finally {
      commit('SET_LOADING', false)
    }
  },

  logout({ commit }) {
    localStorage.removeItem('access_token')
    commit('LOGOUT')
  },

  clearMessages({ commit }) {
    commit('CLEAR_MESSAGES')
  },

  async deleteAccount({ commit }, userId) {
    commit('CLEAR_MESSAGES')
    commit('SET_LOADING', true)

    const token = localStorage.getItem('access_token')
    if (!token) {
      commit('SET_ERROR_MESSAGE', 'No authentication token found')
      commit('SET_LOADING', false)
      return { success: false }
    }

    try {
      const response = await fetch(`http://localhost:8000/users/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      let data = {}
      try {
        data = await response.json()
      } catch (e) {
        data = {}
      }

      if (response.ok) {
        // Successful deletion: clear local session
        localStorage.removeItem('access_token')
        commit('LOGOUT')
        commit('SET_SUCCESS_MESSAGE', data.detail || 'Account deleted')
        return { success: true }
      } else {
        commit('SET_ERROR_MESSAGE', data.detail || 'Error deleting account')
        return { success: false }
      }
    } catch (error) {
      commit('SET_ERROR_MESSAGE', 'Error de conexión. Verifica que el servidor esté ejecutándose.')
      return { success: false }
    } finally {
      commit('SET_LOADING', false)
    }
  },
}
