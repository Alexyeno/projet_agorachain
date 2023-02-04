<template>
	<div class="Page">
		<h1 class="view__title">Historique de vos votes</h1>
		<div class="form">
       		 <a href="" type="text" class="row form-row" id="input1"><div>Vote {{ vote.name }} - {{ vote.company }} réalisé le {{ vote.date }}</div>
			<div><span v-if="vote.ownership" class="material-icons">key</span>
				<span class="material-icons">download</span>
			</div>
			</a>
			
		</div>
	<button @click="Created()" class="buttonForm"><span>Enregistrer</span></button>
	</div>
</template>
	
<script>
export default {
	name: "Historique",
  data() {
    return {
		vote:{
      name: 'AG',
	  ownership: true,
	  date: '2023-01-01',
	  company: 'Efrei',
    }
}
  },
  methods: {
  }
}

</script>


	<style scoped>

	a{
		text-decoration: none;
	}
	.form{
		display: flex;
		flex-direction: column;
		width: 50%;
	}
	.form-row {
	display : flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
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
	.row {
		padding:20px;
		border: none;
		background: none;
		font-weight: 400;
		font-size: 16px;
		flex:1;
		color: var(--dark);
		border-bottom: 1px solid var(--dark);
		width: 100%;
	}
	</style>