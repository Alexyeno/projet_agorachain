<template>
  <div class="connexion">
    <div class="longLogo">
      <img :src="longLogo" alt="AgoraChainLogo" />
    </div>
    <div class="card">
      <h1 class="card__title" v-if="mode == 'login'">Connexion</h1>
      <h1 class="card__title" v-if="mode == 'create'">Inscription</h1>
      <h1 class="card__title" v-if="mode == 'without'">Rejoindre un salon de vote</h1>
      <p class="card__subtitle" v-if="mode == 'login'">Tu n'as pas encore de compte ? <span class="card__action"
          @click="switchToCreateAccount()">Créer un compte</span></p>
      <p class="card__subtitle" v-if="mode == 'create'">Tu as déjà un compte ? <span class="card__action"
          @click="switchToLogin()">Se connecter</span></p>
      <div v-if="mode == 'without'" class="form-row">
        <input class="form-row__input" type="text" placeholder="Code du salon" />
      </div>
      <div class="form-row">
        <input v-model="email" class="form-row__input" type="text" placeholder="Adresse mail" />
      </div>
      <div class="form-row" v-if="mode == 'create'">
        <input v-model="prenom" class="form-row__input" type="text" placeholder="Prénom" />
        <input v-model="nom" class="form-row__input" type="text" placeholder="Nom" />
      </div>
      <div v-if="mode == 'login' || mode == 'create'" class="form-row">
        <input v-model="password" class="form-row__input" type="password" placeholder="Mot de passe" />
      </div>
      <div class="form-row" v-if="mode == 'login' && status == 'error_login'">
        Adresse mail et/ou mot de passe invalide
      </div>
      <div class="form-row" v-if="mode == 'create' && status == 'error_create'">
        Adresse mail déjà utilisée
      </div>
      <div class="form-row">
        <button @click="login()" class="buttonForm" :class="{ 'buttonForm--disabled': !validatedFields }"
          v-if="mode == 'login'">
          <span v-if="status == 'loading'">Connexion en cours...</span>
          <span v-else>Connexion</span>
        </button>
        <button @click="createAccount()" class="buttonForm" :class="{ 'buttonForm--disabled': !validatedFields }"
          v-if="mode == 'create'">
          <span v-if="status == 'loading'">Création en cours...</span>
          <span v-else>Créer mon compte</span>
        </button>
        <button @click="loginWOAccount()" class="buttonForm" :class="{ 'buttonForm--disabled': !validatedFields }"
          v-if="mode == 'without'">
          <span v-if="status == 'loading'">Connexion en cours...</span>
          <span v-else>Se connecter</span>
        </button>
      </div>
    </div>
    <div class="loading-overlay" v-if="isLoading">
      <div class="loading-spinner"></div>
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
      isLoading: false
    }
  },
  created() {
    if (this.$route.query.mode === 'create') {
      this.mode = 'create';
    }
  },

  mounted: function () {
    if (this.$store.state.user.userId != -1) {
      this.$router.push('/profile');
      return;
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
    /* Boutton à supprimer, pass sans backg*/
    next: function () {
      this.$router.push('/Accueil')
    },
    /* Boutton à supprimer, pass sans back */


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
          //console.log(JSON.parse(localStorage.getItem("user")).private);
          self.$router.push({
            path: '/Accueil',
            query: { mode: 'logged' }
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    createAccount: async function () {
      const self = this;
      const account = this.$web3.eth.accounts.create();
      this.isLoading = true;
      //GIVE 0.001 MATIC TO NEW USER
      const from = this.$masterAccount.address;
      const to = account.address;
      const value = this.$web3.utils.toWei('0.01', 'ether');
      const gasPrice = await this.$web3.eth.getGasPrice();
      const gasLimit = 21000;
      const nonce = await this.$web3.eth.getTransactionCount(from, 'pending');
      const rawTransaction = {
        from: from,
        to: to,
        value: value,
        gasPrice: gasPrice,
        gas: gasLimit,
        nonce: nonce
      };
      const signedTransaction = await this.$web3.eth.accounts.signTransaction(rawTransaction, this.$masterAccount.privateKey);
      const transactionReceipt = await this.$web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
      //console.log(`Transaction envoyée : https://mumbai.polygonscan.com/tx/${transactionReceipt.transactionHash}`);


      const userData = {
        nom: this.nom,
        prenom: this.prenom,
        email: this.email,
        password: this.password,
        private: account.privateKey,
        roles: ["user"],
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

      this.isLoading = false;
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
  gap: 16px;
  flex-wrap: wrap;
}

.form-row__input {
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: #f2f2f2;
  font-weight: 500;
  font-size: 16px;
  flex: 1;
  min-width: 100px;
  color: black;
}

.form-row__input::placeholder {
  color: #aaaaaa;
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
</style>>