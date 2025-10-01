export default function Footer() {
  return (
    <footer className="bg-warning text-dark mt-5">
      <div className="container py-4 d-flex justify-content-between">
        <div>
          <h6>Our Address</h6>
          <p>
            Km29, Đại lộ Thăng Long, Thạch Thất, Hà Nội <br />
            024 7300 5588 <br />
            example@fpt.edu.vn
          </p>
        </div>
        <div className="text-end">
          <p>© Copyright 2023</p>
          <div>
            <a href="#" className="text-dark mx-1">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" className="text-dark mx-1">
              <i className="bi bi-google"></i>
            </a>
            <a href="#" className="text-dark mx-1">
              <i className="bi bi-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
