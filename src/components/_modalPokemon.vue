<template>
    <div class="modal-dialog modal-dialog-centered m-auto">
        <div class="modal-content border-0">
            <div class="modal-body p-0">
                <div class="card border-0 pb-4">
                    <div class="card-header py-3 p-0 d-flex justify-content-center align-items-center">
                        <!-- Close modal -->
                        <i class="fas fa-times-circle close-modal position-absolute" data-bs-dismiss="modal" aria-label="Close"></i>
                        <img :src="this.image" class="img_pokemon" alt="Pókemon">
                    </div>
                    <div class="card-body">
                        <ul class="list-group list-group-flush px-1">
                            <li class="list-group-item"><span class="fw-bold">Name:</span> {{ this.name ? this.capitalizeFirstLetter(this.name) : '' }}</li>
                            <li class="list-group-item"><span class="fw-bold">Weight:</span> {{ this.weight }}</li>
                            <li class="list-group-item"><span class="fw-bold">Height:</span> {{ this.height }}</li>
                            <li class="list-group-item"><span class="fw-bold">Types:</span> {{ this.types }}</li>
                        </ul>
                    </div>
                    <div class="container px-md-5">
                        <div class="row mt-2 justify-content-center justify-content-md-between">                                    
                            <div class="col-8"><button type="button" class="btn btn-share active text-center px-3">Share to my friends</button></div>
                            <div class="col-2 p-0 d-md-flex justify-content-md-end">
								<span class="content-star favorito d-flex justify-content-center align-items-center rounded-circle" 
									v-if="pokemon_favorito.includes(name)"
									v-on:click="guardarFavorito(name)">
									<i class="fa fa-star"></i>
								</span>		
								<span class="content-star no-favorito d-flex justify-content-center align-items-center rounded-circle" 
									v-on:click="guardarFavorito(name)" 
									v-else>
									<i class="fa fa-star"></i>
								</span>		
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    props: {
		url: {
			type: String
		}
	},
	methods: {
		...mapActions([
			'agregarQuitarFavoritos'
		]),
        // Buscar pokemon según URL
		buscarPokemon: function () {
			this.axios.get(this.url, { 
			}).then(response => {
				// Contener la información en las variables
				this.name = response.data.name
				this.weight = response.data.weight
				this.height = response.data.height

				// Recorro los tipos para poder guardarlos
				response.data.types.forEach(element => {
					this.types.push(element.type.name)	
				});
				// Formateo los tipos para que aparescan como una cadena string
				this.types = this.capitalizeFirstLetter(this.types.join(', '))
				// Guardar la imagen del pokemón
				/* 
					Se tuvo que usar esta aproximación para poder obtener una imagen con buena calida a mostrar
					El problema es generado por una propiedad que lleva un "-" (No es recomendado como buena práctica)
					https://stackoverflow.com/questions/29482226/json-object-with-dash-character-on-element-name
				*/
				this.image = response.data["sprites"]["other"]["official-artwork"]["front_default"]
			}).catch(error => {
				console.log(error)
			})
		},		
		// Guardo pokemon en store
		guardarFavorito: function(pokemon){
			this.agregarQuitarFavoritos(pokemon)
			console.log(this.pokemon_favorito)
		}
	},
	mounted () {
        if(this.url){
            this.buscarPokemon()
        }
	},
	data () {
		return {
			// Propiedades del pokemón
			name: null,
			weight: null,
			height: null,
			types: [],
			image: null
		}
	},	
    components: {},
	computed: {
		...mapState(['pokemon_favorito'])
	}
}
</script>