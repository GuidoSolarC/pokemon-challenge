<template>
  <div class="content">
    <div class="row">


      
    </div>     
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	methods: {
    // Consulto API
    obtenerListado: function () {
        this.axios.get(this.apiPokemon, { 
        }).then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    },
    // Consulto API
    detalle: function () {
        this.axios.get(this.apiPokemon+'pikachu', { 
        }).then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
	},
	mounted () {
    this.obtenerListado()
    this.detalle()
	},
	data () {
		return {
          
		}
	},	
  components: {	
	},
	computed: {
    ...mapState(['apiPokemon'])
	}
}
</script>