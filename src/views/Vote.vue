<template>
	<div class="connexion">
	<div class="card">
	<h2 class="card__title">Rejoindre un salon de vote</h2>
	<div class="form-row">
		<input class="form-row__input" type="text" placeholder="Code du salon"/>
	</div>
		<button @click="ToRoom()" class="buttonForm">
			<span>Continuer</span>
		</button>
	</div>
</div>
</template>

<script>
export default {
  name: 'Vote',
  methods: {
    ToRoom() {
      this.$router.push('/SalonDeVote');
    },
  },
}
</script>


<style scoped>
.form-row {
display: flex;
margin: 30px 0px;
gap:16px;
flex-wrap: wrap;
}
.form-row__input {
padding:20px;
border: none;
border-radius: 8px;
background:#f2f2f2;
font-weight: 500;
font-size: 16px;
flex:1;
min-width: 100px;
color: black;
}
.form-row__input::placeholder {
color:#aaaaaa;
}
</style>>