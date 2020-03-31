const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");

describe("Login", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("should not be able to login with id not found", async () => {
    const response = await request(app)
      .post("/sessions")
      .send({ id: "12345678" });

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("No ong found with this id");
  });

  it("should be able to login with valid ong id", async () => {
    const ongName = "GBUD",
      ongEmail = "teste@email.com",
      ongWhatsapp = "3111111111",
      ongCity = "Belo Horizonte",
      ongUf = "MG";

    const ongResponse = await request(app)
      .post("/ongs")
      .send({
        name: ongName,
        email: ongEmail,
        whatsapp: ongWhatsapp,
        city: ongCity,
        uf: ongUf
      });

    const ong_id = ongResponse.body.id;

    const response = await request(app)
      .post("/sessions")
      .send({ id: ong_id });

    expect(response.status).toEqual(200);
    expect(response.body).toHaveProperty("name");
    expect(response.body.name).toEqual(ongName);
  });

  it("Should not validate id with more than 8 characters", async () => {
    const response = await request(app)
      .post("/sessions")
      .send({ id: "123456789" });

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Bad Request");
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual(
      '"id" length must be 8 characters long'
    );
  });

  it("Should not validate id with less than 8 characters", async () => {
    const response = await request(app)
      .post("/sessions")
      .send({ id: "1234567" });

    expect(response.status).toEqual(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual("Bad Request");
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual(
      '"id" length must be 8 characters long'
    );
  });
});
