
// criando um servidor crud simpes em node : https://blog.geekhunter.com.br/criar-crud-nodejs/
// https://expressjs.com/pt-br/starter/hello-world.html
const express = require('express'); // importa o express
const axios = require('axios')

const bodyParser = require('body-parser')

const server = express(); // cria uma variável chamada server que chama a função express
server.listen(3000);

//reolvendo problema de não aceitar dados do form e nem json
server.use(bodyParser.json());

// resolvendo problema de acessar urls locais: https://cursos.alura.com.br/forum/topico-erro-cors-policy-98330
const cors = require('cors')

server.use(cors()) 

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

server.use(cors(corsOptions))

var usuarios = [];

server.get('/listar', (req, res) => {
    return res.json(usuarios);
})



server.post('/salvar', (req, res) => {
    console.log(req.body);
    let nome  = req.body.nome;
    console.log(nome);
    const obj = JSON.stringify( req.body );
    usuarios.push(obj);
    return res.json("deu certo");
})

 


server.get('/', async(req, res) => {
    try{
        // Como consumir uma api, neste exemplo a api do cep, usando o axios
        // https://pt.stackoverflow.com/questions/490975/consumindo-api-com-nodejs
        const response = await axios.get('https://viacep.com.br/ws/58240000/json')
        console.log(response.data)
        // sbore stringify : https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
        const obj = JSON.stringify( response.data );
        console.log(obj)
    }catch(error){
        console.log(error)
    }
})