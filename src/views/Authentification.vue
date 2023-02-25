<template>
		<div class="connexion">
		<div class="longLogo">
				<img :src="longLogo" alt="AgoraChainLogo"/> 
		</div>
		<div class="card">
		<h1 class="card__title" v-if="mode == 'login'">Connexion</h1>
		<h1 class="card__title" v-if="mode == 'create'">Inscription</h1>
    <h1 class="card__title" v-if="mode == 'without'">Rejoindre un salon de vote</h1>
		<p class="card__subtitle" v-if="mode == 'login'">Tu n'as pas encore de compte ? <span class="card__action" @click="switchToCreateAccount()">Créer un compte</span></p>
		<p class="card__subtitle" v-if="mode== 'create'">Tu as déjà un compte ? <span class="card__action" @click="switchToLogin()">Se connecter</span></p>
		<div v-if="mode == 'without'" class="form-row">
			<input class="form-row__input" type="text" placeholder="Code du salon"/>
		</div>
    <div class="form-row">
			<input v-model="email" class="form-row__input" type="text" placeholder="Adresse mail"/>
		</div>
		<div class="form-row" v-if="mode == 'create'">
			<input v-model="prenom" class="form-row__input" type="text" placeholder="Prénom"/>
			<input v-model="nom" class="form-row__input" type="text" placeholder="Nom"/>
		</div>
		<div v-if="mode=='login' || mode=='create'" class="form-row">
			<input v-model="password" class="form-row__input" type="password" placeholder="Mot de passe"/>
		</div>
		<div class="form-row" v-if="mode == 'login' && status == 'error_login'">
			Adresse mail et/ou mot de passe invalide
		</div>
		<div class="form-row" v-if="mode == 'create' && status == 'error_create'">
			Adresse mail déjà utilisée
		</div>
		<div class="form-row">
			<button @click="login()" class="buttonForm" :class="{'buttonForm--disabled' : !validatedFields}" v-if="mode == 'login'">
			<span v-if="status == 'loading'">Connexion en cours...</span>
			<span v-else>Connexion</span>
			</button>
			<button @click="createAccount()" class="buttonForm" :class="{'buttonForm--disabled' : !validatedFields}" v-if="mode == 'create'">
			<span v-if="status == 'loading'">Création en cours...</span>
			<span v-else>Créer mon compte</span>
			</button>
      <button @click="loginWOAccount()" class="buttonForm" :class="{'buttonForm--disabled' : !validatedFields}" v-if="mode == 'without'">
			<span v-if="status == 'loading'">Connexion en cours...</span>
			<span v-else>Se connecter</span>
			</button>
    
      <button v-if="mode=='login'" @click="switchToWithoutAccount()" class="buttonForm">
				<span>Je souhaite voter sans créer de compte</span>
			</button>
	<!-- Bouton à supprimer, pass sans back -->
      <button v-if="mode=='login' || mode=='create'" @click="switchTologged();next()" class="buttonForm">
				<span>Passer</span>
			</button>
      <button v-if="mode=='without'" @click="switchTologged();nextWOAccount()" class="buttonForm">
				<span>Passer</span>
			</button>
  	<!-- Bouton à supprimer, pass sans back -->
		</div>
	</div>
</div>

</template>

<script setup>
import longLogo from '../assets/longLogo.svg'
</script>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Login',
  data: function () {
    return {
      mode: 'login',
      email: '',
      prenom: '',
      nom: '',
      password: '',
    }
  },
  mounted: function () {
    if (this.$store.state.user.userId != -1) {
      this.$router.push('/profile');
      return ;
    }
  },
  computed: {
    validatedFields: function () {
      if (this.mode == 'create') {
        if (this.email != "" && this.prenom != "" && this.nom != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.email != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      }
    },
    ...mapState(['status'])
  },
  methods: {
    switchToCreateAccount: function () {
      this.mode = 'create';
    },
    switchTologged: function () {
      this.mode = 'logged';
    },
    switchToLogin: function () {
      this.mode = 'login';
    },
    switchToWithoutAccount: function () {
      this.mode = 'without';
    },
	/* Boutton à supprimer, pass sans background */
	next: function(){
		this.$router.push('/Accueil');
	},
  nextWOAccount: function(){
		this.$router.push('/VoteRoom');
	},
	/* Boutton à supprimer, pass sans background */
  

login: function () {
const self = this;
const userData = {
email: this.email,
password: this.password
};

fetch("http://localhost:8080/api/auth/signin", {
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
localStorage.setItem("user", JSON.stringify(data));
self.$router.push('/Accueil');
})
.catch(function (error) {
console.log(error);
});
},

createAccount: function () {
const self = this;
const userData = {
username: this.nom,
email: this.email,
password: this.password,
roles: ["user"]
};

fetch("http://localhost:8080/api/auth/signup", {
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
localStorage.setItem("user", JSON.stringify(data));
self.login();
})
.catch(function (error) {
console.log(error);
});
},
    loginWOAccount: function () {
      const self = this;
      this.$store.dispatch('loginWOAccount', {
        email: this.email,
      }).then(function () {
        self.$router.push('/Vote');
      }, function (error) {
        console.log(error);
      })
    },
    loginWOAccount: function () {
      const self = this;
      this.$store.dispatch('loginWOAccount', {
        email: this.email,
      }).then(function () {
        self.$router.push('/Vote');
      }, function (error) {
        console.log(error);
      })
    }
  }
}
</script>

<style scoped>
.longLogo {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
  margin-top: 50px;
}
.form-row {
  display: flex;
  margin: 16px 0px;
  gap:16px;
  flex-wrap: wrap;
}
.form-row__input {
  padding:8px;
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