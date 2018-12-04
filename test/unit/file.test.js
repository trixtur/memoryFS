/* global expect */
require('../bootstrap');
const {Entity} = require('../../filesystem/entity');
describe('File tests', function() {
  let entity, sda1, folder, file;
  beforeEach(function() {
    entity = new Entity();
    sda1 = entity.Create('Drive','sda1');
    folder = sda1.Create('Folder','home','/');
    file = sda1.Create('File','Empty.txt', '/home');
    file.WriteToFile('Here is some text.');
  });
  it('should add text to a file.', function() {
    file.WriteToFile('Here is some text.');

    expect(file.Content).to.equal('Here is some text.');
    expect(file.Size()).to.equal(18);
  });
  it('should fail to create another file with the same name.', function() {
    let error = false;
    try {
      const file2 = sda1.Create('File','Empty.txt','/home');
    } catch (err) {
      error = true;
    }

    expect(error).to.be.true;
  });
  it('should add another file to the folder and get both sizes.', function() {
    const file3 = sda1.Create('File','Another.txt','/home');
    file3.WriteToFile('Here is some more text');

    expect(folder.Size()).to.equal(22 + 18);
  })
});
