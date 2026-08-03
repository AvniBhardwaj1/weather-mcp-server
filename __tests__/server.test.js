const request = require('supertest');
const app = require('../src/server');

describe('basic endpoints', () => {
  test('/health responds ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('/mcp/current 400 without params', async () => {
    const res = await request(app).get('/mcp/current');
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('missing_parameters');
  });
});