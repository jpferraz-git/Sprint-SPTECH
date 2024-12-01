var express = require("express");
var router = express.Router();

var kpiController = require("../controllers/kpiController");

router.get("/capturarKpiAtivos/:idCozinhaServer/:idEmpresaServer", function (req, res) {
    kpiController.capturarKpiAtivos(req, res);
});

module.exports = router;