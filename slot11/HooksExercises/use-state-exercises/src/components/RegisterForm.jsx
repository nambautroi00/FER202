import React, { useState, useMemo } from "react";
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
  Toast,
  Modal,
} from "react-bootstrap";

// Hàm validate username
function validateUsername(username) {
  if (username === "") return ""; // Không validate nếu chưa nhập gì
  const trimmed = username.trim();
  if (trimmed !== username) {
    return "Username không được có khoảng trắng đầu/cuối";
  }
  if (trimmed.length < 3) {
    return "Username phải có ít nhất 3 ký tự";
  }
  if (!/^[A-Za-z0-9_.]+$/.test(trimmed)) {
    return "Username chỉ được chứa chữ cái, số, dấu _ hoặc dấu .";
  }
  return "";
}

// Hàm validate email
function validateEmail(email) {
  if (email === "") return ""; // Không validate nếu chưa nhập gì
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Email không đúng định dạng (vd: example@email.com)";
  }
  return "";
}

// Hàm validate password
function validatePassword(password) {
  if (password === "") return ""; // Không validate nếu chưa nhập gì
  if (password.length < 8) {
    return "Password phải có ít nhất 8 ký tự";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password phải có ít nhất 1 chữ hoa";
  }
  if (!/[a-z]/.test(password)) {
    return "Password phải có ít nhất 1 chữ thường";
  }
  if (!/[0-9]/.test(password)) {
    return "Password phải có ít nhất 1 chữ số";
  }
  if (!/[^A-Za-z0-9]/.test(password)) {
    return "Password phải có ít nhất 1 ký tự đặc biệt (@, #, $, !, %, etc.)";
  }
  return "";
}

// Hàm validate confirm password
function validateConfirm(confirm, password) {
  if (confirm === "") return ""; // Không validate nếu chưa nhập gì
  if (confirm !== password) {
    return "Confirm password phải khớp với password";
  }
  return "";
}

