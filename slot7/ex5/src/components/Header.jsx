import { FaHome, FaBook, FaUserGraduate, FaList } from "react-icons/fa";

export default function Header() {
  return (
    <header style={{ backgroundColor: "#f5d6b3" }} className="py-2">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Logo + Title */}
        <div className="d-flex align-items-center">
          <img
            src="../images/fpt.sgv.svg"
            alt="FPT University"
            style={{ height: "50px" }}
            className="me-2"
          />
          <span className="fw-bold text-danger">FPT UNIVERSITY</span>
        </div>

        {/* Menu */}
        <nav className="d-flex align-items-center">
          <a href="#home" className="mx-2 text-decoration-none text-orange">
            <FaHome className="me-1" /> Trang chủ
          </a>
          <a href="#major" className="mx-2 text-decoration-none text-orange">
            <FaBook className="me-1" /> Ngành học
          </a>
          <a
            href="#admission"
            className="mx-2 text-decoration-none text-orange"
          >
            <FaUserGraduate className="me-1" /> Tuyển sinh
          </a>
          <a href="#student" className="mx-2 text-decoration-none text-orange">
            <FaList className="me-1" /> Sinh viên
          </a>
        </nav>

        {/* Search box */}
        <form className="d-flex ms-3">
          <label htmlFor="search" className="me-2 fw-bold">
            Search:
          </label>
          <input id="search" className="form-control" type="search" />
        </form>
      </div>
    </header>
  );
}
