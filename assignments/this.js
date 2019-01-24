/* The for principles of "this";
* in your own words. explain the four principle for the "this" keyword below.
*
* 1. In the GLOBAL SCOPE, this binds to the global object.
* 2. When invoking a METHOD, this refers to the OBJECT to the left of the dot (IMPLICIT).
* 3. When a constructor function is used, this refers to the NEW instantiated object.
* 4. When .call or .apply method is used, this is EXPLICITLY defined.
*
* write out a code example of each explanation above
*/

// Principle 1
// code example for Window Binding
console.log(this);

// Principle 2
// code example for Implicit Binding
const obj = {
    x:1,
    y:2,
    addSelf: function() {
        console.log(`${this.x} + ${this.y} = ${this.x + this.y}`);
    }
};
obj.addSelf();

// Principle 3
// code example for New Binding
function Construct(obj) {
    this.name = obj.name;
}
const myObj = new Construct({name:'Principle 3'});
console.log(myObj.name);

// Principle 4
// code example for Explicit Binding
function Child(value) {
    Construct.call(this, value);
}
const myChild = new Child({name:'Principle 4'});
console.log(myChild.name);