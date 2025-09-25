import React from "react";

export default function Exercise7() {
  const companies = [
    { name: "Company One", category: "Finance", start: 1981, end: 2004 },
    { name: "Company Two", category: "Retail", start: 1992, end: 2008 },
    { name: "Company Three", category: "Auto", start: 1999, end: 2007 },
    { name: "Company Four", category: "Retail", start: 1989, end: 2010 },
    { name: "Company Five", category: "Technology", start: 2009, end: 2014 },
    { name: "Company Six", category: "Finance", start: 1987, end: 2010 },
    { name: "Company Seven", category: "Auto", start: 1986, end: 1996 },
    { name: "Company Eight", category: "Technology", start: 2011, end: 2016 },
    { name: "Company Nine", category: "Retail", start: 1981, end: 1989 },
  ];

  // Spread: clone và chỉnh sửa start + 1 mà không làm đổi bản gốc
  const company0New = { ...companies[0], start: companies[0].start + 1 };

  // Rest: nhận nhiều mảng rồi gộp
  const concatAll = (...arrays) => arrays.flat();

  const concatResult = concatAll([1, 2], [3], [4, 5]);

  return (
    <div>
      <h1>Exercise 7</h1>
      <h3>Spread vs Rest</h3>
      <p>
        <strong>Original company[0]:</strong> {companies[0].name} - start{" "}
        {companies[0].start}
      </p>
      <p>
        <strong>New company0New:</strong> {company0New.name} - start{" "}
        {company0New.start}
      </p>
      <p>
        <strong>concatAll([1,2],[3],[4,5]):</strong> {concatResult.join(", ")}
      </p>
      <hr></hr>
    </div>
  );
}
