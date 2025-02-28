<template>
  <div class="container py-5">
    <h1 class="display-4 text-center mb-4">Lista de Usuarios</h1>
    <div v-if="loading" class="text-center text-muted">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Cargando usuarios...</span>
      </div>
    </div>
    <div v-else-if="error" class="alert alert-danger text-center">
      {{ error }}
    </div>
    <div v-else class="row justify-content-center">
      <div class="col-md-8">
        <div class="mb-3">
          <p>Usuarios favoritos: {{ favoriteCount }}</p>
        </div>
        <ul class="list-group">
          <li v-for="user in users" :key="user.id" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
            <router-link :to="`/user/${user.id}`" class="text-decoration-none flex-grow-1">
              <span>{{ user.name }}</span>
            </router-link>
            <button 
              @click="toggleFavorite(user)" 
              class="btn btn-sm" 
              :class="isFavorite(user.id) ? 'btn-warning' : 'btn-outline-secondary'"
            >
              <i class="bi" :class="isFavorite(user.id) ? 'bi-star-fill' : 'bi-star'"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import userService from '../services/userService';

export default {
  data() {
    return {
      users: [],
      loading: true,
      error: null,
      favorites: []
    };
  },
  computed: {
    favoriteCount() {
      return this.favorites.length;
    }
  },
  methods: {
    isFavorite(userId) {
      return this.favorites.includes(userId);
    },
    toggleFavorite(user) {
      if (this.isFavorite(user.id)) {
        this.favorites = this.favorites.filter(id => id !== user.id);
      } else {
        this.favorites.push(user.id);
      }
      // Emitir evento al componente padre
      this.$emit('favorite-changed', {
        userId: user.id,
        isFavorite: this.isFavorite(user.id),
        totalFavorites: this.favoriteCount
      });
    }
  },
  async created() {
    try {
      this.users = await userService.getUsers();
    } catch (error) {
      this.error = "Error al cargar los usuarios. Por favor, intenta nuevamente más tarde.";
      console.error('Error:', error);
    } finally {
      this.loading = false;
    }
  }
};
</script>

  