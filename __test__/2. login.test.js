const {describe, it, test, expect} = require('@jest/globals')
const app = require('../app')
const request = require('supertest')

describe('Berhasil login dan mengirimkan access_token', () => {
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

  it('failed POST /users/login', async () => {
    const response = await request(app)
      .post('/users/login')
      .send({
        email: 'skibidi@gmail.com',
        password: ''
      })
      .expect({
        message: 'password must be input',
      }).expect(400)
    // expect(response.body).toBe('message: password is required');
    
  });

  it('failed POST /users/login', async () => {
    const response = await request(app)
      .post('/users/login')
      .send({
        email: 'skibidi@gmail.com',
        password: ''
      })
      .expect({
        message: 'password is required',
      }).expect(400)
    // expect(response.body).toBe('message: password is required');
    
  });

  it('failed POST /users/login', async () => {
    const response = await request(app)
      .post('/users/login')
      .send({
        email: 'skibidi@gmail.com',
        password: '12345'
      })
      .expect({
        message: 'Invalid email/password',
      }).expect(401)
    // expect(response.body).toBe('message: password is required');
    
  });

  it('failed POST /users/login', async () => {
    const response = await request(app)
      .post('/users/login')
      .send({
        email: 'albus.dumbledore@example.com',
        password: 'wizard123'
      })
      .expect({
        message: 'Invalid email/password',
      }).expect(401)
    // expect(response.body).toBe('message: password is required');
    
  });



});
