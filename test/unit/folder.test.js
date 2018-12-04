/* global expect */
require('../bootstrap');
const {Entity} = require('../../filesystem/entity');
describe('Folder tests', function() {
  let entity, sda1;
  beforeEach(function() {
    entity = new Entity();
    sda1 = entity.Create('Drive','sda1');
  });
  it('should add a folder to the drive.', function() {
    const folder = sda1.Create('Folder','home','/');

    expect(folder.Name).to.equal('home');
  });
  it('should add a file to the folder in the drive.', function() {
    const folder = sda1.Create('Folder','home','/');
    const file = sda1.Create('File','Empty.txt', '/home');

    expect(file.Name).to.equal('Empty.txt');
    expect(sda1.Children[0].Children[0]).to.equal(file);
  });
  it('should delete folder from the drive.', function() {
    const folder = sda1.Create('Folder','home','/');
    const file = sda1.Create('File','Empty.txt', '/home');

    folder.Delete();
    expect(sda1.Children.length).to.equal(0);
    expect(folder.Name).to.equal('');
  });
});
