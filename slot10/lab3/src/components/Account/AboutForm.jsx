import React from "react";
import { Form, Button } from "react-bootstrap";

class AboutForm extends React.Component {
  render() {
    const { formData, errors, handleChange, onNext } = this.props;

    return (
      <>
        <h5 className="mb-3">
          <i className="bi bi-info-circle"></i> About Information
        </h5>

        <Form.Group className="mb-3">
          <Form.Label>
            <i className="bi bi-person-fill me-2"></i>First Name *
          </Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            isInvalid={!!errors.firstName}
            placeholder="Enter your first name"
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.firstName && (
              <span style={{ color: "red", fontSize: "15px" }}>
                {errors.firstName}
              </span>
            )}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <i className="bi bi-person-fill me-2"></i>Last Name *
          </Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            isInvalid={!!errors.lastName}
            placeholder="Enter your last name"
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.lastName && (
              <span style={{ color: "red", fontSize: "15px" }}>
                {errors.lastName}
              </span>
            )}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <i className="bi bi-envelope-fill me-2"></i>Email *
          </Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
            placeholder="Enter your email"
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.email && (
              <span style={{ color: "red", fontSize: "15px" }}>
                {errors.email}
              </span>
            )}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <i className="bi bi-telephone-fill me-2"></i>Phone *
          </Form.Label>
          <Form.Control
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            isInvalid={!!errors.phone}
            placeholder="Enter your phone number"
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.phone && (
              <span style={{ color: "red", fontSize: "15px" }}>
                {errors.phone}
              </span>
            )}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <i className="bi bi-calendar-event-fill me-2"></i>Age *
          </Form.Label>
          <Form.Control
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            isInvalid={!!errors.age}
            placeholder="Enter your age"
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.age && (
              <span style={{ color: "red", fontSize: "15px" }}>
                {errors.age}
              </span>
            )}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            <i className="bi bi-image-fill me-2"></i>Avatar
          </Form.Label>
          <Form.Control
            type="file"
            name="avatar"
            onChange={handleChange}
            accept="image/*"
            required
          />
        </Form.Group>

        <div className="d-flex justify-content-end">
          <Button onClick={onNext}>Next</Button>
        </div>
      </>
    );
  }
}

export default AboutForm;

