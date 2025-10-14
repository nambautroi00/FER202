import React from "react";
import { Form, Button } from "react-bootstrap";

class AccountForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      showConfirm: false
    };
  }

  togglePasswordVisibility = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  toggleConfirmVisibility = () => {
    this.setState({ showConfirm: !this.state.showConfirm });
  };

  render() {
    const { formData, errors, handleChange, onPrevious, onNext } = this.props;
    const { showPassword, showConfirm } = this.state;

    return (
      <>
        <h5 className="mb-3">
          <i className="bi bi-lock-fill text-primary"></i> Account Information
        </h5>

        <Form.Group className="mb-3">
          <Form.Label>
            <i className="bi bi-person-fill me-2"></i> Username *
          </Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            isInvalid={!!errors.username}
            placeholder="Enter your username"
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.username && (
              <span style={{ color: "red", fontSize: "15px" }}>
                {errors.username}
              </span>
            )}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Password */}
        <Form.Group className="mb-3 position-relative">
          <Form.Label>
            <i className="bi bi-lock-fill me-2"></i> Password *
          </Form.Label>
          <div className="input-group">
            <Form.Control
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
              placeholder="Enter password"
              required
            />
            <Button
              variant="outline-secondary"
              onClick={this.togglePasswordVisibility}
            >
              <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>
            </Button>
          </div>
          <Form.Control.Feedback type="invalid">
            {errors.password && (
              <span style={{ color: "red", fontSize: "15px" }}>
                {errors.password}
              </span>
            )}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Confirm Password */}
        <Form.Group className="mb-3 position-relative">
          <Form.Label>
            <i className="bi bi-lock-fill me-2"></i> Confirm Password *
          </Form.Label>
          <div className="input-group">
            <Form.Control
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              isInvalid={!!errors.confirmPassword}
              placeholder="Confirm your password"
              required
            />
            <Button
              variant="outline-secondary"
              onClick={this.toggleConfirmVisibility}
            >
              <i className={showConfirm ? "bi bi-eye-slash" : "bi bi-eye"}></i>
            </Button>
          </div>
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword && (
              <span style={{ color: "red", fontSize: "15px" }}>
                {errors.confirmPassword}
              </span>
            )}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Secret Question */}
        <Form.Group className="mb-3">
          <Form.Label>
            <i className="bi bi-question-circle me-2"></i> Secret Question *
          </Form.Label>
          <Form.Select
            name="secretQuestion"
            value={formData.secretQuestion}
            onChange={handleChange}
            isInvalid={!!errors.secretQuestion}
            required
          >
            <option value="">Select a question</option>
            <option>What is your first pet's name?</option>
            <option>What is your favorite color?</option>
            <option>What is your mother's maiden name?</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.secretQuestion && (
              <span style={{ color: "red", fontSize: "15px" }}>
                {errors.secretQuestion}
              </span>
            )}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Answer */}
        <Form.Group className="mb-3">
          <Form.Label>
            <i className="bi bi-key-fill me-2"></i> Answer *
          </Form.Label>
          <Form.Control
            type="text"
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            isInvalid={!!errors.answer}
            placeholder="Enter your answer"
            required
          />
          <Form.Control.Feedback type="invalid">
            {errors.answer && (
              <span style={{ color: "red", fontSize: "15px" }}>
                {errors.answer}
              </span>
            )}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Buttons */}
        <div className="d-flex justify-content-between">
          <Button variant="secondary" onClick={onPrevious}>
            Previous
          </Button>
          <Button onClick={onNext}>Next</Button>
        </div>
      </>
    );
  }
}

export default AccountForm;

