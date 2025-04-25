const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");
const app = require("../server"); // your Express app

describe("Sum Calculator API", () => {
  it("should respond with 200 OK on /", (done) => {
    request(app)
      .get("/")
      .expect(200, done);
  });

  it("should return correct sum for valid numbers", (done) => {
    request(app)
      .get("/add?a=10&b=5")
      .expect(200)
      .expect(res => {
        expect(res.text).to.include("15");
      })
      .end(done);
  });

  it("should return 400 for missing parameter", (done) => {
    request(app)
      .get("/add?a=10")
      .expect(400)
      .expect(res => {
        expect(res.text).to.include("Invalid input");
      })
      .end(done);
  });

  it("should return 400 for non-numeric input", (done) => {
    request(app)
      .get("/add?a=hello&b=world")
      .expect(400)
      .expect(res => {
        expect(res.text).to.include("Invalid input");
      })
      .end(done);
  });

  it("should correctly add negative numbers", (done) => {
    request(app)
      .get("/add?a=-4&b=-6")
      .expect(200)
      .expect(res => {
        expect(res.text).to.include("-10");
      })
      .end(done);
  });
});
