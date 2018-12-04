/* global expect */
require('../bootstrap');
const {Entity} = require('../../filesystem/entity');
describe('File tests', function() {
  let entity, sda1, folder, file, zip;
  beforeEach(function() {
    entity = new Entity();
    sda1 = entity.Create('Drive','sda1');
    folder = sda1.Create('Folder','home','/');
    file = sda1.Create('File','Empty.txt', '/home');
    file.WriteToFile('Here is some text.');
    zip = sda1.Create('Zip','files.zip','/');
  });
  it('should move files and get size from zip', function () {
    expect(folder.Children[0]).to.equal(file);
    sda1.Move('/home/Empty.txt', '/files.zip');

    expect(folder.Children.length).to.equal(0);
    expect(zip.Children[0]).to.equal(file);
    expect(zip.Size()).to.equal(9); // 9 is half of 18
  });
});
