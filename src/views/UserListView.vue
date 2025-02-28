<template>
  <div>
    <div v-if="lastFavoriteAction" class="alert alert-info alert-dismissible fade show" role="alert">
      {{ lastFavoriteAction }}
      <button type="button" class="btn-close" @click="lastFavoriteAction = ''" aria-label="Close"></button>
    </div>
    <UserList @favorite-changed="handleFavoriteChange" />
  </div>
</template>

<script>
import UserList from '../components/UserList.vue';

export default { 
  components: { UserList },
  data() {
    return {
      lastFavoriteAction: ''
    };
  },
  methods: {
    handleFavoriteChange(data) {
      const action = data.isFavorite ? 'agregado a' : 'eliminado de';
      this.lastFavoriteAction = `Usuario ${data.userId} ${action} favoritos. Total: ${data.totalFavorites}`;
    }
  }
};
</script>
  