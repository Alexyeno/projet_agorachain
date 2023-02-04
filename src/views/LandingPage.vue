<template>
	<main id="Home-page">
		<div>
    <h1>Hello</h1>  </div>
	<button @click="next()" class="buttonForm">
		<span>Passer</span>
	</button>
	</main>
</template>

<script>
export default ({
methods: {
    next: function () {
	this.$router.push('/Authentification');
}
}
})
</script>