
// pegando os dados do formulário em forma de json: https://www.learnwithjason.dev/blog/get-form-values-as-json
function cadastrar(){
  var nome      = formUser.nome.value;
  var data      = formUser.data.value;
  var cep  = formUser.cep.value;
  var cpf       = formUser.cpf.value;
  
  if(nome==""){
      alert("Preencha o campo nome.")
      formUser.nome.focus();
      return false;
  }
  if(data==""){
    alert("Preencha o campo Data de Nascimento.")
    formUser.nome.focus();
    return false;
  }
  if(cep==""){
    alert("Preencha o campo Endereço.")
    formUser.endereco.focus();
    return false; 
  }
  // FALTA - validar outros campos se estão em branco


  // OK - Verfica se o CPF é válido
  if(validaCPF(cpf) == false){
    alert("CPF inválido.")
    formUser.cpf.focus();
    return false;
  }

 // monta o json para enviar para o back
  let dados = { cpf, nome, cep, data }
  console.log(dados);
  // OK - Salva os dados no backend
  savarUsuario(dados)  
}


// função que valida CPF
function validaCPF(cpf) {
    if (cpf.length != 11) {
        return false;
    }  else {
        var numeros = cpf.substring(0,9);
        var digitos = cpf.substring(9);

        var soma = 0;
        for (var i= 10; i > 1; i--){
            soma+= numeros.charAt(10 - i) * i;   
        }

        var resultado = (soma % 11) < 2? 0 : 11- (soma % 11);

        //validação do priemiro digito

        if (resultado != digitos.charAt(0)){
            return false;
        }

        soma = 0;
        numeros = cpf.substring(0, 10);

        for (var k = 11; k>1; k--){
            soma += numeros.charAt(11 - k) * k;    
        }

        resultado = soma % 11 < 2? 0 : 11 - (soma % 11);
   
        //validação dos segundo digito
        if(resultado != digitos.charAt(1)){
            return false;
        }

        return true;
    }
}

// Função que envia e salva os dados no backend


 function savarUsuario(dados) {
    // Enviando e recebendo dados usando XMLHttpRequest
    // https://developer.mozilla.org/pt-BR/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
    // Resolvendo o problema de não receber dados do tipo json
    // https://stackoverflow.com/questions/37654521/how-to-send-a-body-of-data-to-xmlhttprequest-that-looks-like-this
     
    var url =  "http://localhost:3000/salvar";
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');

    var result = xhr.onload =  function () {
        console.log(">>>>>>>>>>")
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText)
            var resultado = JSON.parse(xhr.responseText)
            if(resultado.resultado == "cadastrado"){
              alert("Cadastrado com sucesso!")
            }else if(resultado.resultado == "cep"){
              alert("CEP inválido!")
            }else {
              alert("CPF já cadastrado!")
            }
        }
    }
    xhr.send(JSON.stringify(dados));
}

function listarUsuarios(){
  var url =  "http://localhost:3000/listar";
  var xhr = new XMLHttpRequest();
  var myArr;
  var nomes = document.getElementById('lista_cadastrados')
  xhr.open('GET', url);

  xhr.onload = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      myArr =  JSON.parse(xhr.responseText);
      console.log(myArr)
      // listando elementos do json no html: https://pt.stackoverflow.com/questions/346084/html-javascript-listar-dados-json-em-ul-li
      myArr.forEach(usuario => {
        nomes.innerHTML += `<li>${ usuario.nome }, morador da cidade de: ${ usuario.endereco.localidade}</li>`
      })
      document.getElementById("botao_listar").disabled = true;

    }
  }
  xhr.send(null);
  console.log(myArr)
}

