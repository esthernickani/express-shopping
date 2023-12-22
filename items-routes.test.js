process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require('./app')
const items = require('./fakeDb')

let cookies = {'name': 'cookie',
                'price': 2.75}

beforeEach(function() {
    items.push(cookies);
})

afterEach(function() {
    items.length = 0;
})

describe("GET /items", function() {
    test("Gets a list of items", async function() {
      const resp = await request(app).get(`/items`);
      expect(resp.statusCode).toBe(200);
  
      expect(resp.body).toEqual([{'name': 'cookie', 'price': 2.75}]);
    });
  });

describe("GET /items/cookies", function() {
test("Gets individual item", async function() {
        const resp = await request(app).get(`/items`);
        expect(resp.statusCode).toBe(200);

        expect(resp.body).toEqual([{'name': 'cookie', 'price': 2.75}]);
    });
});

describe("POST /items", function() {
    test("Creates a new item", async function() {
      const resp = await request(app)
        .post(`/items`)
        .send({
          'name' : 'cheesecake',
          'price': 1
        });
      expect(resp.statusCode).toBe(200);
      expect(resp.body).toEqual({"added": {"name":"cheesecake", "price": 1}}
      );
    });
  });

  describe("PATCH /items/:name", function() {
    test("Updates a single item", async function() {
      const resp = await request(app)
        .patch(`/items/${cookies.name}`)
        .send({
          name: "cookiesupdated"
        });
      expect(resp.statusCode).toBe(200);
      expect(resp.body).toEqual({
        "updated": {'name': 'cookiesupdated', 'price': 2.75}
      });
    });
  
    test("Responds with 400 if name invalid", async function() {
      const resp = await request(app).patch(`/items/wrongname`);
      expect(resp.statusCode).toBe(400);
    });
  });

  describe("DELETE /items/:name", function() {
    test("Deletes a single a item", async function() {
      const resp = await request(app).delete(`/items/${cookies.name}`);
      expect(resp.statusCode).toBe(200);
      expect(resp.body).toEqual({ message: "Deleted" });
    });
  });