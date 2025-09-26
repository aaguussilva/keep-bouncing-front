export default {
  async login({ commit }, loginData) {
    commit('CLEAR_MESSAGES')
    commit('SET_LOADING', true)

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      })

      const data = await response.json()

      if (response.ok) {
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
    commit('LOGOUT')
  },

  clearMessages({ commit }) {
    commit('CLEAR_MESSAGES')
  },
}
