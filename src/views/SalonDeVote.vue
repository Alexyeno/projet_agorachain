<template>
    <div class="Page">
    <div class="overlay" v-if="showPopup"></div>
      <h1 class="view__title">Nom du vote</h1>
      <div class="headerVote">
        <div class = "column">
          <div class="row">   
            <p>Nom de l'organisme</p>
            <p>Date</p>
          </div>
          <div class="row"> 
            <p>Vote anonyme ou non</p>
            <p>Temps restant</p>
          </div>
        </div>
      </div>
    <form class="questionnaire">
      <div v-for="(question, index) in questions" :key="index" class="question">
        <p>{{ question.text }}</p>
        <div class="answer" v-for="(answer, i) in question.answers" :key="i">
          <label>
            <input type="checkbox"
                   :name="`question-${index}-answer`"
                   :value="answer.text"
                   v-model="question.selectedAnswers">
            {{ answer.text }}
          </label>
        </div>
      </div>
      
      </form>
      <button @click="Validate()" class="buttonForm"><span>Enregistrer</span></button>
      
    </div>
    <div id="popUp" v-if="showPopup">
         Votre vote a été enregistré
      </div>
  </template>
  
  <script>
  export default {
  data() {
    return {
      showPopup: false,
      questions: [
        {
          text: "Question 1",
          answers: [
            { text: "Réponse 1" },
            { text: "Réponse 2" },
            { text: "Réponse 3" },
          ],
          selectedAnswers: [],
        },
        {
          text: "Question 2",
          answers: [
            { text: "Réponse 1" },
            { text: "Réponse 2" },
            { text: "Réponse 3" },
          ],
          selectedAnswers: [],
        },
        {
          text: "Question 3",
          answers: [
            { text: "Réponse 1" },
            { text: "Réponse 2" },
            { text: "Réponse 3" },
          ],
          selectedAnswers: [],
        },
      ],
    };
  },
  methods: {
    Validate() {
      this.showPopup = true;
      setTimeout(() => {
        this.showPopup = false;
        this.$router.push('/Accueil');
      }, 5000);
    }
  }
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
  .headerVote{
    width: 50%;
    background-color: var(--primary-background);
    border-radius: 40px;
  }
  .row{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: 20px;
  }
  .column{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    padding: 20px;
  }
  .Page{
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
  .question{
    width: 100%;
    margin: 20px;
    font-size: 20px;
    font-weight: 600;
    color: var(--primary);
    text-align: left;
  }
  .answer{
    margin: 20px;
    font-size: 20px;
    font-weight: 500;
    color: var(--dark);
    margin-bottom: 10px;
  }
  .questionnaire{
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  </style>
