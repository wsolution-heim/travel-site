// { generieren ein Objekt innerhalb der Klammern }
// BluePrint Function (Class) beginnen mit einem großen Anfangsbuchstaben!

// Construktor Function.

class Person {
	constructor(fullName, favColor) {
		this.name = fullName;
  		this.favoriteColor = favColor;
    }                         
		
 greet() {
    console.log("Hi there, my name is " + this.name + " and my favorite color is " + this.favoriteColor + ".");
  }
}

// module.exports = Person;
export default Person;