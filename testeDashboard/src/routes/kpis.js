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

module.exports = router;