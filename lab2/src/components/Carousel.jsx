import banner from "../images/banner.png";
import banner1 from "../images/banner1.png";
import banner2 from "../images/banner2.png";
import banner3 from "../images/banner3.png";
import banner4 from "../images/banner4.png";

const banners = [
  {
    img: banner,
    title: "Neapolitan Pizza",
    desc: "If you are looking for traditional Italian pizza, the Neapolitan is the best option!",
  },
  {
    img: banner1,
    title: "Pepperoni Pizza",
    desc: "A classic favorite loaded with pepperoni and cheese.",
  },
  {
    img: banner2,
    title: "Veggie Pizza",
    desc: "Fresh vegetables and delicious cheese for a healthy choice.",
  },
  {
    img: banner3,
    title: "BBQ Chicken Pizza",
    desc: "Tender chicken with tangy BBQ sauce and onions.",
  },
  {
    img: banner4,
    title: "Seafood Pizza",
    desc: "A delightful mix of seafood and cheese.",
  },
];

export default function Carousel() {
  return (
    <div id="pizzaCarousel" className="carousel slide" data-bs-ride="carousel">
      {/* Carousel indicators */}
      <div className="carousel-indicators">
        {banners.map((_, i) => (
          <button
            key={i}
            type="button"
            data-bs-target="#pizzaCarousel"
            data-bs-slide-to={i}
            className={i === 0 ? "active" : ""}
            aria-current={i === 0 ? "true" : undefined}
            aria-label={`Slide ${i + 1}`}
          ></button>
        ))}
      </div>
      <div className="carousel-inner">
        {banners.map((b, i) => (
          <div className={`carousel-item${i === 0 ? " active" : ""}`} key={i}>
            <img
              src={b.img}
              className="d-block w-100"
              alt={b.title}
              style={{ height: "600px", objectFit: "cover" }}
            />
            <div
              className="carousel-caption d-none d-md-block"
              style={{ bottom: "50px" }}
            >
              <h3 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>
                {b.title}
              </h3>
              <p style={{ fontSize: "1.25rem" }}>{b.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#pizzaCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#pizzaCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
