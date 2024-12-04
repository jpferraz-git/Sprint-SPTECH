var express = require("express");
var router = express.Router();

var cozinhaController = require("../controllers/cozinhaController");

router.get("/:idEmpresa", function (req, res) {
  cozinhaController.buscarCozinhasPorEmpresa(req, res);
});

router.post("/cadastrar", function (req, res) {
  cozinhaController.cadastrar(req, res);
})

module.exports = router;