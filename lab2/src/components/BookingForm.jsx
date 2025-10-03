export default function BookingForm() {
  return (
    <div className="container-fluid bg-dark text-white py-5">
      <div className="container">
        <h2 className="text-center mb-4">Book Your Table</h2>
        <form>
          <div className="row mb-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Your Name *"
              />
            </div>
            <div className="col-md-4">
              <input
                type="email"
                className="form-control"
                placeholder="Your Email *"
              />
            </div>
            <div className="col-md-4">
              <select className="form-select">
                <option>Select a Service</option>
                <option>Dine In</option>
                <option>Take Away</option>
              </select>
            </div>
          </div>
          <div className="mb-3">
            <textarea
              className="form-control"
              rows="4"
              placeholder="Please write your comment"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-warning text-white">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
