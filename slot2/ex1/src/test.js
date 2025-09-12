const result = (a, b) => a + b;
console.log(result(1, 2));

let square = (num) => num * num;
console.log(square(5));
console.log(square(8));

let sayHello = () => console.log("Hello!");
sayHello();

let person = {
  name: "Alice",
  age: 30,
  greet: function () {
    console.log(
      `Hello, my name is ${this.name} and I'm ${this.age} years old.`
    );
  },
};
person.greet();

let greet = (name, timeOfDay) => console.log(`Good ${timeOfDay}, ${name}!`);
greet("Alice", "morning");
greet("Charlie", "evening");
