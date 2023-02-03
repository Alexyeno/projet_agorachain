<template>
	<div class="connexion">
		<div class="card">
			<button @click="ToCreate()" class="buttonForm">
				<span>Créer un salon de vote</span>
			</button>
			<button @click="ToVote()" class="buttonForm">
				<span>Rejoindre un salon de vote</span>
			</button>
			<button @click="ToHistory()" class="buttonForm">
				<span>Consulter son historique</span>
			</button>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Accueil',
		methods: {
			ToCreate: function(){
				this.$router.push('/Creation');
			},
			ToVote: function(){
				this.$router.push('/Vote');
			},
			ToHistory: function(){
				this.$router.push('/Historique');
			},
		}
	}
</script>

<style scoped>
.buttonForm:hover {
    cursor:pointer;
    opacity: 1.5;
	background-color: var(--light-alt);
  }

  .buttonForm {
    background: var(--light);
    color:var(--dark);
    border-radius: 8px;
    font-weight: 800;
    font-size: 15px;
    border: none;
    width: 100%;
    padding: 25px;
    transition: .4s background-color;
	margin-top: 15px;
	margin-bottom: 15px;
  }