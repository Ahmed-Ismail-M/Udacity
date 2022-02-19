import { response } from "express";

const request = require('supertest')
const app = require('../../index')
describe('Test Server', () => {
  describe('test /api', () => {
    it('shout return main response', (done) => {
      request(app)
        .get('/api')
        .expect(200)
        .expect('Hi from main')
        .expect('Content-Type', 'text/html; charset=utf-8')
        .end((error:Error) => (error) ? done.fail(error) : done());
    });
  });
  describe('test /api/resize', () => {
    it('shoud return resize response', (done) => {
      request(app)
        .get('/api/resize')
        .expect(200)
        .expect('Post image info with parameters filename,height,width')
        .expect('Content-Type', 'text/html; charset=utf-8')
        .end((error:Error) => (error) ? done.fail(error) : done());
    });
    it('shoud accept paramters and return image', (done) => {
      request(app)
        .get('/api/resize?filename=assets.jpg&height=200&width=200')
        .expect(200)
        .expect('Content-Type', 'image/jpeg')
        .end((error:Error) => (error) ? done.fail(error) : done());
    });
  });
  describe('test /api/resize with wrong parameters', () => {
    it('shoud refuse paramters because one is missing', (done) => {
      request(app)
        .get('/api/resize?filename=assets.jpg&height=200')
        .expect(200)
        .expect('Post image info with parameters filename,height,width')
        .expect('Content-Type', 'text/html; charset=utf-8')
        .end((error:Error) => (error) ? done.fail(error) : done());
    });
  });
});
