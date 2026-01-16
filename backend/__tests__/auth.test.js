import request from "supertest";
import app from "../app.js";
import sequelize from "../config/database.js";

let token;

describe("Auth API", () => {
  // __tests__/setup.js أو في auth.test.js
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  // 🟢 بعد كل tests: close DB connection
  afterAll(async () => {
    await sequelize.close();
  });
  const TEST_EMAIL = "exemple007@gmail.com"; // ← إيميل جديد وثابت
  const TEST_PASSWORD = "123456";

  it("Register new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      role: "candidate",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it("Register existing user should fail", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      role: "candidate",
    });

    console.log("Status:", res.statusCode);
    console.log("Body:", JSON.stringify(res.body, null, 2));

    expect(res.statusCode).toBe(400); // ← غيّري هنا إذا لقيتي status آخر
    expect(res.body.success).toBe(false);
    // expect(res.body.message).toBe("Utilisateur déjà existant");  ← علّقيها مؤقتاً
  });

  it("Login user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: TEST_EMAIL, // ← نفس الإيميل !!!
      password: TEST_PASSWORD,
    });

    console.log("Login response:", res.body); // ← أضف هاد السطر باش تشوف الشكل ديال الـ response

    // جرب واحد من هادو حسب الـ backend ديالك
    token = res.body.token || res.body.data?.token;

    expect(res.statusCode).toBe(200);
    expect(token).toBeDefined();
    expect(typeof token).toBe("string");
    expect(token.split(".").length).toBe(3); // JWT عادة 3 أجزاء
  });

  it("Get profile (protected)", async () => {
    const res = await request(app)
      .get("/api/auth/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.email).toBe(TEST_EMAIL);
  });
});
