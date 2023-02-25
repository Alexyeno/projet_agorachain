<template>
	<main id="Home-page">
		<div class="first Section">
			<button @click="login()" class="buttonForm topButton">
				<span>Se connecter</span>
			</button>
			<div class="longLogo">
				<img src="../assets/longLogo.svg" alt="AgoraChainLogo" /> 
			</div>
			<div class="header">
			<div class ="Left partHeader" >
				<img src="../assets/headerImage.png" alt="HeaderImage" /> 
			</div>
			<div class= "Right partHeader">
				<h1 claass="view__title">AgoraChain, pour un vote en ligne simple et sécurisé !</h1>
			</div>
			</div>
			<div class="callToAction">
				<button @click="signin()" class="buttonForm callToActionButton">
					<span>S'inscrire</span>
				</button>
			</div>
			
		</div>
		<div class ="second Section">
			<p class="view_description">AgoraChain est une solution de vote en ligne sécurisée, qui utilise la technologie de la blockchain. La blockchain est un outil qui permet le stockage et la transmission d’informations, de manière décentralisée, transparente et sécurisée. Mais qu’est-ce que ça implique ? </p>
		<div class="presentationPannel">
			<div class="pannel">
				<img src="../assets/headerImage.png" class = "presentationImage" alt="presentationImage" /> 
				<h2>Rapide</h2>
				<p> Le registre est décentralisé, c’est-à-dire stocké sur les serveurs d’AgoraChain. Ainsi, les informations sont mises à jour en temps réel.</p>
			</div>
			
			<div class="pannel">
				<h2>Infalsifiable</h2>
				<p> Le registre repose sur un système de cryptographique de validation par les utilisateurs à chaque transaction. </p>
				<img src="../assets/headerImage.png" class = "presentationImage"  alt="presentationImage" /> 
			</div>
		</div>
		</div>

		<div class="third Section">
			<div class="pricePannel">
			<div class="pannel">
				<h2>Standard</h2>
				<p> 5€ par vote</p>
				<p>Vous n’avez besoin d’organiser un seul vote ?</p>
				<p>Vous pouvez accéder à toutes les fonctionnalités pour 5€ par vote.</p>
			</div>
			<div class="space">
			</div>
			<div class="pannel">
				<h2>Premium</h2>
				<p> 40€ par vote</p>
				<p> Vous utilisez souvent des systèmes de votes ? </p>
				<p>Pour seulement 40€ par mois, vous pouvez accéder en illimité à tous nos services.  </p>
			</div>
			
		</div>
		<div class=footer>
				<p>©AgoraChain</p>
				<p>mail@agorachain.com</p>
				<p>Mars 2023</p>
			</div>
		</div>
	
	</main>
</template>



<script>
export default ({

methods: {
    login: function () {
	this.$router.push('/Authentification');
},
signin: function () {
  this.$router.push({ 
    path: '/Authentification',
    query: { mode: 'create' }
  });
}
}
})
</script>

<style scoped>

.Home-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.longLogo {
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
  width: 100%;
  padding-top: 70px;
}
.header{
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content:space-around;
	padding: 0 5% 0 5%;
}
.partHeader{
	width : 420px;

}
.first {
  background-color: var(--primary-background);
  flex-wrap: wrap;
}
.second {
	background-color: var(--light);
}
.third {
  margin-top: 50px;
  background-color: var(--primary-background);
}
.section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.topButton {
  width: 170px;
  margin-right: 50px;
  background-color: var(--light);
  color: var(--dark);
  position:absolute;
  top:40px;
  right:40px;
}
.callToActionButton {
  width: 300px;
  height: 70px;
  font-size: 20px;
  position: relative;
  top: 35px;
  
}
.callToAction{
	display: flex;
	justify-content: center;
}
.view_description {
  font-size: 20px;
  font-weight: 400;
  color: var(--dark);
  margin-bottom: 30px;
  text-align: center;
  padding: 5% 20%;
}
.pannel{
	width: 20%;
	max-width: 20%;
	height: 100%;
	background-color: var(--primary-background);
	border-radius: 20px;
	text-align: center;
	font-size: 20px;
	padding: 20px;
}
.pannel *{
	margin-top: 30px;
}
.presentationPannel{
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-evenly;}

	.pricePannel{
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-evenly;
	}
.presentationImage{
	width: 100%;
	height: auto;
}
.footer{
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding: 50px 10px 10px 10px;
}
.space{
	position: absolute;
 	width: 3px;
	height: 250px;
	background-color: var(--light);
}
</style>

