import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Custom style for demo layout
const cardStyle = {
  maxWidth: 400,
  margin: "40px auto",
  border: "1px solid #ddd",
  borderRadius: 8,
  backgroundColor: "#fff",
};

class BookingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      from: "Hà nội",
      to: "Hà nội",
      type: [],
      showAlert: false,
      alertMessage: "",
      alertType: "success", // success, danger, warning, info
    };
  }

  handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      this.setState((prev) => ({
        ...prev,
        type: checked
          ? [...prev.type, value]
          : prev.type.filter((item) => item !== value),
      }));
    } else {
      this.setState({
        ...this.state,
        [name]: value,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (this.state.name.length < 5) {
      this.setState({
        showAlert: true,
        alertMessage: "Họ tên phải có ít nhất 5 ký tự!",
        alertType: "danger",
      });
      return;
    }

    if (this.state.address.length < 5) {
      this.setState({
        showAlert: true,
        alertMessage: "Địa chỉ phải có ít nhất 5 ký tự!",
        alertType: "danger",
      });
      return;
    }

    if (this.state.type.length === 0) {
      this.setState({
        showAlert: true,
        alertMessage: "Vui lòng chọn ít nhất một chiều đi!",
        alertType: "warning",
      });
      return;
    }

    // Success
    this.setState({
      showAlert: true,
      alertMessage: "Đặt vé thành công!",
      alertType: "success",
    });

    // Auto hide after 3 seconds
    setTimeout(() => {
      this.setState({ showAlert: false });
    }, 3000);
  };

  closeAlert = () => {
    this.setState({ showAlert: false });
  };

  render() {
    return (
      <div className="container mt-5" style={cardStyle}>
        {/* Alert */}
        {this.state.showAlert && (
          <div
            className={`alert alert-${this.state.alertType} alert-dismissible fade show mb-0`}
            role="alert"
            style={{ borderRadius: 0 }}
          >
            <strong>
              {this.state.alertType === "success" && "✓ "}
              {this.state.alertType === "danger" && "✗ "}
              {this.state.alertType === "warning" && "⚠ "}
              {this.state.alertType === "info" && "ℹ "}
            </strong>
            {this.state.alertMessage}
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={this.closeAlert}
            ></button>
          </div>
        )}

        {/* Header với nút X */}
        <div
          className="bg-warning text-center py-2 position-relative"
          style={{
            borderTopLeftRadius: this.state.showAlert ? 0 : 8,
            borderTopRightRadius: this.state.showAlert ? 0 : 8,
          }}
        >
          <span className="fw-bold">Form đặt vé máy bay</span>
          <button
            type="button"
            className="btn-close position-absolute top-50 end-0 translate-middle-y me-2"
            aria-label="Close"
            style={{ fontSize: "12px" }}
          ></button>
        </div>

        {/* Card body */}
        <div className="p-4" style={{ backgroundColor: "#f8f9fa" }}>
          <form onSubmit={this.handleSubmit}>
            {/* Nhóm input-group họ tên */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Họ tên</label>
              <div className="input-group">
                <span className="input-group-text">
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-person"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                  </svg>
                </span>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Phải nhập 5 ký tự, in hoa..."
                  value={this.state.name}
                  onChange={this.handleChange}
                  required
                />
                <span className="input-group-text">vnd</span>
              </div>
            </div>

            {/* Địa chỉ */}
            <div className="mb-3">
              <label className="form-label fw-semibold">Địa chỉ</label>
              <input
                type="text"
                name="address"
                className="form-control"
                placeholder="Phải nhập 5 ký tự, in hoa..."
                value={this.state.address}
                onChange={this.handleChange}
                required
              />
            </div>

            {/* Đi từ - Đến */}
            <div className="row mb-3">
              <div className="col">
                <label className="form-label fw-semibold">Đi từ</label>
                <select
                  name="from"
                  className="form-select"
                  value={this.state.from}
                  onChange={this.handleChange}
                >
                  <option value="Hà nội">Hà nội</option>
                  <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                </select>
              </div>
              <div className="col">
                <label className="form-label fw-semibold">Đến</label>
                <select
                  name="to"
                  className="form-select"
                  value={this.state.to}
                  onChange={this.handleChange}
                >
                  <option value="Hà nội">Hà nội</option>
                  <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                  <option value="Đà Nẵng">Đà Nẵng</option>
                </select>
              </div>
            </div>

            {/* Chọn chiều đi */}
            <div className="mb-4">
              <label className="form-label fw-semibold">
                Chọn chiều đi (Khứ hồi)
              </label>
              <div className="mt-2">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="type"
                    value="Đi"
                    checked={this.state.type.includes("Đi")}
                    onChange={this.handleChange}
                    id="checkDi"
                  />
                  <label className="form-check-label" htmlFor="checkDi">
                    Đi
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="type"
                    value="Về"
                    checked={this.state.type.includes("Về")}
                    onChange={this.handleChange}
                    id="checkVe"
                  />
                  <label className="form-check-label" htmlFor="checkVe">
                    Về
                  </label>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100 fw-bold">
              Đặt vé
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default BookingForm;
