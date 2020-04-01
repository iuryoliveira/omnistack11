const crypto = require("crypto");
const generateUniqueId = require("../utils/generateUniqueId");
const normalizePhoneNumber = require("../utils/normalizePhoneNumber");
const connection = require("../database/connection");

module.exports = {
  async index(request, response) {
    const ongs = await connection("ongs").select("*");

    return response.json(ongs);
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
  }
};
