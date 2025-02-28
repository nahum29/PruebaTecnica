<template>
  <div class="container py-5">
    <h1 class="display-4 text-center mb-4">Detalles del Usuario</h1>
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Cargando detalles...</span>
      </div>
    </div>
    <div v-else-if="error" class="alert alert-danger text-center">
      {{ error }}
    </div>
    <div v-else class="row justify-content-center">
      <div class="col-md-8">
        <div class="card shadow">
          <div class="card-body">
            <div class="d-flex align-items-center mb-4">
              <div class="bg-primary rounded-circle d-flex align-items-center justify-content-center text-white" style="width: 60px; height: 60px;">
                <span class="fs-4">{{ user.name.charAt(0) }}</span>
              </div>
              <h2 class="ms-3 mb-0">{{ user.name }}</h2>
              <button 
                @click="toggleFavorite" 
                class="btn ms-auto" 
                :class="isFavorite ? 'btn-warning' : 'btn-outline-secondary'"
              >
                <i class="bi" :class="isFavorite ? 'bi-star-fill' : 'bi-star'"></i>
                {{ isFavorite ? 'Favorito' : 'Marcar como favorito' }}
              </button>
            </div>
            
            <div class="row g-3">
              <div class="col-md-6">
                <div class="card bg-light">
                  <div class="card-body">
                    <p class="text-muted small mb-1">Email</p>
                    <p class="mb-0">{{ user.email }}</p>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="card bg-light">
                  <div class="card-body">
                    <p class="text-muted small mb-1">Teléfono</p>
                    <p class="mb-0">{{ user.phone }}</p>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="card bg-light">
                  <div class="card-body">
                    <p class="text-muted small mb-1">Sitio Web</p>
                    <a :href="`http://${user.website}`" class="text-primary">{{ user.website }}</a>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="card bg-light">
                  <div class="card-body">
                    <p class="text-muted small mb-1">Compañía</p>
                    <p class="mb-0">{{ user.company.name }}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="mt-4">
              <router-link to="/" class="btn btn-primary">
                <i class="bi bi-arrow-left me-2"></i>Volver a la lista
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userService from '@/services/userService';

export default {
  props: ['id'],
  data() {
    return {
      user: null,
      loading: true,
      error: null,
      isFavorite: false
    };
  },
  methods: {
    toggleFavorite() {
      this.isFavorite = !this.isFavorite;
      // Emitir evento al componente padre
      this.$emit('favorite-toggled', {
        userId: this.id,
        isFavorite: this.isFavorite
      });
    }
  },
  async created() {
    try {
      this.user = await userService.getUserById(this.id);
    } catch (error) {
      this.error = "Error al cargar los detalles del usuario. Por favor, intenta nuevamente más tarde.";
      console.error('Error:', error);
    } finally {
      this.loading = false;
    }
  }
};
</script>
  