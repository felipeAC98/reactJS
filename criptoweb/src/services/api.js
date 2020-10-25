import axios from 'axios';

//Criando um objeto com uma URL base para que todas as requisicoes a partir desse objeto partam dessa url
const api = axios.create({baseURL:'https://api.binance.com'})

export default api;