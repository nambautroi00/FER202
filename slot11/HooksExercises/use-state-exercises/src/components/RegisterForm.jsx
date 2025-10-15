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

// Validation rules
const validators = {
  username: (val) => {
    if (!val) return "";
    const trimmed = val.trim();
    if (trimmed !== val) return "Username không được có khoảng trắng đầu/cuối";
    if (trimmed.length < 3) return "Username phải có ít nhất 3 ký tự";
    if (!/^[A-Za-z0-9_.]+$/.test(trimmed))
      return "Username chỉ chứa chữ, số, _ hoặc .";
    return "";
  },
  email: (val) => {
    if (!val) return "";
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
      ? ""
      : "Email không đúng định dạng";
  },
  password: (val) => {
    if (!val) return "";
    if (val.length < 8) return "Password phải có ít nhất 8 ký tự";
    if (!/[A-Z]/.test(val)) return "Password phải có ít nhất 1 chữ hoa";
    if (!/[a-z]/.test(val)) return "Password phải có ít nhất 1 chữ thường";
    if (!/[0-9]/.test(val)) return "Password phải có ít nhất 1 chữ số";
    if (!/[^A-Za-z0-9]/.test(val)) return "Password phải có ký tự đặc biệt";
    return "";
  },
  confirm: (val, pwd) =>
    !val ? "" : val !== pwd ? "Confirm password phải khớp" : "",
};

function RegisterForm() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = validators[name]?.(value, form.password) || "";
    setErrors((prev) => ({ ...prev, [name]: error }));
    // Re-validate confirm when password changes
    if (name === "password" && touched.confirm) {
      setErrors((prev) => ({
        ...prev,
        confirm: validators.confirm(form.confirm, value),
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const isValid = useMemo(() => {
    const allFilled =
      form.username && form.email && form.password && form.confirm;
    const noErrors = Object.values(errors).every((e) => !e);
    return allFilled && noErrors;
  }, [form, errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(form).forEach((key) => {
      const err = validators[key]?.(form[key], form.password);
      if (!form[key])
        newErrors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } không được để trống`;
      else if (err) newErrors[key] = err;
    });
    setTouched({ username: true, email: true, password: true, confirm: true });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      setShowToast(true);
      setShowModal(true);
    }
  };

  const handleCancel = () => {
    setForm({ username: "", email: "", password: "", confirm: "" });
    setErrors({});
    setTouched({});
  };

  const renderField = (name, type = "text", placeholder = "") => (
    <Form.Group className="mb-3">
      <Form.Label>
        {name.charAt(0).toUpperCase() +
          name.slice(1).replace(/([A-Z])/g, " $1")}{" "}
        <span style={{ color: "red" }}>*</span>
      </Form.Label>
      <Form.Control
        type={type}
        name={name}
        value={form[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        isInvalid={touched[name] && !!errors[name]}
        placeholder={placeholder}
      />
      {touched[name] && errors[name] && (
        <div style={{ color: "#dc3545", fontSize: "14px", marginTop: "5px" }}>
          ⚠️ {errors[name]}
        </div>
      )}
    </Form.Group>
  );

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
                {renderField(
                  "username",
                  "text",
                  "≥ 3 ký tự, chỉ chữ, số, _ hoặc ."
                )}
                {renderField("email", "email", "example@email.com")}
                {renderField(
                  "password",
                  "password",
                  "≥ 8 ký tự, chữ hoa, thường, số, ký tự đặc biệt"
                )}
                {renderField("confirm", "password", "Nhập lại password")}

                <div className="d-flex gap-2">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={!isValid}
                    className="flex-fill"
                  >
                    Submit
                  </Button>
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={handleCancel}
                    className="flex-fill"
                  >
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
        style={{ position: "fixed", top: 20, right: 20, zIndex: 9999 }}
      >
        <Toast.Header>
          <strong className="me-auto">Thông Báo</strong>
        </Toast.Header>
        <Toast.Body className="bg-success text-white">
          Submitted successfully!
        </Toast.Body>
      </Toast>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Đăng Ký Thành Công!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <h5 className="text-center text-success mb-3">
                Thông tin đã submit thành công!
              </h5>
              <p>
                <strong>Username:</strong> {form.username}
              </p>
              <p>
                <strong>Email:</strong> {form.email}
              </p>
              <p className="text-success mt-3">
                ✓ Password đã được lưu an toàn
              </p>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Đóng
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default RegisterForm;
