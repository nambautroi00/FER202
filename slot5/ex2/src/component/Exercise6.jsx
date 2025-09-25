import React from "react";

export default function Exercise6() {
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

  // Sao chép mảng để tránh mutate
  const sorted = [...companies].sort((a, b) => a.end - b.end);

  // Lấy 3 công ty đầu
  const top3 = sorted.slice(0, 3);

  return (
    <div>
      <h1>Exercise 6</h1>
      <h3>Top 3 Companies (Sorted by End Year)</h3>
      {top3.map((c, index) => (
        <p key={index}>
          {c.name} - {c.end}
        </p>
      ))}
      <hr></hr>
    </div>
  );
}
