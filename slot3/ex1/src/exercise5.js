// 5.	Map + filter – danh sách teen
const people = [
  { name: "John", age: 20 },
  { name: "Ann", age: 19 },
  { name: "Mike", age: 15 },
  { name: "Sara", age: 13 },
  { name: "Tom", age: 22 },
];
const teens = people
  .filter((person) => person.age >= 13 && person.age <= 19)
  .map((person) => `${person.name} (${person.age})`);
console.log(teens);
teens.forEach((teen) => console.log(teen));
