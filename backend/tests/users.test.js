jest.mock("firebase-admin");

const request = require("supertest");
const app = require("../app.js");

// Test /users
describe("users API", () => {
    // Test case: no token provided
    it("should return 401 if no token provided", async () => {
        const res = await request(app).get("/users/profile");
        expect(res.statusCode).toBe(401);
        expect(res.body.error).toBe("No token provided");
    });

    // Test case: invalid token provided
    it("should return 403 if token is invalid", async () => {
        const res = await request(app)
            .get("/users/profile")
            .set("Authorization", "Bearer invalid-token");
        expect(res.statusCode).toBe(403);
        expect(res.body.error).toBe("Invalid token");
    });

    // Test case: valid token provided
    it("should return user data if token is valid", async () => {
        const res = await request(app)
            .get("/users/profile")
            .set("Authorization", "Bearer valid-token");
        expect(res.statusCode).toBe(200);
        expect(res.body.user).toEqual({
            uid: "123",
            email: "testuser@example.com",
        });
    });
});
