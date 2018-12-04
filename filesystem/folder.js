const { Entity } = require("./entity");

class Folder extends Entity {
  constructor(name) {
    super(require("./types.json").Folder);
    this.Name = name;
    this.Children = [];
    this.Parent = null;
  }
}

Folder.prototype.Delete = function() {
  this.Children.map(child => {
    child.Delete();
  });

  this.Children = [];
  this.Parent.Children.splice(this, 1);
  this.Parent = null;
  this.Name = '';
  this.Type = null;

  delete this;
};
Folder.prototype.Size = function() {
  let size = 0;
  this.Children.map(child => size += child.Size());

  return size;
}

module.exports = { Folder };
