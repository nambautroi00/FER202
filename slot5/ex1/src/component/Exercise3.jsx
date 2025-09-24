import React from "react";

export default function Exercise3() {
  const person = {
    name: "Costas",
    address: {
      street: "Lalaland 12",
    },
  };

  // Destructuring lồng nhau an toàn (tránh lỗi khi person.address === undefined)
  const { address: { street, city = "Unknown City" } = {} } = person;

  return (
    <div>
      <h1>Exercise 3</h1>
      <h3>Địa chỉ</h3>
      <p>
        <strong>Street:</strong> {street}
      </p>
      <p>
        <strong>City:</strong> {city}
      </p>
    </div>
  );
}
