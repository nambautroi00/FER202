// 1.	Arrow function cơ bản – double & isEven

const double = (n) => n * 2;
console.log(double(7));

//cách viết khác
const double2 = (n) => {
  return n * 2;
};
console.log(double2(7));

const isEven = (n) => n % 2 === 0;
console.log(isEven(10));
console.log(isEven(7));

//cách viết khác
const isEven2 = (n) => {
  return n % 2 === 0;
};
console.log(isEven2(10));
console.log(isEven2(7));
