import request from 'supertest';

import { createApp } from '../src/app';

describe('GET /api/health', () => {
  it('returns the API health status', async () => {
    const response = await request(createApp()).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      service: 'hostelfit-api',
      status: 'ok',
    });
    expect(new Date(response.body.timestamp).toString()).not.toBe('Invalid Date');
  });
});
