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

  it("should be able to update ONG", async () => {
    const data = [
      {
        name: "GBUD",
        email: "teste@email.com",
        whatsapp: "3111111111",
        city: "Belo Horizonte",
        uf: "MG"
      },
      {
        name: "Updated Name",
        email: "updated@email.com",
        whatsapp: "31999995555",
        city: "New City",
        uf: "SP"
      }
    ];

    const ongResponse = await request(app)
      .post("/ongs")
      .send(data[0]);

    const ong_id = ongResponse.body.id;

    await request(app)
      .put("/ongs")
      .set("Authorization", ong_id)
      .send(data[1]);

    const response = await request(app).get(`/ongs/${ong_id}`);
    expect(response.body.id).toEqual(ong_id);
    expect(response.body.name).toEqual(data[1].name);
    expect(response.body.email).toEqual(data[1].email);
    expect(response.body.whatsapp).toEqual(data[1].whatsapp);
    expect(response.body.city).toEqual(data[1].city);
    expect(response.body.uf).toEqual(data[1].uf);
  });
});
