import React from "react";

export default function Exercise5() {
  const people = [
    { name: "Ann", age: 19 },
    { name: "Bob", age: 12 },
    { name: "Chris", age: 15 },
    { name: "Diana", age: 22 },
    { name: "Eva", age: 13 },
  ];

  // Lọc tuổi 13–19, rồi map sang "Name (Age)"
  const teens = people
    .filter((p) => p.age >= 13 && p.age <= 19)
    .map((p) => `${p.name} (${p.age})`);

  return (
    <div>
      <h2>Teen List (13–19)</h2>
      {teens.map((t, index) => (
        <p key={index}>{t}</p>
      ))}
    </div>
  );
}
