/* global expect */
require('../bootstrap');
const {Entity} = require('../../filesystem/entity');
describe('Drive tests', function() {
  it('should create a drive.', function() {
    const entity = new Entity();
    const sda1 = entity.Create('Drive','sda1');

    expect(sda1.Name).to.equal('sda1');
  });
});
