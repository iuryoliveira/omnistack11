const crypto = require("crypto");
const generateUniqueId = require("../utils/generateUniqueId");
const normalizePhoneNumber = require("../utils/normalizePhoneNumber");
const connection = require("../database/connection");

module.exports = {
  async index(request, response) {
    const ongs = await connection("ongs").select("*");

    return response.json(ongs);
  },

  async find(request, response) {
    const { id } = request.params;
    const ong = await connection("ongs")
      .select("*")
      .where("id", id)
      .first();
    return response.json(ong);
  },

  async create(request, response) {
    let { name, email, whatsapp, city, uf } = request.body;
    const id = generateUniqueId();

    whatsapp = normalizePhoneNumber(whatsapp);

    await connection("ongs").insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    });

    return response.json({ id });
  },

  async update(request, response) {
    let { name, email, whatsapp, city, uf } = request.body;
    let ong_id = request.headers.authorization;

    whatsapp = normalizePhoneNumber(whatsapp);

    await connection("ongs")
      .update({
        name,
        email,
        whatsapp,
        city,
        uf
      })
      .where("id", ong_id);

    return response.status(204).send();
  }
};
