const request = require('supertest');
const app = require('../src/server');

describe('Server basic endpoints', () => {
  test('GET /health returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
  });

  test('GET /mcp/current without params returns 400', async () => {
    const res = await request(app).get('/mcp/current');
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'missing_parameters');
  });
});
