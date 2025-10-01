export default function StudentCard({ id, name, img }) {
  return (
    <div className="col-md-3">
      <div className="card h-100 text-center">
        <img src={img} className="card-img-top" alt={name} />
        <div className="card-body">
          <h6>{id}</h6>
          <p className="fw-bold">{name}</p>
          <div>
            <label>
              <input type="radio" name={id} className="me-1" />
              Absent
            </label>
            <label className="ms-3">
              <input type="radio" name={id} className="me-1" />
              Present
            </label>
          </div>
          <button className="btn btn-warning btn-sm mt-2">Submit</button>
        </div>
      </div>
    </div>
  );
}
