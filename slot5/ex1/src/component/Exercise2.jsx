import React from "react";

export default function Exersice2() {
  //1.Tạo ra bảng số nguyên, in ra danh sách list
  const numbers = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];

  //2.Tính tổng các phần tử trong mảng
  const sum = numbers.reduce((acc, curr) => acc + curr, 0);

  //`3.tính trung bình mảng số nguyên
  const avg = sum / numbers.length;

  //4. khai báo mảng chuỗi names in ra danh sách các tên theo thứ tự tăng dần alphabet
  const names = [
    "Bình",
    "An",
    "Minh",
    "Cường",
    "Dũng",
    "Huy",
    "Vinh",
    "Nam",
    "Tuấn",
    "Quân",
  ];
  names.sort();

  //5. khai bóa một mảng students chứa 10 đối tượng mỗi đối tượng student có các thuộc tính: id, name, age, grade
  const students = [
    { id: 1, name: "An", age: 20, grade: 6 },
    { id: 2, name: "Bình", age: 21, grade: 7.0 },
    { id: 3, name: "Cường", age: 22, grade: 9.7 },
    { id: 4, name: "Trung", age: 23, grade: 6.5 },
    { id: 5, name: "Huy", age: 24, grade: 8.0 },
    { id: 6, name: "Minh", age: 25, grade: 7.5 },
    { id: 7, name: "Nam", age: 26, grade: 10 },
    { id: 8, name: "Trí", age: 27, grade: 6.0 },
    { id: 9, name: "Hoang", age: 28, grade: 8.0 },
    { id: 10, name: "Khoa", age: 29, grade: 7.0 },
  ];

  // in ra danh sách students có grade >= 7.5 sắp xếp theo grade giảm dần
  const topStudents = students
    .filter((student) => student.grade >= 7.5)
    .sort((a, b) => b.grade - a.grade);

  // tính trung bình điểm của học sinh
  const AvgGrade =
    topStudents.reduce((acc, curr) => acc + curr.grade, 0) / topStudents.length;

  return (
    <div>
      <h1>Exersice2</h1>
      <h4>In ra mảng số nguyên:</h4>
      <ul>
        {numbers.map((number, index) => (
          <li key={index}>
            Phần tử thứ {index}: {number}
          </li>
        ))}
      </ul>
      <h4>
        {" "}
        Tổng phần tử của mảng: <strong>{sum}</strong>
      </h4>
      <h4>
        {" "}
        Trung bình phần tử trong mảng: <strong>{avg.toFixed(2)}</strong>{" "}
      </h4>

      <h4> In mảng chuỗi theo thứ tự alphabet:</h4>
      <ul>
        {names.map((name, index) => (
          <li key={index}>
            {" "}
            Phần tử thứ {index} - {name}
          </li>
        ))}
      </ul>
      <h4> Điểm học sinh có điểm trên 7,5: </h4>
      <table border={1} cellPadding={5} cellSpacing={0}>
        <thead>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Grade</th>
        </thead>
        <tbody>
          {topStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4>
        Trung bình điểm: <strong>{AvgGrade.toFixed(2)}</strong>
      </h4>
      <hr></hr>
    </div>
  );
}
