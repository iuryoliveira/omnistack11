const express = require("express");

const routes = express.Router();

routes.get("/users", (request, response) => {
  return response.json({
    evento: "Semana omnistack 11.0",
    aluno: "Iury Oliveira"
  });
});

module.exports = routes;
