<template>
    <v-card
        class="mx-auto"
        max-width="400"
    >    
        <v-list-item two-line>
        <v-list-item-content>
            <v-list-item-title class="headline">{{ this.cityName }}</v-list-item-title>
            <v-list-item-subtitle> {{ this.dateParsed }}</v-list-item-subtitle>
        </v-list-item-content>
        </v-list-item>  
        <v-card-text>
            <v-row align="center">
                <v-col class="display-3" cols="6">
                    {{ (this.forecast.tmax + this.forecast.tmin)/2 }}°C
                </v-col>
                <v-col cols="6">
                    <v-img
                        :src="this.weatherImage"
                        width="92"
                    ></v-img>
                </v-col>
            </v-row>
        </v-card-text>
      <v-card-text class="text-center">
        <div>Probabilité de pluie    : {{ this.forecast.probarain }} %</div>
        <div>Température minimale    : {{ this.forecast.tmin}}°C</div>
        <div>Température maximale    : {{ this.forecast.tmax }}°C</div>
        <div>Vitesse moyenne du vent : {{ this.forecast.wind10m }} km/h</div>
        <div>Direction du vent       : {{ this.forecast.dirwind10m }}°</div>
        <div>Durée d'ensoleillement  : {{ this.forecast.sun_hours }} heures </div>
      </v-card-text>
    </v-card>
</template>

<script>
import axios from 'axios';

export default {
    data: () => ({
        pending: true,
        images: {
            soleil: require('@/static/weather/soleil.svg'),
            orage: require('@/static/weather/orage.svg'),
            pluie: require('@/static/weather/pluie_lourde.svg'),
            neige: require('@/static/weather/neige.svg'),
            grele: require('@/static/weather/grele.svg'),
            nuage: require('@/static/weather/nuage.svg')
        }
  }),
  computed: {
      forecast: function () {
          return JSON.parse(localStorage.getItem(this.$route.params.city)).forecast[0];
      },
      cityName: function () {
          return JSON.parse(localStorage.getItem(this.$route.params.city)).city.name;
      },
      weatherImage: function() {
        const x = this.forecast.weather
        let res;
        switch(true) {
            case (x < 1):
                res = this.images.soleil;
                break;
            case (x < 10):
                res =  this.images.nuage;
                break;
            case (x < 20):
                res =  this.images.pluie;
                break;
            case (x < 100):
                res =  this.images.neige;
                break;
            case (x < 140):
                res =  this.images.orage;
                break;
            case (x < 233):
                res =  this.images.pluie;
                break;
            default:
                res =  this.images.grele;
                break;
        }
        return res;
      },
      dateParsed: function () {
        let d = new Date(Date.parse(this.forecast.datetime))
        return d.toLocaleDateString('fr-Fr', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      }
  },
  async fetch({store, params}) {
//    if($nuxt.isOnline) {
        let { data } = await axios.get(`https://api.meteo-concept.com/api/forecast/daily?token=5a81979b76e35b90f56e3b08665ee1ae7aa4c7a6c3194f449af7b63a553baff4&insee=${params.city}`)
        if(process.browser){
            localStorage.setItem(params.city, JSON.stringify(data))
        }
//    }
  }, 
}
</script>