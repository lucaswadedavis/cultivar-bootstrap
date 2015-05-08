try {
  var expect = require('chai').expect;
  var app = require('../index.js');
} catch (err) {
  console.log("no require");
}

describe("app", function() {

  it('exists', function() {
    expect(app).to.be.an('object');
  });

});
