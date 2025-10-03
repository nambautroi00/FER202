import { FaSearch } from "react-icons/fa";
export default function Header() {
  return (
    <header className="bg-dark text-white">
      <div className="container d-flex justify-content-between align-items-center py-2">
        <h2 className="m-0">Pizza House</h2>
        <nav>
          <a href="#home" className="mx-2 text-white text-decoration-none">
            Home
          </a>
          <a href="#about" className="mx-2 text-white text-decoration-none">
            About Us
          </a>
          <a href="#contact" className="mx-2 text-white text-decoration-none">
            Contact
          </a>
        </nav>
        <form className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
          />
          <button className="btn btn-danger" type="submit">
            <FaSearch />
          </button>
        </form>
      </div>
    </header>
  );
}
