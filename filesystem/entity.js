class Entity {
  constructor(type) {
    this.Type = type;
    this.Name = "";

    this.Children = null;
    this.Parent = null;
  }
}
Entity.prototype.Create = function(Type, Name, Path) {
  switch (Type) {
    case "Drive":
      if (Path) {
        console.log("Error: Drives cannot have parents.");
        return;
      }
      const { Drive } = require("./drive");
      const drive = new Drive(Name);
      return drive;
    case "Folder":
      if (!this.getFolder) {
        console.log("That item cannot contain Folders.");
        return;
      }
      let hasChild = this.getFolder(Path).Children.find(child => child.Name === Name);
      if (hasChild) {
        console.log(
          "Error: a file or directory with that name already exists."
        );
        return;
      } else {
        const { Folder } = require("./folder");
        const newFolder = new Folder(Name);
        newFolder.Parent = this.getFolder(Path);
        this.addFolder(newFolder, Path);
        return newFolder;
      }
    case "File":
      const { File } = require("./file");
      let hasFile = this.getFolder(Path).Children.find(child => child.Name === Name);
      if (hasFile) {
        throw new Error(
          "Error: a file directory with that name already exists."
        );
        return;
      } else {
	const newFile = new File(Name);
        newFile.Parent = this.getFolder(Path);
        this.addFolder(newFile, Path);
	return newFile;
      }
    case "Zip":
      const { Zip } = require("./zip");
      let hasZip = this.getFolder(Path).Children.find(child => child.Name === Name);
      if (hasZip) {
        throw new Error(
          "Error: a file directory with that name already exists."
        );
        return;
      } else {
	const newFile = new Zip(Name);
        newFile.Parent = this.getFolder(Path);
        newFile.Children = [];
        this.addFolder(newFile, Path);
	return newFile;
      }
  }
};
Entity.prototype.Delete = function(Path) {};
Entity.prototype.Move = function(oldPath, newPath) {
  const fileName = oldPath.substr(oldPath.lastIndexOf('/')+1, oldPath.length);
  const oldFolder = this.getFolder(oldPath.substr(0, oldPath.lastIndexOf('/')));
  const newFolder = this.getFolder(newPath);

  const file = oldFolder.Children.find(child => fileName == child.Name);
  oldFolder.Children.splice(oldFolder.Children.indexOf(file, 1));
  newFolder.Children.push(file);
};
Entity.WriteToFile = function(Path, Content) {};

module.exports = { Entity };
