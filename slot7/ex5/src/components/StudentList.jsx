import StudentCard from "./StudentCard";

export default function StudentList() {
  const students = [
    { id: "DE160142", name: "Nguyễn Hồ Quốc Oanh", img: "/images/s1.jpg" },
    { id: "DE160377", name: "Chay Văn Thế", img: "/images/s2.jpg" },
    { id: "DE160457", name: "Đỗ Ngọc Phúc", img: "/images/s3.jpg" },
    { id: "DE170049", name: "Lai Hoàng Minh", img: "/images/s4.jpg" },
  ];

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Students Detail</h2>
      <div className="row g-4">
        {students.map((s) => (
          <StudentCard key={s.id} id={s.id} name={s.name} img={s.img} />
        ))}
      </div>
    </div>
  );
}
