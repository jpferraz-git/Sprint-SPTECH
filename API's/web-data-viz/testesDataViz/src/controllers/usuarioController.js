var usuarioModel = require("../models/usuarioModel");
var cozinhaModel = require("../models/cozinhaModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                        cozinhaModel.buscarCozinhasPorEmpresa(resultadoAutenticar[0].idUsuario)
                            .then((resultadoAutenticar) => {
                                if (resultadoAutenticar.length > 0) {
                                    res.json({
                                        email: resultadoAutenticar[0].emailEmpresa,
                                        idEmpresa: resultadoAutenticar[0].fkEmpresa,
                                        idCozinha: resultadoAutenticar[0].idCozinha
                                    });
                                } else {
                                    res.status(204).json({resultadoAutenticar});
                                }
                            })
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html

    var razaoSocial = req.body.razaoSocialServer;
    var nomeFantasia = req.body.nomeFantasiaServer;
    var responsavelLegal = req.body.responsavelLegalServer;
    var cnpj = req.body.cnpjServer;
    var estado = req.body.estadoServer;
    var cidade = req.body.cidadeServer;
    var numero = req.body.numeroServer;
    var bairro = req.body.bairroServer;
    var CEP = req.body.cepServer;
    var logradouro = req.body.logradouroServer;
    var email = req.body.emailServer;
    var telefone = req.body.telefoneServer;
    var senha = req.body.senhaServer;


    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js

    usuarioModel.inserirMedidas(razaoSocial, nomeFantasia, responsavelLegal, cnpj, estado, cidade, numero, bairro, CEP, logradouro, email, telefone, senha)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar o cadastro! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function autenticarEmail(req, res) {
    var email = req.body.emailServer;


    usuarioModel.autenticarEmailModel(email)
        .then(function (resultadoAutenticar) {
            console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
            console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

            if (resultadoAutenticar.length === 0) {
                res.json(0)
            } else if (resultadoAutenticar.length === 1) {
                // Caso haja exatamente um resultado, enviar o resultado
                res.json(resultadoAutenticar);
            } 
        })

        .catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao autenticar o email: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function atualizarSenha(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html

    var novaSenha = req.body.senhaServer;
    var idUsuario = req.body.idUsuarioServer;

    // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js

    usuarioModel.atualizarSenhaModel(novaSenha, idUsuario)
        .then(
            function (resultado) {
                res.json(resultado);
                console.log('Senha atualizada com sucesso!')
            }
        ).catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "\nHouve um erro ao realizar a atualizar a senha! Erro: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}





module.exports = {
    autenticar,
    cadastrar,
    autenticarEmail,
    atualizarSenha
}