<template>
  <div class="user">
    <h3>{{ user.name }}</h3>
    <h4>@{{ user.username }}</h4>
    <p>Email : {{ user.email }}</p>
    <p><nuxt-link to="/">List of users</nuxt-link></p>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  computed: {
    user() {
      const userById = this.$store.getters['users/userById'];
      return userById(this.$route.params.id);
    },
  },
  async fetch({ store }) {
    if (!store.getters['users/isFetched']) {
      return store.dispatch('users/fetchUsers');
    }
  },
}
</script>