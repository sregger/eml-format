var fs = require("fs");
var path = require("path");
var emlformat = require("../lib/eml-format.js");

exports["Read sample.eml"] = function(test) {
  var expected, actual;
  var src = path.join(__dirname, "./fixtures/sample.eml");
  var eml = fs.readFileSync(src, "utf-8");
  
  emlformat.verbose = false;
  emlformat.read(eml, function(error, result) {
    if (error) {
      test.ok(false, error.message);
    }
    else {
      //fs.writeFileSync("read.json", JSON.stringify(result, " ", 2))    
      
      test.ok(typeof result == "object");
      test.ok(typeof result.headers == "object");
      test.ok(typeof result.subject == "string");
      test.ok(typeof result.from == "object");
      test.ok(typeof result.to == "object");
      test.ok(typeof result.text == "string");
      test.ok(typeof result.html == "string");
      
      expected = "Winter promotions";
      actual = result.subject;
      test.ok(actual == expected, 'Expected "' + expected + '" but got "' + actual + '"');
      
      expected = "Foo Bar";
      actual = result.to.name;
      test.ok(actual == expected, 'Expected "' + expected + '" but got "' + actual + '"');
      
      expected = "foo.bar@example.com";
      actual = result.to.email;
      test.ok(actual == expected, 'Expected "' + expected + '" but got "' + actual + '"');
      
      expected = "Online Shop";
      actual = result.from.name;
      test.ok(actual == expected, 'Expected "' + expected + '" but got "' + actual + '"');
      
      expected = "no-reply@example.com";
      actual = result.from.email;
      test.ok(actual == expected, 'Expected "' + expected + '" but got "' + actual + '"');
      
      expected = "Lorem ipsum dolor sit amet";
      actual = result.text;
      test.ok(actual.indexOf(expected) == 0, 'Expected "' + expected + '" but got "' + actual + '"');
      
      actual = result.text;
      test.ok(actual.indexOf("=") == -1, 'Expected quoted-printable string to be decoded!');
      
      expected = "<!DOCTYPE html>";
      actual = result.html;
      test.ok(actual.indexOf(expected) == 0, 'Expected "' + expected + '" but got "' + actual + '"');
    }
    test.done();
  });  
};
