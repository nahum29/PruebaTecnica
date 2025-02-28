import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export default {
  async getUserById(userId) {
    try {
      const response = await axios.get(`${API_URL}/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user details:', error);
      if (error.response) {
        if (error.response.status === 404) {
          throw new Error('Usuario no encontrado');
        } else {
          throw new Error(`Error del servidor: ${error.response.status}`);
        }
      } else if (error.request) {
        throw new Error('No se pudo conectar con el servidor');
      } else {
        throw new Error('Error al procesar la solicitud');
      }
    }
  },
  async getUsers() {
    try {
      const response = await axios.get(`${API_URL}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      if (error.response) {
        throw new Error(`Error del servidor: ${error.response.status}`);
      } else if (error.request) {
        throw new Error('No se pudo conectar con el servidor');
      } else {
        throw new Error('Error al procesar la solicitud');
      }
    }
  }
}; 