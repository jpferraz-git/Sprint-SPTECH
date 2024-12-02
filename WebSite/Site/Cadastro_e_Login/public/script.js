function revelarSenha(idInput, idImage) {
    if (idInput.type == "password") {
        idInput.type = "text"
        idImage.src = "public/assets/eye.png"
    } else {
        idInput.type = "password"
        idImage.src = "public/assets/eye-crossed.png"
    }
}

// Ajustar a senha gerada para atender ao critérios da validação de senha
function gerarSenha(id_campo, id_confirmacao) {
    event.preventDefault()
    const letras = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`
    const caract_especiais_senha_gerada = `!#$%&()/?@_`
    const numeros = '0123456789'

    var senha_gerada = ''

    var qtd_letras_maius = 0

    for (var i = 0; senha_gerada.length <= 8; i++) {
        if (senha_gerada.length <= 3) {
            const letra_random = letras[parseInt(Math.random() * letras.length)]
            if (letra_random == letra_random.toLowerCase() && qtd_letras_maius >= 2) {
                senha_gerada += letra_random
            } else {
                senha_gerada += letra_random.toUpperCase()
                qtd_letras_maius++
            }
        } else if (senha_gerada.length <= 5) {
            const especial_random = caract_especiais_senha_gerada[parseInt(Math.random() * caract_especiais_senha_gerada.length)]
            if (senha_gerada[senha_gerada.length - 1] != especial_random) {
                senha_gerada += especial_random
            }
        } else {
            const num_random = numeros[parseInt(Math.random() * numeros.length)]
            if (senha_gerada[senha_gerada.length - 1] != num_random) {
                senha_gerada += num_random
            }
        }
    }

    id_campo.value = senha_gerada
    id_confirmacao.value = senha_gerada

}

// Mascarando o input do CNPJ
$(document).ready(function () {
    $('#input_cnpj').mask('00.000.000/0000-00');
    $('#input_cep').mask('00000-000');
    $('#input_telefone').mask('(00)00000-0000');
});



