function revelarSenha(idInput,idImage){
    var elemento_input = document.getElementById(idInput)
    var elemento_image = document.getElementById(idImage)
    if (elemento_input.type == "password"){
        elemento_input.type = "text"
        elemento_image.src = "assets/eye.png"
    } else{
        elemento_input.type = "password"
        elemento_image.src = "assets/eye-crossed.png"
    }
}

function gerarSenha(){
    const caracateres = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ#$&*-!123456789'
    var senha_gerada = ''
    
    for (var i = 0; i <= 8; i++){
        var letra = caracateres[parseInt(Math.random()*(caracateres.length-1))]
        senha_gerada += letra
    }
    
    input_senha_cadastro.value = senha_gerada
    input_confirmacao_senha.value = senha_gerada
    
}

// Mascarando o input do CNPJ
$(document).ready(function(){
    $('#input_cnpj').mask('00.000.000/0000-00');
  });


