import createPersistedState from 'vuex-persistedstate'

export default ({ store, isHMR }) => {
    if (isHMR) return
  
    window.onNuxtReady(() => {
      createPersistedState({
        key: 'weather',
        paths: ['city', 'cities']
      })(store)
    })
  }