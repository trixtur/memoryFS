const {Entity} = require('./filesystem/entity');
const entity = new Entity();
const sda1 = entity.Create('Drive','sda1');

// Add a folder to the path
const folder1 = sda1.Create('Folder','home', '/');

// Add a new file
const file1 = sda1.Create('File','Empty.txt', '/home');

// Delete home folder with file in it.
const folder = sda1.getFolder('/home');
if (folder.Name !== 'home') console.log('Home not found');
else folder.Delete();

if (folder.Name !== '') console.log('Delete Failed');

// Create a file and get its size.
const file = sda1.Create('File','Sometext.txt','/');
file.Content = "Here is some text.";

if (file.Size() != 18) console.log('Size Failed');

// Fail to Create another file and get its size.
try {
const file2 = sda1.Create('File','Sometext.txt','/');
} catch (err) {
  if (typeof file2 !== 'undefined') console.log('Error: The file should not have been created.');
}

// Create another file use WriteToFile and get its size.
const file3 = sda1.Create('File','Sometext2.txt','/');
file3.WriteToFile("Here is some more text");

if (file3.Size() != 22) console.log('Size Failed');

if (sda1.Size() != 22 + 18) console.log('Drive Size Failed');

// Add a Zip File
const zip = sda1.Create('Zip','files.zip','/');

// Move file3 to the zip file
sda1.Move('/Sometext2.txt','/files.zip');

if (sda1.Size() != 18) console.log('Drive Size Failed');
if (zip.Size() != 11) console.log('Drive Size Failed');
console.log('If this is the only message, All tests passed.');
