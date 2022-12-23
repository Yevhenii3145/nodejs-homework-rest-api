const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const signup = require("./signup");

const { DB_HOST, PORT = 3000 } = process.env;

const app = express();
app.post("/api/auth/signup", signup);

describe("test signup controller", () => {
  beforeAll(() => {
    mongoose
      .connect(DB_HOST)
      .then(() => app.listen(PORT))
      .catch((error) => {
        console.log(error.message);
      });
  });

  test("signup must return status 201 and somthing else...  ) ", async () => {
    const response = await request(app).post("/api/auth/signup");
    expect(response.statusCode).toBe(201);
  });
});
