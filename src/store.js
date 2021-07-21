import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		// API Listado pokemon
        apiPokemon: 'https://pokeapi.co/api/v2/pokemon/'
	},
	mutations: {},
	actions: {},
	getters: {}
})