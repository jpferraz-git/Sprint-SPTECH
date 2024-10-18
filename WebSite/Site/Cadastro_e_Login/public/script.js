function revelarSenha(idInput, idImage) {
    var elemento_input = document.getElementById(idInput)
    var elemento_image = document.getElementById(idImage)
    if (elemento_input.type == "password") {
        elemento_input.type = "text"
        elemento_image.src = "assets/eye.png"
    } else {
        elemento_input.type = "password"
        elemento_image.src = "assets/eye-crossed.png"
    }
}

// Ajustar a senha gerada para atender ao critérios da validação de senha
function gerarSenha() {
    const caracateres = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!#$%&()/@_0123456789`
    const caract_especiais_senha_gerada = `!#$%&()+/<=>?@[]_\{|}`
    var senha_gerada = ''

    var qtd_num = 0
    var qtd_caract_especiais = 0
    var qtd_letras_maius = 0
    var letra_caract_especial = false

    for (var i = 0; senha_gerada.length <= 8; i++) {
        var letra_random = caracateres[parseInt(Math.random() * (caracateres.length - 1))]
        if (isNaN(parseInt(letra_random)) == false && qtd_num < 2) {
            senha_gerada += letra_random
        } else {
            for (var caract = 0; caract < caract_especiais_senha_gerada.length; caract++) {
                if (letra_random == caract_especiais_senha_gerada[caract] && qtd_caract_especiais < 2) {
                    qtd_caract_especiais++
                    senha_gerada += letra_random
                    letra_caract_especial = true
                }
            }
            if (letra_caract_especial == false) {
                if (letra_random == letra_random.toUpperCase() && qtd_letras_maius < 2) {
                    qtd_letras_maius++
                    senha_gerada += letra_random
                } else {
                    senha_gerada += letra_random
                }
            }
        }
    }


    input_senha_cadastro.value = senha_gerada
    input_confirmacao_senha.value = senha_gerada

}

// Mascarando o input do CNPJ
$(document).ready(function () {
    $('#input_cnpj').mask('00.000.000/0000-00');
});


// Validando a Senha
function validarCampos() {
    var validacao_senha = false
    var validacao_confirmacao = false

    // Validando Senha
    const senha = input_senha_cadastro.value
    const caract_especiais = `!"#$%&'()*+,-./:;<=>?@[\]^_\`{|}~`

    var qtd_num = 0
    var qtd_caract_especiais = 0
    var qtd_letras_maius = 0
    var possui_espaco = false

    for (var letra = 0; letra < senha.length; letra++) {
        var letra_caract_especial = false
        letra_atual = senha[letra]
        if (isNaN(parseInt(letra_atual)) == false) {
            qtd_num++
        } else {
            for (var caract = 0; caract < caract_especiais.length; caract++) {
                if (letra_atual == caract_especiais[caract]) {
                    qtd_caract_especiais++
                    letra_caract_especial = true
                }
            }
            if (letra_caract_especial == false) {
                if (letra_atual == letra_atual.toUpperCase() && letra_atual != ' ') {
                    qtd_letras_maius++
                } else if (letra_atual == ' ') {
                    possui_espaco = true
                }
            }
        }

    }


    if (senha.length < 8 || qtd_num < 2 || qtd_caract_especiais < 2 || qtd_letras_maius < 2 || possui_espaco) {
        alert('A senha deve conter no mínimo 10 caracteres, dentre eles: no mínimo 2 números, 2 caracteres especiais, 2 letras maiúsculas e NÃO deve ter espaços!')
        trocarCorErro()
    } else {
        validacao_senha = true
    }

    // Validando se a Senha e a Confirmação são iguais
    const confirmacao_senha = input_confirmacao_senha.value

    if (senha != confirmacao_senha) {
        alert('O campo Senha e o campo Confirmação estão diferentes!')
        trocarCorErro()
    } else {
        validacao_confirmacao = true
    }

    if (validacao_senha && validacao_confirmacao) {
        ja_preenchi_dados.href = '../../Dashboard/index.html'
    }
}

function trocarCorErro() {
    input_senha_cadastro.style = 'color: red'
    input_confirmacao_senha.style = 'color: red'

    if (input_confirmacao_senha.type == "password") {
        input_confirmacao_senha.type = "text"
        input_confirmacao_senha.src = "assets/eye.png"
    }

    if (input_senha_cadastro.type == "password") {
        input_senha_cadastro.type = "text"
        input_senha_cadastro.src = "assets/eye.png"
    }
}

function trocarCorNormal() {
    input_senha_cadastro.style = 'default'
    input_confirmacao_senha.style = 'default'
}






