<template>
	<div class="app">
		<div class="Sidebar" v-if= "$route.name !== 'Authentification'&& $route.name !=='LandingPage'">
    <!-- <div class="Sidebar" v-if="mode == 'logged'"> -->
    <!-- Sidebar -->
		<Sidebar />
    </div>
		<!-- Content -->
		<router-view />
	</div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue';
</script>


<style lang="scss">
:root {
	--primary: #8347E5;
	--primary-alt: #E0DBFB;
	--grey: #64748b;
	--dark: #1e293b;
	--dark-alt: #334155;
	--light: #f1f5f9;
  --light-alt: #f0eafa;
	--sidebar-width: 300px;
}

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-family: 'Fira sans', sans-serif;
}

.connexion{
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.card {
  max-width: 100%;
  width: 540px;
  background:var(--primary-alt);
  border-radius: 16px;
  padding:32px;
  max-height: 100%;
  height: fit-content;
}
.card__title {
  text-align:center;
  font-weight: 800;
}
.card__subtitle {
  text-align: center;
  color:var(--grey);
  font-weight: 500;
}
  .buttonForm {
    background: var(--primary);
    color:var(--light);
    border-radius: 8px;
    font-weight: 800;
    font-size: 15px;
    border: none;
    width: 100%;
    padding: 16px;
    transition: .4s background-color;
  }
  .card__action {
    color:var(--primary);
    text-decoration: underline;
  }
  .card__action:hover {
    cursor:pointer;
    color: var(--dark);
  }
  .buttonForm:hover {
    cursor:pointer;
    opacity: 0.8;
  }
  .buttonForm--disabled {
    background: var(--primary);
    color:var(--light)
  }
  .buttonForm--disabled:hover {
    cursor:not-allowed;
    opacity: 0.8;;
  }
body {
	background: var(--light);
}

button {
	cursor: pointer;
	appearance: none;
	border: none;
	outline: none;
	background: none;
}
.app {
	display: flex;
	main {
		flex: 1 1 0;
		padding: 2rem;
		@media (max-width: 1024px) {
			padding-left: 6rem;
		}
	}
}
</style>