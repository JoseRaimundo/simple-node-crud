// trabalhando com classes em javascirpt: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Classes

class Usuario {
    constructor(cpf, nome, data, cep, endereco) {
      this.cpf = cpf;
      this.nome = nome;
      this.data = data;
      this.cep = cep;
      this.endereco = endereco;
    }
}

module.exports = Usuario;


// let user = new Usuario("José", 29, end)

// console.log(user)
// console.log(user.nome)
// console.log(user.idade)
// console.log(user.endereco.cep)