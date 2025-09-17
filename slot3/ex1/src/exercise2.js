// 2.	Rest parameter – tính tổng và trung bình
const sum = (...nums) => {
  let total = 0;
  for (const num of nums) {
    if (typeof num === "number" && !isNaN(num)) {
      total += num;
    }
  }
  return total;
};
console.log(sum(1, 2, 3));
console.log(sum(1, "x", 4));

const avg = (...nums) => {
  if (nums.length === 0) return 0;
  let total = sum(...nums);
  return parseFloat((total / nums.length).toFixed(2));
};
console.log(avg(1, 2, 3, 4));
console.log(avg());
