const {describe, it, test, expect} = require('@jest/globals')
const app = require('../app')
const request = require('supertest')

describe('Registrasi', () => {
  it('success POST /user/register', async () => {
    const response = await request(app)
      .post('/user/register')
      .send({
        fullName: 'Skibidi Toilet',
        email: 'skibidi@gmail.com',
        Password: 'scabbers123!',
      })
      
      expect(response.status).toBe(201); 
      expect(response.body).toEqual({ message: 'Register Success' });
   
    
  });

  it('failed POST /user/register', async () => {
    const response = await request(app)
      .post('/user/register')
      .send({
        fullName: 'Skibidi Toilet',
        Password: 'scabbers123!',
      })

    expect(response.status).toBe(400); 
    expect(response.body).toEqual({ message: 'Email must be input' }); 
    
  });

});
