export default function MenuItem({ name, price, oldPrice, img, label }) {
  return (
    <div className="col-md-3">
      <div className="card h-100">
        <div className="position-relative">
          {label && (
            <span className="badge bg-warning text-dark position-absolute top-0 start-0">
              {label}
            </span>
          )}
          <img
            src={img}
            alt={name}
            className="card-img-top"
            style={{
              height: "300px",
              objectFit: "cover",
              borderRadius: "12px",
            }}
          />
        </div>
        <div className="card-body">
          <h5>{name}</h5>
          {oldPrice ? (
            <p>
              <del className="text-muted">${oldPrice}</del>{" "}
              <span className="text-warning">${price}</span>
            </p>
          ) : (
            <p>${price}</p>
          )}
          <button className="btn btn-dark text-white w-100">Buy</button>
        </div>
      </div>
    </div>
  );
}
