const { Entity } = require("./entity");
const Folder = require("./folder");
const File = require("./file");
const Zip = require("./zip");

function getFolderFromPath(entity, path_parts) {
  if (path_parts.length === 0) return entity;
  const next_entity = entity.Children.find(child => child.Name === path_parts[0]);

  if (!next_entity) {
    console.log("Could not find folder: " + path_parts[0]);
    process.exit(1);
  }

  return getFolderFromPath(
    next_entity,
    path_parts.slice(1, path_parts.length - 1)
  );
}

class Drive extends Entity {
  constructor(name) {
    super(require("./types.json").Drive);
    this.Name = name;
    this.Children = [];
  }
}

Drive.prototype.Delete = function() {
  this.Children.map(child => {
    child.Delete();
  });

  delete this;
};

Drive.prototype.Size = function() {
  let size = 0;
  this.Children.map(child => size += child.Size());

  return size;
}

Drive.prototype.getFolder = function(Path) {
  const path_parts = Path.split("/").filter(name => name !== "");

  if (path_parts.length === 0) return this;

  const folder = getFolderFromPath(this, path_parts);
  return folder;
};

Drive.prototype.addFolder = function(Folder, Path) {
  const entity = this.getFolder(Path);
  entity.Children.push(Folder);
};

module.exports.Drive = Drive;
