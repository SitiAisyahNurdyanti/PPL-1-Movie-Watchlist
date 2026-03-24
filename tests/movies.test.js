const request = require("supertest");
const app = require("../index");

let createdMovieId;

describe("Movies API CRUD", () => {

  // CREATE
  it("POST /movies - should create a movie", async () => {
    const res = await request(app)
      .post("/movies")
      .send({
        title: "Inception",
        year: 2010
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body.data).toHaveProperty("id");

    createdMovieId = res.body.data.id;
  });

  // READ ALL
  it("GET /movies - should return all movies", async () => {
    const res = await request(app).get("/movies");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  // READ ONE
  it("GET /movies/:id - should return one movie", async () => {
    const res = await request(app).get(`/movies/${createdMovieId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty("id", createdMovieId);
  });

  // UPDATE
  it("PUT /movies/:id - should update movie", async () => {
    const res = await request(app)
      .put(`/movies/${createdMovieId}`)
      .send({
        title: "Inception Updated"
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.title).toBe("Inception Updated");
  });

  // DELETE
  it("DELETE /movies/:id - should delete movie", async () => {
    const res = await request(app).delete(`/movies/${createdMovieId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
  });

});