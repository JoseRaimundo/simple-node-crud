function validar(){
  var nome = formUser.nome.value;
  var data = formUser.data.value;
  var endereco = formUser.endereco.value;
  var cpf      = formUser.cpf.value;

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
  if(endereco==""){
    alert("Preencha o campo Endereço.")
    formUser.endereco.focus();
    return false; 
  }


//   validar outros campos

  if(validaCPF(cpf) == false){
    alert("CPF inválido.")
    formUser.cpf.focus();
    return false;
  }


  
}


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

function savarUsuario() {
    var url =  "http://localhost:3000/salvar";
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert(xhr.responseText);
        }
    }
    let myData =  {
      "nome" : "Teste"
    }
    xhr.send(JSON.stringify(myData));
}
savarUsuario()
