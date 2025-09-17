// 3.	Destructuring object lồng nhau – lấy địa chỉ
const person = {
  name: "Costas",
  address: {
    street: "Lalaland 12",
  },
};
const {
  address: { street, city = "Unknown City" },
} = person;
console.log(street, city);
