import logo from "../images/logofpt.png";

export default function Header() {
  return (
    <header style={{ backgroundColor: "#ff8000" }} className="text-center py-4">
      <img src={logo} alt="FPT University" style={{ maxHeight: "120px" }} />
      <nav className="mt-3">
        <a
          href="#home"
          className="mx-2 link-light text-decoration-none fw-bold"
        >
          Home
        </a>
        <a
          href="#about"
          className="mx-2 link-light text-decoration-none fw-bold"
        >
          About
        </a>
        <a
          href="#contact"
          className="mx-2 link-light text-decoration-none fw-bold"
        >
          Contact
        </a>
      </nav>
    </header>
  );
}
