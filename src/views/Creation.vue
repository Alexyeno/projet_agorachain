<template>
<div class="Page">
	
	<h1 class="view__title">Création d'un vote</h1>
	<div class="sub_title">
	<h2 class="sub__title">Paramètres du vote</h2>
</div>
		<div class="parameters">
			<div class="subParameters">
				<input  class="parameters__input input1" type="text" placeholder="Nom du vote"/>
				<input  class="parameters__input input2" type="text" placeholder="Date du vote"/>
			</div>
			<div class="subParameters">
				<input  class="parameters__input input3" type="text" placeholder="Organisation"/>
				<input  class="parameters__input input4" type="text" placeholder="Durée du vote"/>
			</div>
		</div>
<div class="sub_title">
	<h2 class="sub__title">Questions</h2>
</div>
<div class="global_form" v-for="(section, sectionIndex) in sections">
      <div v-for="(question, questionIndex) in section.questions">
        <div class="form-row">
          <input class="question__input input" type="text" v-model="question.question" placeholder="Question" :sectionIndex="sectionIndex">
          <span class="material-icons" v-if="section.questions.length > 1" style="cursor:pointer" @click="removeQ(sectionIndex, questionIndex)">close</span>
        </div>
        <div class="form form_answer">
          <div class="form-row" v-for="(answer, answerIndex) in question.answers">
            <input class="answer__input input" type="text" v-model="answer.answer" placeholder="Réponse">
            <span class="material-icons" v-if="question.answers.length > 1" style="cursor:pointer" @click="removeA(sectionIndex, questionIndex, answerIndex)">close</span>
          </div>
        </div>
        <div class="controls">
          <a class="a_plus" @click="addA(sectionIndex, questionIndex)">
            <i></i> Ajouter une réponse
          </a>
        </div>
      </div>
              
    <div class="controls">
      <a class="q_plus" @click="addQ(sectionIndex)"><i ></i> Ajouter une question</a>
    </div>
  </div>
	
					<div class="sub_title">
		<h2 class="sub__title">Participants</h2>
		</div>
		<div class = "global_form" v-for="(section, sectionIndex) in sections">
			<div class="form">
					<div class = "form-row" v-for="(participant, participantIndex) in section.participants">
					<input class="participant__input input" type ="texte" v-model="participant.item" placeholder="ajouter une adresse email (facultatif)" :sectionIndex="sectionIndex">
					<span class="material-icons" v-if="section.participants.length>1" style="cursor:pointer" @click="removeP(sectionIndex, participantIndex)">close</span>
					</div>
					<div class="controls">
      <a class="p_plus" @click="addP(sectionIndex)"><i></i> Ajouter un participant</a>
    </div>
					</div>
					</div>
	<div>
		<button @click="Created()" class="buttonForm">
			<span>Créer</span>
		</button>
	</div>
</div>
</template>

<script>
	export default {
		name: 'Create',
  data() {
    return {
  data: {
    question: "",
    participant: "",
    answer: ""
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
			Created: function(){
				this.$router.push('/CreationTerminee');
			},
		
			addQ(id) {
      this.sections[id].questions.push({question: '', answers: [{answer: ''}]});
    },
    removeQ(sectionIndex, questionIndex) {
      this.sections[sectionIndex].questions.splice(questionIndex, 1);
    },
	addP(id) {
      this.sections[id].participants.push({participant: ''});
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

.a_plus{
	color: var(--dark-alt);
}
.q_plus, .p_plus{
	font-weight: 400;
	font-size: 18px;
}
.form_answer{
	width: 100%;
}
.form{
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 90%;
	margin-left: auto;
}
.global_form{
	width: 70%;
}
.sub_title{
	justify-content: left;
	width: 80%;
}
.parameters__input::placeholder {
  color: var(--white);
}
.subParameters {
display: flex;
gap:150px;
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
padding:20px;
border: none;
border-radius: 30px;
background:var(--primary-alt);
font-weight: 500;
font-size: 16px;
flex:1;
min-width: 100px;
color: var(--dark);
}
.form-row {
display : flex;
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

.Page{
	margin-top: 50px;
	display: flex;
	flex-direction: column;
	align-items: center;
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
.input {
	padding:20px;
	border: none;
	background: none;
	font-weight: 400;
	font-size: 16px;
	flex:1;
	color: var(--dark);
	border-bottom: 1px solid var(--light-alt);
	width: 100%;
	justify-content: center;
}
.answer__input:focus, .question__input:focus, .participant__input:focus{
	outline:none;
	border-bottom: 1px solid var(--dark);
	border-color: var(--dark);
}
.controls{
	margin: 10px;
	text-align: right;
	text-decoration: underline;
}

</style>