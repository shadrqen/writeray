import Vuex from 'vuex'

import design from './modules/design'

import registration from './modules/registration'

import user from './modules/user'

let store: any

const initStore = () => {
  return store || (store = new Vuex.Store({
    state: () => ({}),
    actions: {},
    mutations: {},
    getters: {},
    modules: {
      design,
      registration,
      user
    }
  }))
}

export default initStore
