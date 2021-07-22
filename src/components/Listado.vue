<template>
	<div class="container-fluid">
		<!-- Buscador -->
		<div class="row mt-5 justify-content-center">
			<div class="col-12 col-md-4">
				<div class="input-group flex-nowrap" id="wrap-buscador">
					<span id="span-lupa" class="input-group-text border-0"><i class="fas fa-search"></i></span>
					<input id="input-buscador" type="text" class="form-control border-0 py-2" placeholder="Search" aria-label="Search" >
				</div>
			</div>
		</div>

		<!-- Listado -->
		<div class="row mt-4 mt-md-5 justify-content-center" v-if="!searchEmpty && array_pokemon">
			<div class="col-12 col-md-4">
				<ul class="list-group" v-for="poke in array_pokemon" :key="poke.name">
					<li class="rounded list-group-item d-flex justify-content-between align-items-center border-0 mb-2" 
						data-bs-toggle="modal" data-bs-target="#modalPokemon" v-on:click="modalPokemon(poke.url)">
						{{ poke.name }}
						<span class="content-star d-flex justify-content-center align-items-center rounded-circle"><i class="fas fa-star no-favorito"></i></span>
					</li>
				</ul>
			</div>
		</div>
		
		<!-- Mensaje al no encontrar resultado -->
		<div class="row mt-4 mt-md-5 justify-content-center" v-if="searchEmpty && !array_pokemon">
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
		<footer class="footer" v-if="!searchEmpty && array_pokemon">
			<div class="container py-3">
				<div class="row justify-content-center">
					<div class="col-5 col-md-3 d-flex justify-content-around">						
						<button type="button" class="btn btn-listado active text-center"><i class="fas fa-list"></i> All</button>
					</div>
					<div class="col-5 col-md-3">
						<button type="button" class="btn btn-listado inactive text-center"><i class="fas fa-star"></i> Favorites</button>
					</div>
				</div>
			</div>
		</footer>
		
		<!-- Loader -->
		<Loading v-show="isLoad" />

		
		<!-- Modal pokemon -->		
		<div class="modal" id="modalPokemon" tabindex="-1">
			<ModalPokemon :key="keyModal" :url="this.url_pokemon"/>		
		</div>
	</div>
</template>
<script>
import { mapState } from 'vuex'
// Import de componentes
import Loading from './_loader.vue'
import ModalPokemon from './_modalPokemon.vue'

export default {
	data () {
		return {
			isLoad: true,
			// Sin resultados de busqueda, muestro mensaje
			searchEmpty: false,
			// Resultado de API 
			array_pokemon: [],
			// URL de Pokemón seleccionado
			url_pokemon: null,
			// Key modal para update de información
			keyModal: 0
		}
	},	
	methods: {
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
    components: {	
        Loading,
		ModalPokemon
	},
	computed: {
        ...mapState(['apiPokemon'])
	}
}
</script>