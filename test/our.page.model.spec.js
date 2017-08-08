// var chai = require('chai')
// var expect = require('chai').expect;
// var spies = require('chai-spies');
// var model = require('../models');
// var Page = model.Page;

// chai.use(spies)

// beforeEach(function(done) {
//     Page.sync({force: true})
//     .then(() => {
//     return Page.create({
//             title: 'page 1',
//             content: 'content 1',
//             status: 'open',
//             tags: 'bla, bla1',
//         })
//     }
//     ).then(() => {done()})
//     .catch(done)
//     // .then(function() {
//     //   return Page.save([tobi, loki, jane]);
//     // });
// });

// // describe('page model', function () {
// //     it('should make a page', () => {
// //         return Page.create({
// //             title: 'page 1',
// //             content: 'content 1',
// //             status: 'open',
// //             tags: 'bla, bla1',
// //         })
// //     })
// // })

// describe('page model - retrieving', function () {
//     // we should retrieve a page
//     it('should retrieve a page', () => {
//         return Page.findOne({
//             where: {
//                 title: 'page 1',
//             }
//         }).then(result => {
//             expect(result.content).to.equal('content 1')
//         })
//     })
// })
//     // then the retrieved page should have urlTitle
//     it('should have urlTitle', () => {
//         return Page.findOne({
//             where: {
//                 title: 'page 1',
//             }
//         }).then(result => {
//             expect(result.urlTitle).to.equal('page_1')
//         })
//     })
//     // tags should be an array
//     it('should have tags which are arrays', () => {
//         return Page.findOne({
//             where: {
//                 title: 'page 1',
//             }
//         }).then(result => {
//             expect(result.tags).to.be.an('array')
//         })
//     })
//     // route should be a route
//     it('should have a route', () => {
//         return Page.findOne({
//             where: {
//                 title: 'page 1',
//             }
//         }).then(result => {
//             expect(result.route).to.equal('/wiki/page_1')
//         })
//     })


