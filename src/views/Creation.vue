<template>
	<div class="Page">

		<h1 class="view__title">Création d'un vote</h1>
		<div class="sub_title">
			<h2 class="sub__title">Paramètres du vote</h2>
		</div>
		<div class="parameters">
			<div class="subParameters">
				<input class="parameters__input input1" type="text" placeholder="Nom du vote" v-model="title" />
				<input class="parameters__input input2" type="text" placeholder="Date du vote (JJ/MM/AAAA HH:mm)" v-model="dateBegin" />
			</div>
			<div class="subParameters">
				<input class="parameters__input input3" type="text" placeholder="Organisation" v-model="description" />
				<input class="parameters__input input4" type="text" placeholder="Durée du vote (HH:mm)" v-model="duree" />
			</div>
		</div>
		<div class="sub_title">
			<h2 class="sub__title">Questions</h2>
		</div>
		<div class="global_form" v-for="(section, sectionIndex) in sections" v-bind:key="sectionIndex">
			<div v-for="(question, questionIndex) in section.questions" v-bind:key="question">
				<div class="form-row">
					<input class="question__input input" type="text" v-model="question.question" placeholder="Question"
						:sectionIndex="sectionIndex">
					<span class="material-icons" v-if="section.questions.length > 1" style="cursor:pointer"
						@click="removeQ(sectionIndex, questionIndex)">close</span>
				</div>
				<div class="form form_answer">
					<div class="form-row" v-for="(answer, answerIndex) in question.answers" v-bind:key="answerIndex">
						<input class="answer__input input" type="text" v-model="answer.answer" placeholder="Réponse">
						<span class="material-icons" v-if="question.answers.length > 1" style="cursor:pointer"
							@click="removeA(sectionIndex, questionIndex, answerIndex)">close</span>
					</div>
				</div>
				<div class="controls">
					<a style="cursor: pointer;" class="a_plus" @click="addA(sectionIndex, questionIndex)">
						Ajouter une réponse
					</a>
				</div>
			</div>
		</div>

		<div class="sub_title">
			<h2 class="sub__title">Participants</h2>
		</div>
		<div class="global_form" v-for="(section, sectionIndex) in sections" v-bind:key="sectionIndex">
			<div class="form">
				<div class="form-row" v-for="(participant, participantIndex) in section.participants"
					v-bind:key="participantIndex">
					<input class="participant__input input" type="texte" v-model="participant.item"
						placeholder="ajouter une adresse email (facultatif)" :sectionIndex="sectionIndex">
					<span class="material-icons" v-if="section.participants.length > 1" style="cursor:pointer"
						@click="removeP(sectionIndex, participantIndex)">close</span>
				</div>
				<div class="controls">
					<a style="cursor: pointer;" class="p_plus" @click="addP(sectionIndex)"><i></i> Ajouter un
						participant</a>
				</div>
			</div>
		</div>
		<div>
			<button @click="Created()" class="buttonForm">
				<span>Créer</span>
			</button>
		</div>
		<div class="loading-overlay" v-if="isLoading">
			<div class="loading-spinner"></div>
		</div>

	</div>
</template>