function RegisterForm() {
  // State là một object gồm tất cả các trường
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });

  // State để lưu lỗi cho từng trường
  const [errors, setErrors] = useState({});

  // State để track xem field nào đã được touched (người dùng đã tương tác)
  const [touched, setTouched] = useState({});

  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Xử lý thay đổi input với validation real-time
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Cập nhật giá trị form
    setForm((prev) => ({ ...prev, [name]: value }));

    // Validate ngay khi người dùng nhập (nếu field đã được touched)
    if (touched[name]) {
      validateField(name, value);
    }
  };

  // Validate một field cụ thể
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "username":
        error = validateUsername(value);
        break;
      case "email":
        error = validateEmail(value);
        break;
      case "password":
        error = validatePassword(value);
        // Nếu đang nhập password và đã có confirm, re-validate confirm
        if (touched.confirm) {
          const confirmError = validateConfirm(form.confirm, value);
          setErrors((prev) => ({ ...prev, confirm: confirmError }));
        }
        break;
      case "confirm":
        error = validateConfirm(value, form.password);
        break;
      default:
        break;
    }

    // Cập nhật lỗi
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Xử lý khi người dùng blur (rời khỏi) input
  const handleBlur = (e) => {
    const { name, value } = e.target;

    // Đánh dấu field đã được touched
    setTouched((prev) => ({ ...prev, [name]: true }));

    // Validate field
    validateField(name, value);
  };

  // Validate tất cả các trường (khi submit)
  const validateAll = () => {
    const newErrors = {};

    // Validate tất cả fields, bỏ qua việc check rỗng
    const usernameError =
      form.username === ""
        ? "Username không được để trống"
        : validateUsername(form.username);
    if (usernameError) newErrors.username = usernameError;

    const emailError =
      form.email === ""
        ? "Email không được để trống"
        : validateEmail(form.email);
    if (emailError) newErrors.email = emailError;

    const passwordError =
      form.password === ""
        ? "Password không được để trống"
        : validatePassword(form.password);
    if (passwordError) newErrors.password = passwordError;

    const confirmError =
      form.confirm === ""
        ? "Confirm password không được để trống"
        : validateConfirm(form.confirm, form.password);
    if (confirmError) newErrors.confirm = confirmError;

    return newErrors;
  };

  // Kiểm tra form có hợp lệ không
  const isValid = useMemo(() => {
    // Form hợp lệ khi tất cả fields đã điền và không có lỗi
    const allFilled =
      form.username && form.email && form.password && form.confirm;
    const noErrors =
      !errors.username && !errors.email && !errors.password && !errors.confirm;
    return allFilled && noErrors;
  }, [form, errors]);

  // Xử lý submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Đánh dấu tất cả fields là đã touched
    setTouched({ username: true, email: true, password: true, confirm: true });

    // Validate tất cả
    const validationErrors = validateAll();
    setErrors(validationErrors);

    // Nếu không có lỗi, hiển thị toast và modal
    if (Object.keys(validationErrors).length === 0) {
      setShowToast(true);
      setShowModal(true);
    }
  };

  // Xử lý cancel - reset form
  const handleCancel = () => {
    setForm({ username: "", email: "", password: "", confirm: "" });
    setErrors({});
    setTouched({});
  };

  // Đóng modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Card>
            <Card.Header>
              <h4 className="text-center mb-0">Form Đăng Ký Tài Khoản</h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                {/* Username */}
                <Form.Group className="mb-3">
                  <Form.Label>
                    Username <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.username && !!errors.username}
                    placeholder="Nhập username (≥ 3 ký tự, chỉ chữ, số, _ hoặc .)"
                    style={{
                      borderColor:
                        touched.username && errors.username ? "#dc3545" : "",
                      borderWidth:
                        touched.username && errors.username ? "2px" : "1px",
                    }}
                  />
                  {touched.username && errors.username && (
                    <div
                      style={{
                        color: "#dc3545",
                        fontSize: "14px",
                        marginTop: "5px",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <span>⚠️</span>
                      <span>{errors.username}</span>
                    </div>
                  )}
                </Form.Group>

                {/* Email */}
                <Form.Group className="mb-3">
                  <Form.Label>
                    Email <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.email && !!errors.email}
                    placeholder="Nhập email"
                    style={{
                      borderColor:
                        touched.email && errors.email ? "#dc3545" : "",
                      borderWidth:
                        touched.email && errors.email ? "2px" : "1px",
                    }}
                  />
                  {touched.email && errors.email && (
                    <div
                      style={{
                        color: "#dc3545",
                        fontSize: "14px",
                        marginTop: "5px",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <span>⚠️</span>
                      <span>{errors.email}</span>
                    </div>
                  )}
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3">
                  <Form.Label>
                    Password <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.password && !!errors.password}
                    placeholder="Nhập password (≥ 8 ký tự, có chữ hoa, thường, số, ký tự đặc biệt)"
                    style={{
                      borderColor:
                        touched.password && errors.password ? "#dc3545" : "",
                      borderWidth:
                        touched.password && errors.password ? "2px" : "1px",
                    }}
                  />
                  {touched.password && errors.password && (
                    <div
                      style={{
                        color: "#dc3545",
                        fontSize: "14px",
                        marginTop: "5px",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <span>⚠️</span>
                      <span>{errors.password}</span>
                    </div>
                  )}
                </Form.Group>

                {/* Confirm Password */}
                <Form.Group className="mb-3">
                  <Form.Label>
                    Confirm Password <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    name="confirm"
                    value={form.confirm}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.confirm && !!errors.confirm}
                    placeholder="Nhập lại password"
                    style={{
                      borderColor:
                        touched.confirm && errors.confirm ? "#dc3545" : "",
                      borderWidth:
                        touched.confirm && errors.confirm ? "2px" : "1px",
                    }}
                  />
                  {touched.confirm && errors.confirm && (
                    <div
                      style={{
                        color: "#dc3545",
                        fontSize: "14px",
                        marginTop: "5px",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      <span>⚠️</span>
                      <span>{errors.confirm}</span>
                    </div>
                  )}
                </Form.Group>

                {/* Buttons */}
                <div style={{ display: "flex", gap: 10 }}>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={!isValid}
                    style={{ flex: 1 }}
                  >
                    Submit
                  </Button>
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={handleCancel}
                    style={{ flex: 1 }}
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Toast thông báo */}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 9999,
        }}
      >
        <Toast.Header>
          <strong className="me-auto">Thông Báo</strong>
        </Toast.Header>
        <Toast.Body className="bg-success text-white">
          Submitted successfully!
        </Toast.Body>
      </Toast>

      {/* Modal hiển thị thông tin đã submit */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Đăng Ký Thành Công!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <h5 className="text-center text-success mb-3">
                Thông tin đã submit thành công!
              </h5>
              <div style={{ lineHeight: 2 }}>
                <p>
                  <strong>Username:</strong> {form.username}
                </p>
                <p>
                  <strong>Email:</strong> {form.email}
                </p>
                <p
                  style={{ color: "#28a745", fontSize: "14px", marginTop: 16 }}
                >
                  ✓ Password đã được lưu an toàn
                </p>
              </div>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default RegisterForm;
