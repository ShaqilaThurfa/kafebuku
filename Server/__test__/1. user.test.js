const { describe, it, test, expect } = require("@jest/globals");
const app = require("../app");
const request = require("supertest");

const access_token_admin =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzMwMzAxMjM2fQ.LuklxRVFSYHD7QLMGLjmwkz1FoqOPyWTbhSCDo5KPyQ";
const access_token_admin1 =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzI5MjUxMDcyfQ.uOPEelIOvwVXiYPAdhvIfAxaTRnxpR_W6-b0yWwV0zIikj";


describe("Registrasi", () => {
  it("success POST /user/register", async () => {
    const response = await request(app).post("/user/register").send({
      fullName: "Shaqila Thurfa",
      email: "shaqilathurfa@mail.com",
      Password: "12345678*",
      role: "Admin",
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: "Register Success" });
  });

  it("failed POST /user/register", async () => {
    const response = await request(app).post("/user/register").send({
      fullName: "Shaqila Thurfa",
      Password: "12345678*",
      role: "Admin",
    });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: "Email must be input" });
  });

  it('success POST /user/login', async () => {
    const response = await request(app)
      .post('/user/login')
      .send({
       
    "email": "shaqilathurfa@mail.com",
    "Password": "12345678*",
  
      })
      .expect(200);
    expect(response.body).toHaveProperty('access_token');
    expect(typeof response.body.access_token).toBe('string');
   
    
  });

  it('failed POST /user/login', async () => {
    const response = await request(app)
      .post('/user/login')
      .send({
        email: '',
        password: 'scabbers123!'
      })
      .expect({
        message: 'Email is required',
      }).expect(400)
    // expect(response.body).toBe('message: Email is required');
    
  });

  it('failed POST /user/login', async () => {
    const response = await request(app)
      .post('/user/login')
      .send({
        email: 'skibidi@gmail.com',
        password: ''
      })
      .expect({
        message: 'password must be input',
      }).expect(400)
    // expect(response.body).toBe('message: password is required');
    
  });

  it('failed POST /user/login', async () => {
    const response = await request(app)
      .post('/user/login')
      .send({
        email: 'skibidi@gmail.com',
        password: ''
      })
      .expect({
        message: 'password is required',
      }).expect(400)
    // expect(response.body).toBe('message: password is required');
    
  });

  it('failed POST /user/login', async () => {
    const response = await request(app)
      .post('/user/login')
      .send({
        email: 'skibidi@gmail.com',
        password: '12345'
      })
      .expect({
        message: 'Invalid email/password',
      }).expect(401)
    // expect(response.body).toBe('message: password is required');
    
  });

  it('failed POST /user/login', async () => {
    const response = await request(app)
      .post('/user/login')
      .send({
        email: 'albus.dumbledore@example.com',
        password: 'wizard123'
      })
      .expect({
        message: 'Invalid email/password',
      }).expect(401)
    // expect(response.body).toBe('message: password is required');
    
  });

  it("success POST /admin/add-admin", async () => {
    const response = await request(app)
      .post("/admin/add-admin")
      .set("Authorization", `Bearer ${access_token_admin}`)
      .send({
        fullName: "Shaqila Thurfa",
        email: "shaqilathurfa@mail.com",
        Password: "12345678*",
        role: "Admin",
      })
      .expect(201);
    expect(response.body).toHaveProperty("fullName");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("role");
    expect(response.body).toHaveProperty("Password");
    expect(response.body).toHaveProperty("status");
  });

  it("failed POST /admin/add-admin create karena tidak login", async () => {
    const response = await request(app).post("/admin/add-admin").send({
      fullName: "Qila",
      email: "qila@gmail.com",
      role: "Admin",
      Password: "1234567*",
      status: "active",
    });
    // console.log("ini respons",response.body)
    expect(response.body).toEqual({ message: "Unauthorized Error" });
    expect(response.status).toEqual(401);
  });

  it("failed POST /admin/add-admin create karena token invalid", async () => {
    const response = await request(app)
      .post("/admin/add-admin")
      .set("Authorization", `Bearer ${access_token_admin1}`)
      .send({
        fullName: "Qila",
        email: "qila@gmail.com",
        role: "Admin",
        Password: "1234567*",
        status: "active",
      });
    expect(response.body).toEqual({ message: "Invalid token" });
    expect(response.status).toBe(401);
  });

  it("failed POST /admin/add-admin karena request body tidak sesuai", async () => {
    const response = await request(app)
      .post("/admin/add-admin")
      .set("Authorization", `Bearer ${access_token_admin}`)
      .send({
        email: "qila@gmail.com",
        role: "Admin",
        Password: "1234567*",
        status: "active",
      });
    expect(response.body).toEqual({ message: "Name must be input" });
    expect(response.status).toBe(400);
  });

});
