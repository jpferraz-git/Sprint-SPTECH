var express = require("express");
var router = express.Router();

var dashController = require("../controllers/dashController");

router.get("/ultimasMedidas/:idCozinha/:idEmpresa", function (req, res) {
    dashController.ultimasMedidas(req, res);
});

router.get("/dadosTempoReal/:idSensor", function (req, res) {
    dashController.dadosTempoReal(req, res);
});

router.get("/dadosTempoRealPrincipal/:idCozinha/:idEmpresa", function (req, res) {
    dashController.dadosTempoRealPrincipal(req, res);
});

router.get("/mediaSemana/:idCozinha/:idEmpresa", function (req, res) {
    dashController.mediaSemana(req, res);
});

module.exports = router;