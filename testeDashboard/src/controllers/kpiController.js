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

module.exports = {
    capturarKpiAtivos,
    capturarKpiInoperante
}