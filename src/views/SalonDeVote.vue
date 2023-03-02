<template>
  <div class="Page">
    <div class="overlay" v-if="showPopup"></div>
    <h1 class="view__title">Vote {{ this.$route.params.id }}</h1>
    <h3 class="view__title2" v-if="finished">
      Réponse(s) majoritaire(s) :
      <p v-for="rep in reponses" v-bind:key="rep">{{ rep }}</p>
    </h3>
    <div class="headerVote">
      <div class="column">
        <div class="row">
          <p><b>Titre :</b> {{ title }}</p>
          <p><b>Date de début :</b> {{ dateBegin }}</p>
        </div>
        <div class="row">
          <p><b>Description :</b> {{ description }}</p>
          <p><b>Date de fin :</b> {{ dateEnd }}</p>
        </div>
      </div>
    </div>
    <form class="questionnaire">
      <div v-for="(question, index) in questions" :key="question" class="question">
        <p>{{ question.text }}</p>
        <div class="answer" v-for="(answer, i) in question.answers" :key="i">
          <label>
            <input type="radio" :name="`question-${index}-answer`" :value="answer.text"
              v-model="question.selectedAnswer"
              :disabled="!canVote" :checked="i === 0 && canVote">
            {{ answer.text }}
          </label>
        </div>
      </div>

    </form>
    <button @click="Validate()" class="buttonForm"><span>Enregistrer</span></button>
    <div id="popUp" v-if="showPopup">
      Votre vote a été enregistré
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      showPopup: false,
      title: "",
      dateBegin: null,
      dateEnd: null,
      description: "",
      canVote: false,
      questions: [
        {
          text: "",
          answers: [],
          selectedAnswer: 0,
        },
      ],
      isLoading: false,
      finished: false,
      reponses: []
    };
  },
  mounted: function () {
    this.getVote()
  },
  methods: {
    async Validate() {
      //DÉBUT DE PUSH DU VOTE
      this.isLoading = true;

      const user = this.$web3.eth.accounts.privateKeyToAccount(JSON.parse(localStorage.getItem("user")).private);

      const selectedAnswerId = this.questions[0].answers.findIndex(answer => answer.text === this.questions[0].selectedAnswer);
      var id = selectedAnswerId > -1 ? selectedAnswerId : 0;
      //VOTER
			const functionName = this.$contract.methods.vote(
				this.$route.params.id,
        id
			);
      //Préparer la transaction
			const txObject = {
				from: user.address,
				to: this.$contractAddress,
				gas: 500000,
				data: functionName.encodeABI(),
				nonce: await this.$web3.eth.getTransactionCount(user.address, "pending")
			};
			//Signer
			const signedTx = await this.$web3.eth.accounts.signTransaction(txObject, JSON.parse(localStorage.getItem("user")).private);
			//Executer
			const receipt = await this.$web3.eth.sendSignedTransaction(signedTx.rawTransaction);



      //PUSH DU VOTE FINI
      this.isLoading = false;
      this.showPopup = true;
      setTimeout(() => {
        this.showPopup = false;
        this.$router.push('/Accueil');
      }, 5000);
    },
    async getVote() {
      const id = this.$route.params.id
      var res = await this.$contract.methods.getVote(id).call();
      const user = this.$web3.eth.accounts.privateKeyToAccount(JSON.parse(localStorage.getItem("user")).private);
      if (res[6].indexOf(user.address) <= -1)
        this.$router.push(`/Accueil/`);
      this.title = res[0]
      this.questions[0].text = res[1]
      this.description = res[2]
      for (var i = 0; i < res[4].length; i++) {
        this.questions[0].answers.push({ text: res[4][i] })
      }
      const options = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
      };
      const result = await this.$contract.methods.senderCanVote(id).call({ from: user.address });
      var finished = await this.$contract.methods.hasVoteFinished(id).call();
      var began = await this.$contract.methods.hasVoteBegan(id).call();
      if(result[0] && !finished && began) {
        this.canVote = true
      }
      if(finished) {
        console.log(res)
        this.finished = true;
        const max = Math.max(...res[5]);
        var res2 = [];
        const numberArray = res[5].map(Number);
        numberArray.forEach((item, index) => item === max ? res2.push(index): null);
        for(var i = 0; i < res2.length; i++) {
          this.reponses.push(res[4][res2[i]]);
          console.log(res[4][res2[i]])
        }
      }
      
      var timestamp = Number(res[7]);
      var date = new Date(timestamp * 1000);
      this.dateBegin = `${date.toLocaleTimeString([], options)}`;
      timestamp = Number(res[8]);
      var date = new Date(timestamp * 1000);
      this.dateEnd = `${date.toLocaleTimeString([], options)}`;
    }
  },
}
</script>
  
<style scoped>
.view__title {
  font-size: 40px;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 30px;
  text-align: center;
}

.view__title2 {
  font-size: 30px;
  font-weight: 500;
  color: var(--primary);
  margin-bottom: 30px;
  text-align: center;
}

.headerVote {
  width: 50%;
  background-color: var(--primary-background);
  border-radius: 40px;
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
}

.column {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
}

.Page {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.buttonForm {
  width: 200px;
  cursor: pointer;
  margin: 50px;
}

#popUp {
  position: absolute;
  top: 30%;
  background-color: var(--primary-background);
  height: 20%;
  width: 40%;
  text-align: center;
  font-size: 20px;
  border-radius: 40px;
  z-index: 1000;
  font-size: 30px;
  font-weight: 600;
  color: var(--dark);
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.question {
  width: 100%;
  margin: 20px;
  font-size: 20px;
  font-weight: 600;
  color: var(--primary);
  text-align: left;
}

.answer {
  margin: 20px;
  font-size: 20px;
  font-weight: 500;
  color: var(--dark);
  margin-bottom: 10px;
}

.questionnaire {
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
