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
                            <li class="list-group-item"><span class="fw-bold">Name:</span> {{ this.name }}</li>
                            <li class="list-group-item"><span class="fw-bold">Weight:</span> {{ this.weight }}</li>
                            <li class="list-group-item"><span class="fw-bold">Height:</span> {{ this.height }}</li>
                            <li class="list-group-item"><span class="fw-bold">Types:</span> {{ this.types }}</li>
                        </ul>
                    </div>
                    <div class="container px-md-5">
                        <div class="row mt-2 justify-content-center justify-content-md-between">                                    
                            <div class="col-8"><button type="button" class="btn btn-share active text-center px-3">Share to my friends</button></div>
                            <div class="col-2 p-0 d-md-flex justify-content-md-end">
                                <span class="content-star d-flex justify-content-center align-items-center rounded-circle"><i class="fas fa-star no-favorito"></i></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
		url: {
			type: String
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
	methods: {
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
				// Guardar la imagen del pokemón
				this.image = response.data.sprites.front_default

			}).catch(error => {
				console.log(error)
			})
		}
	},
	mounted () {
        if(this.url){
            this.buscarPokemon()
        }
	},
    components: {},
	computed: {}
}
</script>