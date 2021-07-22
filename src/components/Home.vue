<template>
  <div class="container-fluid mb-3 p-0">
    <!-- Imagen pikachu -->
    <div class="row mt-5 justify-content-center">
      <div class="col-4 mt-5 rounded-circle position-relative d-flex justify-content-center align-items-center" id="content-img-pikachu">
          <img class="position-absolute" id="img-pikachu" src="@/assets/img/Pikachu.png" alt="Imagen Pikachu">
      </div>
    </div>   
    <!-- Welcome -->
    <div class="row mt-5 justify-content-center">
      <div class="col-12 col-md-6">
        <h3 id="welcome_title" class="text-center">Welcome to Pokédex</h3>
      </div>
    </div>
    <!-- Párrafo -->
    <div class="row mt-3 justify-content-center">
      <div class="col-12 col-md-4">
        <p id="welcome_paragraph" class="text-center">The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.</p>
      </div>
    </div>
    <!-- Botón "Get Started" -->
    <div class="row mt-4 justify-content-center">
      <div class="col-12 col-md-6 d-flex justify-content-center">
          <button type="button" class="btn btn-app active" v-on:click="goListado()">Get started</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
	methods: { 
    // Redirección al listado
    goListado:function(){
      this.$router.replace({ name: 'Listado' })
    }
  },
	mounted () {},
	data () {
    return {}
	},	
  components: {	},
	computed: {	}
}
</script>