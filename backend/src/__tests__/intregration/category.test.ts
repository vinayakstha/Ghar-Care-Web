// import request from "supertest";
// import app from "../../app";
// import { CategoryModel } from "../../models/category.model";
// import { UserModel } from "../../models/user.model";

// describe("Category Integration Tests", () => {
//   const testCategory = {
//     categoryName: "Plumbing",
//     categoryImage: "plumbing.png",
//   };

//   let categoryId: string;
//   let token: string;

//   beforeAll(async () => {
//     // Clean up any test categories
//     await CategoryModel.deleteMany({ categoryName: testCategory.categoryName });

//     // Ensure test admin exists
//     const email = "admin@example.com";
//     const password = "password123";

//     try {
//       await request(app).post("/api/auth/register").send({
//         email,
//         password,
//         username: "adminTest",
//         role: "admin",
//       });
//     } catch (err) {
//       // ignore if already exists
//     }

//     // Login as admin to get JWT token
//     const res = await request(app)
//       .post("/api/auth/login")
//       .send({ email, password });

//     // Adjust based on your login response
//     token = res.body.token || res.body.data?.token;
//     if (!token) throw new Error("Failed to get admin token");
//   });

//   afterAll(async () => {
//     // Clean up test categories
//     await CategoryModel.deleteMany({ categoryName: testCategory.categoryName });
//   });

//   // Helper to attach auth token
//   const authRequest = () =>
//     request(app).set("Authorization", `Bearer ${token}`);

//   // ================= CREATE =================
//   describe("POST /api/admin/category", () => {
//     test("should create a new category", async () => {
//       const response = await authRequest()
//         .post("/api/admin/category")
//         .send(testCategory);

//       expect(response.status).toBe(201);
//       expect(response.body).toHaveProperty("success", true);
//       expect(response.body.data).toHaveProperty("_id");
//       expect(response.body.data.categoryName).toBe(testCategory.categoryName);

//       categoryId = response.body.data._id;
//     });

//     test("should not create category with duplicate name", async () => {
//       const response = await authRequest()
//         .post("/api/admin/category")
//         .send(testCategory);

//       expect(response.status).toBe(403);
//       expect(response.body).toHaveProperty("success", false);
//     });
//   });

//   // ================= GET ALL =================
//   describe("GET /api/admin/category", () => {
//     test("should get all categories", async () => {
//       const response = await authRequest().get("/api/admin/category");

//       expect(response.status).toBe(200);
//       expect(response.body).toHaveProperty("success", true);
//       expect(Array.isArray(response.body.data)).toBe(true);
//       expect(response.body.data.length).toBeGreaterThan(0);
//     });
//   });

//   // ================= GET BY ID =================
//   describe("GET /api/admin/category/:id", () => {
//     test("should get category by id", async () => {
//       const response = await authRequest().get(
//         `/api/admin/category/${categoryId}`,
//       );

//       expect(response.status).toBe(200);
//       expect(response.body).toHaveProperty("success", true);
//       expect(response.body.data.categoryName).toBe(testCategory.categoryName);
//     });

//     test("should return 404 for invalid id", async () => {
//       const response = await authRequest().get(
//         "/api/admin/category/invalid-id",
//       );

//       expect(response.status).toBe(404);
//       expect(response.body).toHaveProperty("success", false);
//     });
//   });

//   // ================= UPDATE =================
//   describe("PUT /api/admin/category/:id", () => {
//     test("should update category", async () => {
//       const response = await authRequest()
//         .put(`/api/admin/category/${categoryId}`)
//         .send({ categoryName: "Electrical", categoryImage: "electrical.png" });

//       expect(response.status).toBe(200);
//       expect(response.body).toHaveProperty("success", true);
//       expect(response.body.data.categoryName).toBe("Electrical");
//     });
//   });

//   // ================= DELETE =================
//   describe("DELETE /api/admin/category/:id", () => {
//     test("should delete category", async () => {
//       const response = await authRequest().delete(
//         `/api/admin/category/${categoryId}`,
//       );

//       expect(response.status).toBe(200);
//       expect(response.body).toHaveProperty("success", true);
//     });

//     test("should return 404 for already deleted category", async () => {
//       const response = await authRequest().delete(
//         `/api/admin/category/${categoryId}`,
//       );

//       expect(response.status).toBe(404);
//       expect(response.body).toHaveProperty("success", false);
//     });
//   });
// });
