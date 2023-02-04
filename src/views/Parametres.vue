<template>
	<div class="Page">
		
		<h1 class="view__title">Paramètres de votre compte</h1>

		<form>
      <div class="form-row">
        <input type="text" class="input" id="input1" placeholder="Prénom" v-model="firstName">
      </div>
      <div class="form-row">
        <input type="text" class="input" id="input2" placeholder="Nom de famille" v-model="lastName">
      </div>
      <div class="form-row">
<input type="text" class="input" id="input3" placeholder="mail@algorachain.com" v-model="email">
      </div>
      <div class="form-row">
        <input type="password" class="input" id="input4" placeholder="Mot de passe" v-model="password" ref="password">
			<span class="material-icons" @click="switchVisibility()">visibility</span>	
      </div>
	  <div class="form-row">
        <a href="" class="input form-row" id="input5">Prendre une photo de votre CIN &nbsp&nbsp&nbsp<span class="material-icons">photo_camera</span></a>
		
      </div>
      <div class="form-row">
        <a type="text" class="input" id="input5">Wallet</a>
      </div>

		<div>
		</div>
	</form>
	<button @click="Created()" class="buttonForm">
				<span>Enregistrer</span>
			</button>
	</div>
	</template>
	
<script>
export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      wallet: '',
    }
  },
  methods: {
    switchVisibility() {
      if (this.$refs.password.getAttribute('type') === 'password') this.$refs.password.setAttribute('type', 'text')
      else this.$refs.password.setAttribute('type', 'password')
    },
  }
}

</script>


	<style scoped>

	a{
		text-decoration: none;
	}
	form{
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 40%;
	}
	.form-row {
	display : flex;
	flex-direction: row;
	align-items: center;
	}
	
	.view__title {
		font-size: 40px;
		font-weight: 600;
		color: var(--primary);
		margin-bottom: 30px;
		text-align: center;
	}
	
	.Page{
		margin-top: 50px;
		margin-bottom: 5%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}
	
	.sub__title{
		font-size: 30px;
		font-weight: 700;
		color: var(--dark);
		margin: 25px;
		text-align: left;
	}
	.buttonForm {
		width: 200px;
		cursor: pointer;
		margin: 50px;
	}
	.input {
		padding:20px;
		border: none;
		background: none;
		font-weight: 400;
		font-size: 16px;
		flex:1;
		color: var(--dark);
		border-bottom: 1px solid var(--light-alt);
		width: 100%;
		justify-content: center;
	}
	.input:focus{
		outline:none;
		border-bottom: 1px solid var(--dark);
		border-color: var(--dark);
	}
	</style>