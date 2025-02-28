<template>
  <div>
    <div v-if="favoriteMessage" class="alert alert-info alert-dismissible fade show" role="alert">
      {{ favoriteMessage }}
      <button type="button" class="btn-close" @click="favoriteMessage = ''" aria-label="Close"></button>
    </div>
    <UserDetails :id="$route.params.id" @favorite-toggled="handleFavoriteToggle" />
  </div>
</template>

<script>
import UserDetails from '../components/UserDetails.vue';

export default { 
  components: { UserDetails },
  props: ['id'],
  data() {
    return {
      favoriteMessage: ''
    };
  },
  methods: {
    handleFavoriteToggle(data) {
      const action = data.isFavorite ? 'agregado a' : 'eliminado de';
      this.favoriteMessage = `Usuario ${data.userId} ${action} favoritos`;
    }
  }
};
</script>
  