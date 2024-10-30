const {describe, it, test, expect} = require('@jest/globals')
const app = require('../app')
const request = require('supertest')

const access_token_admin = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzI5MzEwNzU5fQ.qVeNlwBhYgrz46c3uonkzSROPrBJhKDWQDtkErX_dfo"
const access_token_admin1 = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzI5MjUxMDcyfQ.uOPEelIOvwVXiYPAdhvIfAxaTRnxpR_W6-b0yWwV0zIikj"

describe('Berhasil Create new Product', () => {
  it('success POST /products/create', async () => {
    const response = await request(app)
      .post('/products/create')
      .set("Authorization", `Bearer ${access_token_admin}`)
      .send({
        "name": "Adidas Ultraboost",
        "description": "High-performance running shoes with responsive cushioning.",
        "price": 150.00,
        "stock": 75,
        "imgUrl": "https://example.com/adidas-ultraboost.jpg",
        "categoryId": 2,
        "createdAt": new Date(),
        "updatedAt": new Date()
      })
      .expect(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('name');
      expect(response.body).toHaveProperty('description');
      expect(response.body).toHaveProperty('price');
      expect(response.body).toHaveProperty('stock');
      expect(response.body).toHaveProperty('imgUrl');
      expect(response.body).toHaveProperty('categoryId');
      expect(response.body).toHaveProperty('createdAt');
      expect(response.body).toHaveProperty('updatedAt');
    
  });

  it('failed POST /products/create karena tidak login', async () => {
    const response = await request(app)
    .post('/products/create')
    .send({
      "name": "Adidas Ultraboost",
      "description": "High-performance running shoes with responsive cushioning.",
      "price": 150.00,
      "stock": 75,
      "imgUrl": "https://example.com/adidas-ultraboost.jpg",
      "categoryId": 2,
      "userId": 2
    })
    // console.log("ini respons",response.body)
    expect(response.body).toEqual(
      { message: 'Unauthorized Error'}
    )
    expect(response.status).toEqual(401);
    
  });

  it('failed POST /products/create karena token invalid', async () => {
    const response = await request(app)
    .post('/products/create')
    .set("Authorization", `Bearer ${access_token_admin1}`)
    .send({
      "name": "Adidas Ultraboost",
      "description": "High-performance running shoes with responsive cushioning.",
      "price": 150.00,
      "stock": 75,
      "imgUrl": "https://example.com/adidas-ultraboost.jpg",
      "categoryId": 2,
      "userId": 2
    })
    expect(response.body).toEqual(
      { message: 'Invalid token'}
    )
    expect(response.status).toBe(401);
    
  });

  it('failed POST /products/create karena request body tidak sesuai', async () => {
    const response = await request(app)
    .post('/products/create')
    .set("Authorization", `Bearer ${access_token_admin}`)
    .send({
      "name": "",
      "description": "High-performance running shoes with responsive cushioning.",
      "price": 150.00,
      "stock": 75,
      "imgUrl": "https://example.com/adidas-ultraboost.jpg",
      "categoryId": 2,
      "userId": 2
    })
    expect(response.body).toEqual(
      { message: 'Name must be input'}
    )
    expect(response.status).toBe(400);
    
  });


});
