<template>
	<div class="container-fluid">
		<!-- Buscador -->
		<div class="row mt-5 justify-content-center">
			<div class="col-12 col-md-4">
				<div class="input-group flex-nowrap" id="wrap-buscador">
					<span id="span-lupa" class="input-group-text border-0"><i class="fas fa-search"></i></span>
					<input id="input-buscador" type="text" class="form-control border-0 py-2" placeholder="Search" aria-label="Search" v-model="search_model">
				</div>
			</div>
		</div>

		<!-- Listado -->
		<div class="row mt-4 mt-md-5 mb-5 justify-content-center" v-if="array_pokemon">
			<div class="col-12 col-md-4 mb-5">
				<ul class="list-group" v-for="poke in filtroPokemon" :key="poke.name">
					<li class="rounded list-group-item d-flex justify-content-between align-items-center border-0 mb-2">
						<span data-bs-toggle="modal" data-bs-target="#modalPokemon" v-on:click="modalPokemon(poke.url)">{{ poke.name ? capitalizeFirstLetter(poke.name) : poke.name }}</span>
							<span class="content-star favorito d-flex justify-content-center align-items-center rounded-circle" 
							v-if="pokemon_favorito.includes(poke.name)"
							v-on:click="guardarFavorito(poke.name)">
							<i class="fa fa-star"></i>
							</span>		
							<span class="content-star no-favorito d-flex justify-content-center align-items-center rounded-circle" 
							v-on:click="guardarFavorito(poke.name)" v-else>
							<i class="fa fa-star"></i>
						</span>			
					</li>
				</ul>
			</div>
		</div>
		
		<!-- Mensaje al no encontrar resultado -->
		<div class="row mt-4 mt-md-5 justify-content-center" v-if="filtroPokemon.length == 0">
			<div class="row justify-content-center">
				<div class="col-12 col-md-4">
					<h3 class="text-center fw-bold">Uh-oh!</h3>
					<p class="text-center">You look lost on your journey!</p>
				</div>
			</div>
			<div class="row mt-2 justify-content-center">
				<div class="col-12 col-md-6 d-flex justify-content-center">
					<button type="button" class="btn btn-app active" v-on:click="goHome()">Go back home</button>
				</div>
			</div>
		</div>

		<!-- Footer -->
		<footer class="footer" v-if="array_pokemon">
			<div class="container py-3">
				<div class="row justify-content-center">
					<div class="col-5 col-md-3 d-flex justify-content-around">						
						<button type="button" v-bind:class="btn_activo === 'all' ? 'active' : 'inactive'" class="btn btn-listado text-center" v-on:click="alternarFavoritos('all')"><i class="fas fa-list"></i> All</button>
					</div>
					<div class="col-5 col-md-3">
						<button type="button" v-bind:class="btn_activo === 'fav' ? 'active' : 'inactive'" class="btn btn-listado text-center" v-on:click="alternarFavoritos('fav')"><i class="fas fa-star"></i> Favorites</button>
					</div>
				</div>
			</div>
		</footer>

		<!-- Modal pokemon -->		
		<div class="modal" id="modalPokemon" tabindex="-1">
			<ModalPokemon :key="keyModal" :url="this.url_pokemon"/>		
		</div>
				
		<!-- Loader -->
		<Loading v-show="isLoad" />
	</div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
// Import de componentes
import Loading from './_loader.vue'
import ModalPokemon from './_modalPokemon.vue'

export default {
	methods: {
		...mapActions([
			'agregarQuitarFavoritos'
		]),
		// Redirección al home
		goHome: function(){
			this.$router.replace({ name: 'Home' })
		},
		// Desconstruir y generar nuevamente componente con detalle del pókemon, según parámetros
		modalPokemon: function(url){
			this.keyModal += 1
			this.url_pokemon = url
		},
		// Consulto API
		obtenerListado: function () {
			this.axios.get(this.apiPokemon, { 
			}).then(response => {
				this.array_pokemon = response.data.results	
			}).catch(error => {
				console.log(error)
			})
		},
		// Alternar listado con favoritos
		alternarFavoritos: function(prop){
			if(prop === 'all'){ // Todos
				this.obtenerListado()
				this.btn_activo = 'all'
			} else { // Favoritos
				let temp = this.array_pokemon
				this.array_pokemon = []
				temp.forEach(el => {
					this.pokemon_favorito.forEach(fav => {
						if(fav == el.name){
							this.array_pokemon.push({ name: el.name , url: el.url})
						}
					})				
				})		
				this.btn_activo = 'fav'		
			}
		},
		// Guardo pokemon en store
		guardarFavorito: function(pokemon){
			this.agregarQuitarFavoritos(pokemon)
		}
	},
	mounted () {
		// Inicio ejecutando la API
        this.obtenerListado()

		// Efecto de carga
        setTimeout(() => {
            this.isLoad = false         
        }, 1000)
	},
	data () {
		return {
			isLoad: true,
			// Sin resultados de busqueda, muestro mensaje
			searchEmpty: false,
			// Resultado de API 
			array_pokemon: [],
			// Key para actualizar listado
			keyListado: 0,			
            // URL de Pokemón seleccionado
            url_pokemon: null,
            // Key modal para update de información
            keyModal: 0,
			// Model para buscar
			search_model: '',
			// Variable de botones listado, para alternar botón activo, por defecto 'all'
			btn_activo: 'all'
		}
	},	
	components: {	
        Loading,
		ModalPokemon
	},
	computed: {
        ...mapState(['apiPokemon', 'pokemon_favorito']),
		filtroPokemon() {
			return this.array_pokemon.filter(pokemon => {
				return pokemon.name.toLowerCase().indexOf(this.search_model.toLowerCase()) > -1
			})
		}
	}
}
</script>