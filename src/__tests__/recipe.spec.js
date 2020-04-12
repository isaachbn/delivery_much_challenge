const request = require("supertest");
require('dotenv').config();
const app = require("../app");

describe("Recipes", () => {
    it("must be able to search for a recipey", async () => {
        let response = await request(app).get("/recipes/")
            .query({i: 'onions,apple'})
            .expect(200)
            .expect(function(res){
                if(!('keywords' in res.body))   throw new Error("Missing response key")
                if(!('recipes' in res.body))       throw new Error("Missing time key")
            });

        expect(response.body).toMatchObject({
            keywords: ['onions', 'apple']
        });
    });

    it("must not pass more than three ingredients", async () => {
        await request(app).get("/recipes/")
            .query({i: 'onions,apple,stuffing,blue cheese'})
            .expect(400);
    });
});
