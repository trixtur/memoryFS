const chai = require('chai');
global.Promise = require('bluebird');
var chaiAsPromised = require('chai-as-promised');
global.expect = chai.expect;
chai.use(chaiAsPromised);

