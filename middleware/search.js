import axios from 'axios';

export default function ({params, store}) {
    return axios.get(`https://api.meteo-concept.com/api/location/city?token=5a81979b76e35b90f56e3b08665ee1ae7aa4c7a6c3194f449af7b63a553baff4&insee=35238`)
    .then((response) => {
        store.commit('updateWeather', response.data.results)
    })
}