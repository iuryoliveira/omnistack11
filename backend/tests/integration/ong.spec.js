const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");

describe("ONG", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("should be able to create new ONG", async () => {
    const response = await request(app)
      .post("/ongs")
      .send({
        name: "APAD3",
        email: "teste@email.com",
        whatsapp: "3111111111",
        city: "Belo Horizonte",
        uf: "MG"
      });

    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toHaveLength(8);
    expect(response.status).toEqual(200);
  });

  it("Should be able to list ONG", async () => {
    const name = "GBUD",
      email = "teste@email.com",
      whatsapp = "3111111111",
      city = "Belo Horizonte",
      uf = "MG";

    await request(app)
      .post("/ongs")
      .send({
        name,
        email,
        whatsapp,
        city,
        uf
      });

    let response = await request(app).get("/ongs");
    expect(response.body[0].id).toHaveLength(8);
    expect(response.body[0].name).toEqual(name);
    expect(response.body[0].email).toEqual(email);
    expect(response.body[0].whatsapp).toEqual(whatsapp);
    expect(response.body[0].city).toEqual(city);
    expect(response.body[0].uf).toEqual(uf);
    expect(response.status).toEqual(200);
  });

  it("Should be able to find ONG", async () => {
    const name = "GBUD",
      email = "teste@email.com",
      whatsapp = "3111111111",
      city = "Belo Horizonte",
      uf = "MG";

    const ongResponse = await request(app)
      .post("/ongs")
      .send({
        name,
        email,
        whatsapp,
        city,
        uf
      });

    const id = ongResponse.body.id;

    let response = await request(app).get(`/ongs/${id}`);

    expect(response.body.id).toHaveLength(8);
    expect(response.body.name).toEqual(name);
    expect(response.body.email).toEqual(email);
    expect(response.body.whatsapp).toEqual(whatsapp);
    expect(response.body.city).toEqual(city);
    expect(response.body.uf).toEqual(uf);
    expect(response.status).toEqual(200);
  });
});
