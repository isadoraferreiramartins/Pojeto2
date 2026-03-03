import axios from 'axios';

// Criamos uma instância do axios apontando para o JSON Server
export const api = axios.create({
  baseURL: 'http://localhost:3000' 
});

// import axios from 'axios';

// export const api = axios.create({
//   baseURL: 'http://localhost:3000' // Certifique-se de que NÃO tem a palavra /clientes aqui!
// });