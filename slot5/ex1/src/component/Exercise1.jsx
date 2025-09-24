import React from "react";

export default function Exersice1() {
  const Double = (x) => x * 2;
  const isEven = (x) => x % 2 === 0;

  return (
    <div>
      <h1>Exersice1</h1>
      <p>kết quả Double(5): {Double(5)}</p>
      <p>Kết quả isEven(4): {isEven(4).toString() ? "Số chẳn" : "Số lẻ"}</p>
      <hr></hr>
    </div>
  );
}
