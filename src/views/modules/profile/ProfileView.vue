<template>
  <div>
    <div>
      <div>
        <img 
          :src="user.avatar || 'https://via.placeholder.com/150'" 
          alt="Profile Avatar"
        >
      </div>
      <h1>{{ user.name || 'Usuario' }}</h1>
      <p>{{ user.email || 'usuario@ejemplo.com' }}</p>
    </div>

    <div>
      <button @click="navigateToEdit">
        Editar Perfil
      </button>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'ProfileView',
  setup() {
    const store = useStore();
    const router = useRouter();

    const user = computed(() => store.state.profile.user || {});

    const navigateToEdit = () => {
      router.push({ name: 'EditProfile' });
    };

    onMounted(() => {
      store.dispatch('profile/fetchUserProfile');
    });

    return {
      user,
      navigateToEdit
    };
  }
};
</script>
