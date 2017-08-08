var chai = require('chai')
var expect = require('chai').expect;
var spies = require('chai-spies');
var model = require('../models');
var Page = model.Page;

chai.use(spies)

var page;
beforeEach(function (done) {
    Page.sync({force: true}).then(() => {
      page = Page.build({
            title: 'page 1',
            content: 'content 1',
            status: 'open',
            tags: ['foo, bar'],
        });
    return page.save()})
        .then(() => {               // add 4 more random pages. 3 similar, 1 diff
            return Page.create({
                title: 'foo1',
                content: 'bar1',
                tags: ['foo', 'bar']
            })
        }).then(() => {
            return Page.create({
                title: 'foo2',
                content: 'bar2',
                tags: ['foo', 'bar']
            })
        }).then(() => {
            return Page.create({
                title: 'foo3',
                content: 'bar3',
                tags: ['foo', 'bar']
            })
        }).then(() => {
            return Page.create({
                title: 'foo4',
                content: 'bar4',
                tags: ['potato', 'tomato']
            })
        })
        .then(function () {
            done();
        })
        .catch(done);    
});

// before(function (done) {
//         Page.sync({force: true}) // clear the db
//         .then(() => page.save()) // add global page

//         });

describe('Page model', function () {

  describe('Virtuals', function () {
    describe('route', function () {
      it('returns the url_name prepended by "/wiki/"', () => {
          page.urlTitle = 'page_1';
          expect(page.route).to.equal('/wiki/page_1')
      });
    });
    describe('renderedContent', function () {
      it('converts the markdown-formatted content into HTML');
    });
  });

  describe('Class methods', function () {

      before(function (done) {
        Page.sync({force: true}).then(() => {
            return Page.create({
                title: 'foo',
                content: 'bar',
                tags: ['foo', 'bar']
            })
        })
        .then(function () {
            done();
        })
        .catch(done);
        });

    describe('findByTag', function () {
      it('gets pages with the search tag', (done) => {
          Page.findByTag('bar').then(result => {
              expect(result).to.be.an('array')
              expect(result).to.have.lengthOf(3);
              done()
          })
          .catch(done)
      });
      it('does not get pages without the search tag', (done)=> {
          Page.findByTag('sdsldkj').then(results => {
              expect(results).to.have.lengthOf(0)
              done()
          })
          .catch(done)
      });
    });
  });

  describe('Instance methods', function () {
    describe('findSimilar', function () {
      it('never gets itself', async function () {
        var foo1page = await Page.findOne({where: {title: 'foo1'}})
        // var similarResults = await Page.findOne({where: {title: 'foo3'}}).findSimilar() // intentionally fail
        var similarResults = await foo1page.findSimilar()
        similarResults.forEach(result => {
            expect(result.id).not.to.equal(foo1page.id)
        })

        // Page.findOne({where: {title: 'foo1'}}).then((foo1page) => {
        //   foo1page.findSimilar().then((similarResults) => 
        //     {
        //       similarResults.forEach(result => {
        //           expect(result.id).not.to.equal(foo1page.id)
        //       })
        //       done()
        //     })
        //     .catch(done)
        // })
      });
      it('gets other pages with any common tags', function(){

      });
      it('does not get other pages without any common tags');
    });
  });

  describe('Validations', function () {
    it('errors without title');
    it('errors without content');
    it('errors given an invalid status');
  });

  describe('Hooks', function () {
    it('it sets urlTitle based on title before validating');
  });

});