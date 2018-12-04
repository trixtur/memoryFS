const { Entity } = require("./entity");

class Zip extends Entity {
  constructor(name) {
    super(require("./types.json").Zip);
    this.Name = name;
    this.Parent = null;
    this.Children = [];
  }
}

Zip.prototype.Delete = function() {
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
Zip.prototype.Size = function() {
  let size = 0;
  this.Children.map(child => size += child.Size());

  return size/2;
}

module.exports.Zip = Zip;
