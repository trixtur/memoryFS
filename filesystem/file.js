const { Entity } = require("./entity");

class File extends Entity {
  constructor(name) {
    super(require("./types.json").File);
    this.Name = name;
    this.Parent = null;
    this.Content = "";
  }
}

File.prototype.Delete = function() {
  this.Parent.Children.splice(this, 1);
  this.Parent = null;
  this.Type = null;
  this.Name = '';
  delete this;
};

File.prototype.Size = function() {
  return this.Content.length;
}

File.prototype.WriteToFile = function(text) {
  this.Content = text;
}

module.exports.File = File;
