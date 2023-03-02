<template>
	<div class="Page">
		<h1 class="view__title">Historique de vos votes</h1>
		<div class="form">
			<a style="cursor: pointer;" v-for="vote in votes" v-bind:key="vote.id" type="text" class="row form-row" id="input1" @click="goToVote(vote.id)">
				<div>{{ vote.title }} - {{ vote.company }} <br><br>
					<p v-if="!vote.finished">Finira dans {{ getTimeUntilTarget(vote.timestampfin).hours }} heures et {{ getTimeUntilTarget(vote.timestampfin).minutes }} minutes.</p>
					<p v-else>Fini il y a {{ getTimeSinceTarget(vote.timestampfin).hours }} heures et {{ getTimeSinceTarget(vote.timestampfin).minutes }} minutes.</p>
				</div>
				<div>
					<span v-if="vote.ownership" class="material-icons">key</span>
					<span class="material-icons">download</span>
				</div>
			</a>

		</div>
	</div>
</template>
	
<script>
export default {
	name: "Historique",
	data() {
		return {
			votes: []
		}
	},
	mounted: function () {
		this.getVotes()
	},
	methods: {
		async getVotes() {
			var nbVotes = await this.$contract.methods.getNumberOfVotes().call();
			for (var i = 0; i < nbVotes; i++) {
				var temp = await this.$contract.methods.getVote(i).call();
				if (temp[6].indexOf(this.$web3.eth.accounts.privateKeyToAccount(JSON.parse(localStorage.getItem("user")).private).address) > -1) {
					this.votes.push(
						{
							title: temp[0],
							company: temp[2],
							timestampdebut: Number(temp[7]),
							timestampfin: Number(temp[8]),
							finished: Number(temp[8])*1000 < new Date().getTime(),
							ownership: temp[3] === this.$web3.eth.accounts.privateKeyToAccount(JSON.parse(localStorage.getItem("user")).private).address,
							id: i
						}
					);
				}
			}
		},
		getTimeUntilTarget(timestamp) {
			const now = new Date().getTime();
			const target = timestamp*1000;
			const diff = target - now;
			const hours = Math.floor(diff / (1000 * 60 * 60));
			const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
			return { hours, minutes };
		},
		getTimeSinceTarget(timestamp) {
			const now = new Date().getTime();
			const target = timestamp*1000;
			const diff = now - target;
			const hours = Math.floor(diff / (1000 * 60 * 60));
			const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
			return { hours, minutes };
		},
		goToVote(voteId) {
			this.$router.push(`/SalonDeVote/${voteId}/`);
		},
	}
}

</script>


<style scoped>
a {
	text-decoration: none;
}

.form {
	display: block;
	align-content: center;
	margin-left: auto;
	margin-right: auto;
	flex-direction: column;
	width: 50%;
}

.form-row {
	display: flex;
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

.Page {
	margin-top: 50px;
	margin-bottom: 5%;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	width: 100%;
}

.sub__title {
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
	padding: 20px;
	border: none;
	background: none;
	font-weight: 400;
	font-size: 16px;
	flex: 1;
	color: var(--dark);
	border-bottom: 1px solid var(--dark);
	width: 100%;
}</style>