function validarCampos() {
    for (var user_atual = 1; user_atual <= qtd_users; user_atual++) {
        const id_campo = `input_senha${user_atual}`
        const id_confirmacao = `input_confirmacao${user_atual}`
        const mensagem_erro = `mensagem_erro${user_atual}`

        var validacao_senha = false
        var validacao_confirmacao = false

        // Validando Senha
        const senha = document.getElementById(id_campo)
        const confirmacao_senha = document.getElementById(id_confirmacao)
        const mensagem = document.getElementById(mensagem_erro)
        const caract_especiais = `!"#$%&'()*+,-./:;<=>?@[\]^_\`{|}~`

        var qtd_num = 0
        var qtd_caract_especiais = 0
        var qtd_letras_maius = 0
        var possui_espaco = false

        for (var letra = 0; letra < senha.value.length; letra++) {
            var letra_caract_especial = false
            const letra_atual = senha.value[letra]

            // Números
            if (isNaN(parseInt(letra_atual)) == false) {
                qtd_num++
            } else {
                // Caracteres Especiais
                for (var caract = 0; caract < caract_especiais.length; caract++) {
                    if (letra_atual == caract_especiais[caract]) {
                        qtd_caract_especiais++
                        letra_caract_especial = true
                    }
                }

                // Letras
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
            mensagem.style = 'margin-top: 1.3em;'
            mensagem.innerHTML = `*A senha deve conter no mínimo 8 caracteres, dentre eles: no mínimo 2 números, 2 caracteres especiais, 2 letras maiúsculas e NÃO deve ter espaços.`
            trocarCorErro(id_campo, id_confirmacao)
            senha.scrollIntoView({ behavior: 'smooth' })
            return
        } else {
            validacao_senha = true
            mensagem.innerHTML = ''
            mensagem.style = 'default'
        }
        console.log(`Qtd. Números: ${qtd_num}`, `Qtd. Especiais: ${qtd_caract_especiais}`, `Letra Maiúscula: ${qtd_letras_maius}`, possui_espaco)

        // Validando se a Senha e a Confirmação são iguais

        if (senha.value != confirmacao_senha.value) {
            mensagem.style = 'margin-top: 1.3em;'
            mensagem.innerHTML = `*O campo Senha e o campo Confirmação estão diferentes.`
            trocarCorErro(id_campo, id_confirmacao)
        } else {
            validacao_confirmacao = true
            mensagem.innerHTML = ''
            mensagem.style = 'default'
        }

    }

}

function trocarCorErro(id_campo, id_confirmacao) {
    const campo = document.getElementById(id_campo)
    const confirmacao = document.getElementById(id_confirmacao)

    campo.style = 'color: #cb0000'
    confirmacao.style = 'color: #cb0000'
}

function trocarCorNormal(id_campo, id_confirmacao) {
    const campo = document.getElementById(id_campo)
    const confirmacao = document.getElementById(id_confirmacao)

    campo.style = 'default'
    confirmacao.style = 'default'
}


var qtd_users = 1
function adicionarDeletarUsuario(a) {
    const element_user = document.getElementById('div_user')
    const ultimo_adicionado = document.getElementById(`user${qtd_users}`)

    if (a == '-') {
        if (qtd_users > 1) {
            qtd_users--
            ultimo_adicionado.remove()
        }
    } else {
        qtd_users++
        element_user.innerHTML += `
        <div id="user${qtd_users}" class="user-indiv">
            <div class="separacao-campos">
                <div class="campo-indiv reduzido">
                    <p>Username</p>
                    <input required id="input_numero" placeholder="Digite aqui"
                        onfocus="this.placeholder = ''" onblur="this.placeholder = 'Digite aqui'">
                </div>
                <div class="campo-indiv">
                    <p>E-mail</p>
                    <input required type="email" id="input_email_user" placeholder="Digite aqui"
                        onfocus="this.placeholder = ''" onblur="this.placeholder = 'Digite aqui'">
                </div>
            </div>
            <div class="separacao-campos">
                <div class="campo-indiv">
                    <p>Nome Completo</p>
                    <input required id="input_nome_completo" placeholder="Digite aqui"
                        onfocus="this.placeholder = ''" onblur="this.placeholder = 'Digite aqui'">
                </div>
                <div class="campo-indiv reduzido">
                    <p>Tipo</p>
                    <select required id="select_tipo">
                        <option value="" disabled selected>Selecione</option>
                        <option value="adm">Administrador</option>
                        <option value="comum">Comum</option>
                    </select>
                </div>
            </div>
            <div class="separacao-campos senha">
                <div class="campo-indiv">
                    <p>Senha</p>
                    <div class="campo-img">
                        <input required onfocus="trocarCorNormal()" type="password" id="input_senha${qtd_users}"
                            placeholder="Digite aqui" onfocus="this.placeholder = ''"
                            onblur="this.placeholder = 'Digite aqui'">
                        <img id="img_senha${qtd_users}" onclick="revelarSenha(input_senha${qtd_users},img_senha${qtd_users})"
                            src="public/assets/eye-crossed.png" alt="">
                    </div>
                </div>
                <div class="campo-indiv">
                    <p>Confirmação</p>
                    <div class="campo-img">
                        <input required onfocus="trocarCorNormal()" type="password" id="input_confirmacao${qtd_users}"
                            placeholder="Digite aqui" onfocus="this.placeholder = ''"
                            onblur="this.placeholder = 'Digite aqui'">
                        <img id="img_confirmacao${qtd_users}"
                            onclick="revelarSenha(input_confirmacao${qtd_users},img_confirmacao${qtd_users})"
                            src="public/assets/eye-crossed.png" alt="">
                    </div>
                </div>
            </div>
            <div class="link-senha">
                <span>Temos uma sugestão de senha!</span>
                <a href="#" onclick="gerarSenha(input_senha${qtd_users},input_confirmacao${qtd_users})">Clique aqui</a>
            </div>
        </div>
            `
    }
}

var numero_campo_atual = 1
var campo_atual

function irParaProximoCampo() {

    if (numero_campo_atual == 1) {
        sendEmail()
    }

    campo_atual = document.getElementById(`campo_${numero_campo_atual}`)
    numero_campo_atual++

    campo_atual.classList.add('esconder')

    if (numero_campo_atual == 3) {
        var proximoCampoJunto = document.getElementById(`campo_${numero_campo_atual + 1}`)
        proximoCampoJunto.classList.remove('esconder')
        proximoCampoJunto.style.opacity = 0

        var proximoCampo = document.getElementById(`campo_${numero_campo_atual}`)
        proximoCampo.classList.remove('esconder')
        proximoCampo.style.opacity = 0

        document.getElementById('btn_prosseguir').innerHTML = 'Alterar senha e voltar para o login'

        setTimeout(() => {
            proximoCampo.style.opacity = 100, proximoCampoJunto.style.opacity = 100
        }, 300)
    }

    var proximoCampo = document.getElementById(`campo_${numero_campo_atual}`)
    proximoCampo.classList.remove('esconder')
    proximoCampo.style.opacity = 0

    setTimeout(() => {
        proximoCampo.style.opacity = 100
    }, 300)



    campo_atual = proximoCampo

}