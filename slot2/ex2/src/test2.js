// Bài tập 1: Duyệt mảng
let numbers = [1, 2, 3, 4, 5];

// Sử dụng vòng lặp for
for (let i = 0; i < numbers.length; i++) {
  console.log(numbers[i]);
}

// Sử dụng forEach
numbers.forEach((num) => {
  console.log(num);
});

// Sử dụng map
let squares = numbers.map((num) => num);

console.log(squares);

//Bài tập 2:  Lọc ra các số chẵn
let evens = numbers.filter((num) => num % 2 === 0);
console.log(evens);

// Bài tập 3: Quản lý danh sách người
let people = [
  { id: 1, name: "Alice", age: 30 },
  { id: 2, name: "Bob", age: 22 },
  { id: 3, name: "Charlie", age: 15 },
];
// Duyệt qua mảng và in ra danh sách id, name, age
people.forEach((person) => {
  console.log(`ID: ${person.id}, Name: ${person.name}, Age: ${person.age}`);
});
// Lọc ra các person có age > 20
let olderThan20 = people.filter((person) => person.age > 20);
console.log(olderThan20);

//Tổng hợp tuổi của tất cả các person
let totalAge = people.reduce((sum, person) => sum + person.age, 0);
console.log(`Tổng tuổi: ${totalAge}`);
