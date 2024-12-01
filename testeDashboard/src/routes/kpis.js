var express = require("express");
var router = express.Router();

var kpiController = require("../controllers/kpiController");

router.get("/capturarKpiAtivos/:idCozinhaServer/:idEmpresaServer", function (req, res) {
    kpiController.capturarKpiAtivos(req, res);
});

router.get("/capturarKpiInoperante/:idCozinhaServer/:idEmpresaServer", function (req, res) {
    kpiController.capturarKpiInoperante(req, res);
});

router.get("/capturarKpiNiveis/:idCozinhaServer/:idEmpresaServer", function (req, res) {
    kpiController.capturarKpiNiveis(req, res);
});

router.get("/capturarKpiValores/:idCozinhaServer/:idEmpresaServer", function (req, res) {
    kpiController.capturarKpiValores(req, res);
});

router.get("/qtdAlertasDia/:idCozinhaServer/:idEmpresaServer/:idSensorServer", function (req, res) {
    kpiController.qtdAlertasDia(req, res);
});

module.exports = router;