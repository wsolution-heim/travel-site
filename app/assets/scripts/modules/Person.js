// { generiren ein Objekt innerhalb der Klammern }
// BluePrint Function (Class) beginnen mit einem großen Anfangsbuchstaben!

// Construktor Function.

function Person(fullName, favColor) {
  this.name = fullName;
  this.favoriteColor = favColor;
  this.greet = function() {
    console.log("Hello, my name is " + this.name + " and my favorite color is " + this.favoriteColor + ".");
  }
}

module.exports = Person;