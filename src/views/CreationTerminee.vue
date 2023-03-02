<template>
	<div class="connexion">
		<div class="card">
			<h2 class="card__title">Votre vote a bien été enregistré</h2>
		</div>
		<h4>Lien vers le vote : <a :href="'../../SalonDeVote/'+this.id">Cliquez ici !</a></h4>
		<h4>Code du vote : {{ this.id }}</h4>
	</div>
</template>

<script>
export default {
	data() {
		return {
			id: "",
		}
	},
	mounted: function () {
		this.getData()
	},
	methods: {
		getData() {
			this.id = this.$route.params.id;
		}
	},
}
</script>

<style scoped>
.card {
	margin: 20px;
}

h4 {
	margin: 15px;
	font-weight: 300;
	font-size: 15px;
}
</style>>