var express = require("express");
var router = express.Router();

var dashController = require("../controllers/dashController");

router.get("/ultimasMedidas/:idCozinha/:idEmpresa", function (req, res) {
    dashController.ultimasMedidas(req, res);
});

module.exports = router;