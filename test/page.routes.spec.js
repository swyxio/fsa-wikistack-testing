var supertest = require('supertest');
var app = require('../app');
var agent = supertest.agent(app);

describe('http requests', function () {

    describe('GET /wiki', function () {
        it('gets 200 on index', function (done) {
            agent
            .get('/wiki')
            .expect(200, done);
        });
    });

  describe('GET /wiki/add', function () {
    it('responds with 200', function (done) {
            agent
            .get('/wiki/add')
            .expect(200, done);
        });
  });

  describe('GET /wiki/:urlTitle', function () {
    it('responds with 404 on page that does not exist', function (done) {
            agent
            .get('/wiki/foooooo')
            .expect(404, done)
        });
    it('responds with 200 on page that does exist', function (done) {
            agent
            .get('/wiki/foo1')
            .expect(200, done);
        });
  });

  describe('GET /wiki/search/:tag', function () {
    it('responds with 200', function (done) {
            agent
            .get('/wiki/search/foo')
            .expect(200, done);
        });
  });

  describe('GET /wiki/:urlTitle/similar', function () {
    it('responds with 404 for page that does not exist', function (done) {
            agent
            .get('/wiki/foosdkjoskjdoskjd/similar')
            .expect(404, done);
        });
    it('responds with 200 for similar page', function (done) {
            agent
            .get('/wiki/foo1/similar')
            .expect(200, done);
        });
  });

  describe('POST /wiki', function () {
    it('responds with 302', async function () {
             await agent
            .post('/wiki')
            .send({
                authorName: 'authoname',
                authorEmail: 'auth@auth.com',
                title: 'foo5',
                content: '# content 5',
                status: 'open',
                tags: 'foo, bar',
            })
            .expect(302, err => {
                console.log('***', err)
                // done()
            })
        });
    it('creates a page in the database', function (done) {
            agent
            .get('/wiki/foo5')
            .expect(200, done);
        });
  });

});