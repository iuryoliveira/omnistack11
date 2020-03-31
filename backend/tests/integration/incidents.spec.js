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
});
