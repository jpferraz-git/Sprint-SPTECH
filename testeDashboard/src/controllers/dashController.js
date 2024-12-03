var dashModel = require("../models/dashModel");

function ultimasMedidas(req, res) {
    var idCozinha = req.params.idCozinha;
    var idEmpresa = req.params.idEmpresa;

    if (idCozinha == undefined) {
        res.status(400).send("Não foi possível puxar o id do usuário");
    } else if (idEmpresa == undefined) {
        res.status(400).send("Não foi possível puxar o id da empresa");
    } else {

        dashModel.ultimasMedidas(idCozinha, idEmpresa)
            .then(
                function (medidas) {
                    console.log(medidas)
                    res.json(medidas);
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

function dadosTempoReal(req, res) {
    var idSensor = req.params.idSensor;

    dashModel.dadosTempoReal(idSensor)
        .then(
            function (medidas) {
                res.json(medidas);
            })
        .catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao selecionar os niveis dos sensores! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function dadosTempoRealPrincipal(req, res) {
    var idCozinha = req.params.idCozinha;
    var idEmpresa = req.params.idEmpresa;

    dashModel.dadosTempoRealPrincipal(idCozinha, idEmpresa)
        .then(
            function (medidas) {
                res.json(medidas);
            })
        .catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao selecionar os niveis dos sensores! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    ultimasMedidas,
    dadosTempoReal,
    dadosTempoRealPrincipal
}