import React from "react";

export default function Exercise8() {
  const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];

  const stats = ages.reduce(
    (acc, age) => {
      acc.total += age;
      acc.min = Math.min(acc.min, age);
      acc.max = Math.max(acc.max, age);

      if (age >= 13 && age <= 19) {
        acc.buckets.teen++;
      } else if (age >= 20) {
        acc.buckets.adult++;
      }

      return acc;
    },
    {
      total: 0,
      min: Infinity,
      max: -Infinity,
      buckets: { teen: 0, adult: 0 },
    }
  );

  return (
    <div>
      <h1>Exercise 8</h1>
      <h3>Age Statistics</h3>
      <p>
        <strong>Total:</strong> {stats.total}, <strong>Min:</strong> {stats.min}
        , <strong>Max:</strong> {stats.max}
      </p>
      <p>
        <strong>Buckets:</strong>{" "}
        {`{ teen: ${stats.buckets.teen}, adult: ${stats.buckets.adult} }`}
      </p>
    </div>
  );
}
