var kpiModel = require("../models/kpiModel");

function capturarKpiAtivos(req, res) {
    var idCozinha = req.params.idCozinhaServer;
    var idEmpresa = req.params.idEmpresaServer;

    if (idCozinha == undefined) {
        res.status(400).send("Não foi possível puxar o id do usuário");
    } else if (idEmpresa == undefined) {
        res.status(400).send("Não foi possível puxar o id da empresa");
    } else {

        kpiModel.capturarKpiAtivos(idCozinha, idEmpresa)
            .then(
                function (qtdAtivos) {
                    res.json(qtdAtivos);
                })
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao selecionar os sensores ativos! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function capturarKpiInoperante(req, res) {
    var idCozinha = req.params.idCozinhaServer;
    var idEmpresa = req.params.idEmpresaServer;

    if (idCozinha == undefined) {
        res.status(400).send("Não foi possível puxar o id do usuário");
    } else if (idEmpresa == undefined) {
        res.status(400).send("Não foi possível puxar o id da empresa");
    } else {

        kpiModel.capturarKpiInoperante(idCozinha, idEmpresa)
            .then(
                function (qtdInoperante) {
                    res.json(qtdInoperante);
                })
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao selecionar os sensores inativos! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function capturarKpiNiveis(req, res) {
    var idCozinha = req.params.idCozinhaServer;
    var idEmpresa = req.params.idEmpresaServer;

    if (idCozinha == undefined) {
        res.status(400).send("Não foi possível puxar o id do usuário");
    } else if (idEmpresa == undefined) {
        res.status(400).send("Não foi possível puxar o id da empresa");
    } else {

        kpiModel.capturarKpiNiveis(idCozinha, idEmpresa)
            .then(
                function (qtdAvisos) {
                    res.json(qtdAvisos);
                })
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao selecionar os niveis dos sensores! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function capturarKpiValores(req, res) {
    var idCozinha = req.params.idCozinhaServer;
    var idEmpresa = req.params.idEmpresaServer;

    if (idCozinha == undefined) {
        res.status(400).send("Não foi possível puxar o id do usuário");
    } else if (idEmpresa == undefined) {
        res.status(400).send("Não foi possível puxar o id da empresa");
    } else {

        kpiModel.capturarKpiValores(idCozinha, idEmpresa)
            .then(
                function (valorMedidas) {
                    res.json(valorMedidas);
                })
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao selecionar os niveis dos sensores! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    capturarKpiAtivos,
    capturarKpiInoperante,
    capturarKpiNiveis,
    capturarKpiValores
}