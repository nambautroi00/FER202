import React from "react";

export default function Exercise4() {
  const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];

  // Destructuring: lấy first, bỏ qua phần tử thứ 2, lấy third với default 0, và phần còn lại vào restAges
  const [first, , third = 0, ...restAges] = ages;

  return (
    <div>
      <h1>Exercise 4</h1>
      <h3>Array Destructuring</h3>
      <p>
        <strong>First:</strong> {first}
      </p>
      <p>
        <strong>Third (with default 0):</strong> {third}
      </p>
      <p>
        <strong>Rest Ages:</strong>{" "}
        {restAges.length ? restAges.join(", ") : "[]"}
      </p>
      <hr></hr>
    </div>
  );
}
