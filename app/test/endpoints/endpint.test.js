const request = require('supertest');
const config  = require('../../config')['test'];
const app     = require('../../index')(config);

describe('Server status verification', () => {
  it('should respond with status 200 when making a GET request to /', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });
});
