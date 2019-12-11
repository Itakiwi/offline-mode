<template>
  <section>
    <v-layout
        row
        justify-center
        align-center
    >  
    <div v-if="$nuxt.isOffline"> Hors-Ligne </div>
    <v-flex grow></v-flex>
        <v-select
            :items="cities"
            v-model="select"
            item-text="name"
            item-value="insee"
        ></v-select>
    </v-flex>
    <v-flex xs2></v-flex>
        <v-btn fab
          @click="goToCity"
        >
          <v-icon>fa-arrow-circle-right</v-icon>
        </v-btn>
    </v-flex>
    </v-layout>
    <v-card
      class="mx-auto"
      max-width="300"
      tile
    >
      <v-list shaped>
        <v-subheader>Users</v-subheader>
        <v-list-item-group color="primary">
          <v-list-item
            v-for="user in users" 
            :key="user.id"
          >
            <v-list-item-content>
              <v-list-item-title>
                <nuxt-link :to="'/users/'+user.id">{{ user.name }}</nuxt-link>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    cities: [
        {name: "Paris", insee: 75110},
        {name: "Strasbourg", insee: 67482},
        {name: "Lyon", insee: 69381},
        {name: "Marseille", insee: 13210},
        {name: "Lille", insee: 59350}
    ],
    select: null,
    forecast: null,
    pending: true
  }),
  computed: {
    users() {
      console.log("dada ", this.$store)
      return this.$store.state.users.list
    }
  },
  async fetch({ store }){
    return store.dispatch('users/fetchUsers')
  },
  methods: {
    goToCity() {
      this.$router.push(`/weather/${this.select}`)
    },
  }
}
</script>
