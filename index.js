
// criando um servidor crud simpes em node : https://blog.geekhunter.com.br/criar-crud-nodejs/
// criando um hello world em express e node:  https://expressjs.com/pt-br/starter/hello-world.html
const express = require('express')
const axios = require('axios')

// Como exportar e usar classes em js: https://adrianmejia.com/getting-started-with-node-js-modules-require-exports-imports-npm-and-beyond/
const Usuario = require('./model/Usuario')


// Crindo o que irá ser minha variável onde tá o servidor
const server = express();
server.listen(3000);


// Resolvendo o problema do front não funcionar com JSON: 
// https://stackoverflow.com/questions/37654521/how-to-send-a-body-of-data-to-xmlhttprequest-that-looks-like-this
// https://www.schoolofnet.com/forum/topico/nodejs-body-parser-esta-velho-904
const bodyParser = require('body-parser')
server.use(bodyParser.json());

// resolvendo problema de acessar urls locais: https://cursos.alura.com.br/forum/topico-erro-cors-policy-98330
const cors = require('cors')

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

server.use(cors()) 
server.use(cors(corsOptions))


// lista para salvar os usuarios
//var user = new Usuario("test", 29)
//var usuarios = [user , user];
var usuarios = [];

server.get('/listar', (req, res) => {
    return res.json(usuarios);
})

server.post('/salvar', async(req, res) => {

    const obj = JSON.parse(JSON.stringify(req.body));

    let verificado = false;
    usuarios.forEach(us => {
        if(us.cpf == obj.cpf){
            verificado = true;
        }
    });

    if(verificado == true){
        return res.json({"resultado":"falhou"});
    }else{
        let localEndereco = []
        let testCep = true;
        try{
            let url = 'https://viacep.com.br/ws/' + obj.cep+ '/json';
            const response = await axios.get(url)
            // sbore stringify : https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
            localEndereco = JSON.parse(JSON.stringify( response.data ))
        }catch(error){
            testCep = false;
        }

        if(testCep == true){
            var user = Object.assign(new Usuario, obj)
            user.endereco = localEndereco
    
            usuarios.push(user)
            return res.json({"resultado": "cadastrado"});
        }else{
            return res.json({"resultado": "cep"});
        }  
    }  
})


server.get('/', async(req, res) => {
    try{
        // Como consumir uma api, neste exemplo a api do cep, usando o axios
        // https://pt.stackoverflow.com/questions/490975/consumindo-api-com-nodejs
        const response = await axios.get('https://viacep.com.br/ws/58240000/json')
        console.log(response.data)
        // sbore stringify : https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
        const obj = JSON.stringify( response.data );
        console.log(response.data)
    }catch(error){
        console.log(error)
    }
})


