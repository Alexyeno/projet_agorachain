import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Web3 from 'web3';
const web3 = new Web3('https://rpc-mumbai.maticvigil.com/');
const app = createApp(App);


var contractAddress = '0x0bAaD4c9e65C5c4ECa8bbe1Fe2E57FF99fCE147b';
app.config.globalProperties.$contractAddress = contractAddress;
import contractAbi from './abi.json';
app.config.globalProperties.$web3 = web3;
app.config.globalProperties.$contract = new web3.eth.Contract(contractAbi, contractAddress);
// this.contract

app.config.globalProperties.$masterAccount = web3.eth.accounts.privateKeyToAccount('0x43562c9990f46ded7f9d3506226b87c1243896ff9e3e28f09a060117f0bb7036');


app.use(router).use(store).mount('#app')
