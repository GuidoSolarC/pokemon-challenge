import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		// API Listado pokemon
        apiPokemon: 'https://pokeapi.co/api/v2/pokemon/',
		// Pokemons favoritos
		pokemon_favorito: []
	},
	mutations: {
		updateFavoritos: (state, pokemon) =>{
			if(state.pokemon_favorito.includes(pokemon)){ // Se quita
				state.pokemon_favorito = state.pokemon_favorito.filter(e => e !== pokemon);
			} else { // Se agrega				
				state.pokemon_favorito.push(pokemon)
			}
		}
	},
	actions: {
		agregarQuitarFavoritos ({ commit }, pokemon) {
			localStorage.setItem('pokemon_favorito', JSON.stringify(pokemon))
			commit('updateFavoritos', pokemon)
		}
	},
	getters: {}
})