<script>
export default {
	name: 'Create',
	data() {
		return {
			isLoading: false,
			title: "",
			dateBegin: "",
			description: "",
			duree: "",
			data: {
				question: "",
			},
			sections: [
				{
					questions: [
						{
							question: "",
							answers: [
								{
									answer: ""
								}
							]
						}
					],
					participants: [
						{
							participant: ""
						}
					]
				}
			]
		}
	},
	methods: {
		Created: async function () {
			//DÉBUT DE CRÉATION DU VOTE
			this.isLoading = true;
			//INFORMATIONS DU WALLET DU CRÉATEUR DU VOTE
			var privateCreator = JSON.parse(localStorage.getItem("user")).private;
			var accountCreator = this.$web3.eth.accounts.privateKeyToAccount(privateCreator);

			var propositions = [];
			for (var ans in this.sections[0].questions[0].answers) {
				propositions.push(this.sections[0].questions[0].answers[ans].answer);
			}
			// Convertir la chaîne de date en objet Date
			const dateString = this.dateBegin;
			const dateParts = dateString.split(' ');
			const [day, month, year] = dateParts[0].split('/');
			var [hours, minutes] = dateParts[1].split(':');
			const dateObject = new Date(year, month - 1, day, hours, minutes);
			// Récupérer le timestamp UNIX de l'objet Date
			var dateBegin = dateObject.getTime() / 1000;
			// Conversion de la durée en millisecondes
			[hours, minutes] = this.duree.split(':').map(Number);
			const durationMs = (hours * 60 + minutes) * 60 * 1000;
			// Calcul du timestamp UNIX de la date après la durée
			var dateEnd = dateBegin + Math.round(durationMs / 1000);

			//CRÉER LE VOTE
			const functionName = this.$contract.methods.createVote(
				this.title,
				this.sections[0].questions[0].question,
				propositions,
				dateBegin,
				dateEnd,
				this.description
			);

			//Préparer la transaction
			const txObject = {
				from: accountCreator.address,
				to: this.$contractAddress,
				gas: 500000,
				data: functionName.encodeABI(),
				nonce: await this.$web3.eth.getTransactionCount(accountCreator.address, "pending")
			};

			//Signer
			const signedTx = await this.$web3.eth.accounts.signTransaction(txObject, privateCreator);
			//Executer
			const receipt = await this.$web3.eth.sendSignedTransaction(signedTx.rawTransaction);


			const res = await this.$contract.methods.getNumberOfVotes().call();
			const idVote = res-1;



			// RÉCUPÉRER LES CLÉS PUBLIQUES DES VOTANTS DANS LE TABLEAU "voters[]"
			var voters = [];
			for (part in this.participants) {
				const userData = {
					email: part.participant
				};
				fetch("http://localhost:8080/api/auth/getprivate", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(userData)
				})
					.then(function (response) {
						if (!response.ok) {
							throw new Error(response.statusText);
						}
						return response.json();
					})
					.then(function (data) {
						voters.push(this.$web3.eth.accounts.privateKeyToAccount(data.private).address);
						localStorage.setItem("user", JSON.stringify(data));
						//console.log(JSON.parse(localStorage.getItem("user")).private);
					})
			}

			//CRÉATION DU VOTE FINI
			this.$router.push(`/CreationTerminee/${idVote}/`);
			this.isLoading = false;
		},

		addQ(id) {
			this.sections[id].questions.push({ question: '', answers: [{ answer: '' }] });
		},
		removeQ(sectionIndex, questionIndex) {
			this.sections[sectionIndex].questions.splice(questionIndex, 1);
		},
		addP(id) {
			this.sections[id].participants.push({ participant: '' });
		},
		removeP(sectionIndex, participantIndex) {
			this.sections[sectionIndex].participants.splice(participantIndex, 1);
		},
		addA(sectionIndex, questionIndex) {
			this.sections[sectionIndex].questions[questionIndex].answers.push({ answer: '' });

		},
		removeA(sectionIndex, questionIndex, answerIndex) {
			this.sections[sectionIndex].questions[questionIndex].answers.splice(answerIndex, 1);
		}
	}
}



</script>
<style scoped>
.a_plus {
	color: var(--dark-alt);
}

.q_plus,
.p_plus {
	font-weight: 400;
	font-size: 18px;
}

.form_answer {
	width: 100%;
}

.form {
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 90%;
	margin-left: auto;
}

.global_form {
	width: 70%;
}

.sub_title {
	justify-content: left;
	width: 80%;
}

.parameters__input::placeholder {
	color: var(--white);
}

.subParameters {
	display: flex;
	gap: 150px;
	margin: 10px;
	flex-wrap: wrap;
}

.parameters {
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 60%;
}

.parameters__input {
	padding: 20px;
	border: none;
	border-radius: 30px;
	background: var(--primary-alt);
	font-weight: 500;
	font-size: 16px;
	flex: 1;
	min-width: 100px;
	color: var(--dark);
}

.form-row {
	display: flex;
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

.Page {
	margin-top: 50px;
	display: flex;
	flex-direction: column;
	align-items: center;
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

.input {
	padding: 20px;
	border: none;
	background: none;
	font-weight: 400;
	font-size: 16px;
	flex: 1;
	color: var(--dark);
	border-bottom: 1px solid var(--light-alt);
	width: 100%;
	justify-content: center;
}

.answer__input:focus,
.question__input:focus,
.participant__input:focus {
	outline: none;
	border-bottom: 1px solid var(--dark);
	border-color: var(--dark);
}

.controls {
	margin: 10px;
	text-align: right;
	text-decoration: underline;
}

.loading-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 999;
}

.loading-spinner {
	border-radius: 50%;
	border-top: 3px solid #ffffff;
	border-right: 3px solid transparent;
	border-bottom: 3px solid transparent;
	border-left: 3px solid transparent;
	width: 24px;
	height: 24px;
	animation: spin 1s linear infinite;
}

@keyframes spin {
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
}
</style>