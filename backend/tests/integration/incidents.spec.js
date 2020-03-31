const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");

describe("Incidents", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("should be able to create new incident", async () => {
    const response = await request(app)
      .post("/incidents")
      .send({
        title: "New incident",
        description: "Incident description",
        value: 100.99
      })
      .set("authorization", "1663a5b7");

    expect(response.body).toHaveProperty("id");
    expect(response.status).toEqual(200);
  });

  it("should be required to set authorizatoin", async () => {
    const response = await request(app)
      .post("/incidents")
      .send({
        title: "New incident",
        description: "Incident description",
        value: 100.99
      });

    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual('"authorization" is required');
  });

  it("Should be able to list incidents", async () => {
    const ongName = "GBUD",
      ongEmail = "teste@email.com",
      ongWhatsapp = "3111111111",
      ongCity = "Belo Horizonte",
      ongUf = "MG";

    const incidentTitle = "New incident",
      incidentDescription = "Incident description",
      incidentValue = 100.99;

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

    await request(app)
      .post("/incidents")
      .send({
        title: incidentTitle,
        description: incidentDescription,
        value: incidentValue
      })
      .set("authorization", ong_id);

    const response = await request(app).get("/incidents");
    expect(response.body[0].id).toEqual(1);
    expect(response.body[0].title).toEqual(incidentTitle);
    expect(response.body[0].description).toEqual(incidentDescription);
    expect(response.body[0].value).toEqual(incidentValue);
    expect(response.body[0].ong_id).toEqual(ong_id);
    expect(response.body[0].name).toEqual(ongName);
    expect(response.body[0].email).toEqual(ongEmail);
    expect(response.body[0].whatsapp).toEqual(ongWhatsapp);
    expect(response.body[0].city).toEqual(ongCity);
    expect(response.body[0].uf).toEqual(ongUf);
  });
});
