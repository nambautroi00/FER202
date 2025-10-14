import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ProgressBar,
  Card,
  Nav,
} from "react-bootstrap";

class WizardProfileForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      formData: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        age: "",
        avatar: null,
        username: "",
        password: "",
        confirmPassword: "",
        address: "",
        city: "",
        country: "",
      },
      errors: {},
    };
  }

  handleChange = (e) => {
    const { name, value, files } = e.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: files ? files[0] : value,
      },
    }));
  };

  validateStep = () => {
    const { step, formData } = this.state;
    let errors = {};

    if (step === 1) {
      if (!formData.firstName) errors.firstName = "First name is required";
      if (!formData.lastName) errors.lastName = "Last name is required";
      if (!formData.email) errors.email = "Email is required";
      if (!formData.phone) errors.phone = "Phone number is required";
      if (!formData.age) errors.age = "Age is required";
    } else if (step === 2) {
      if (!formData.username) errors.username = "Username is required";
      if (!formData.password) errors.password = "Password is required";
      if (formData.password !== formData.confirmPassword)
        errors.confirmPassword = "Passwords do not match";
      if (!formData.secretQuestion)
        errors.secretQuestion = "Secret question is required";
      if (!formData.answer) errors.answer = "Answer is required";
    } else if (step === 3) {
      if (!formData.address) errors.address = "Address is required";
      if (!formData.city) errors.city = "City is required";
      if (!formData.country) errors.country = "Country is required";
    }

    this.setState({ errors });
    return Object.keys(errors).length === 0;
  };

  nextStep = () => {
    if (this.validateStep()) {
      this.setState((prev) => ({ step: prev.step + 1 }));
    }
  };

  prevStep = () => {
    this.setState((prev) => ({ step: prev.step - 1 }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.validateStep()) {
      alert(
        "Form submitted successfully!\n\n" +
          JSON.stringify(this.state.formData, null, 2)
      );
    }
  };

  render() {
    const { step, formData, errors } = this.state;
    const progress = (step / 3) * 100;

    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="p-4 shadow">
              <h4 className="text-center mb-3">
                <i className="bi bi-person-circle"></i> Build Your Profile
              </h4>

              {/* Progress Bar with Percentage */}
              <div className="mb-4">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Progress</span>
                  <span className="text-primary fw-bold">{Math.round(progress)}%</span>
                </div>
                <ProgressBar 
                  now={progress} 
                  variant={step === 3 ? "success" : "primary"}
                  animated
                  striped
                />
              </div>
              
              {/* Navigation Tabs */}
              <Nav variant="tabs" className="mb-3">
                <Nav.Item>
                  <Nav.Link 
                    active={step === 1}
                    style={{ 
                      cursor: 'default',
                      fontWeight: step === 1 ? 'bold' : 'normal',
                      color: step === 1 ? '#0d6efd' : step > 1 ? '#198754' : '#6c757d'
                    }}
                  >
                    <i className="bi bi-person-circle me-1"></i>
                    About
                    {step > 1 && <i className="bi bi-check-circle-fill ms-1 text-success"></i>}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    active={step === 2}
                    style={{ 
                      cursor: 'default',
                      fontWeight: step === 2 ? 'bold' : 'normal',
                      color: step === 2 ? '#0d6efd' : step > 2 ? '#198754' : '#6c757d'
                    }}
                  >
                    <i className="bi bi-lock me-1"></i>
                    Account
                    {step > 2 && <i className="bi bi-check-circle-fill ms-1 text-success"></i>}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link 
                    active={step === 3}
                    style={{ 
                      cursor: 'default',
                      fontWeight: step === 3 ? 'bold' : 'normal',
                      color: step === 3 ? '#0d6efd' : '#6c757d'
                    }}
                  >
                    <i className="bi bi-geo-alt me-1"></i>
                    Address
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <Form onSubmit={this.handleSubmit}>
                {/* Step 1: About */}
                {step === 1 && (
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
                        onChange={this.handleChange}
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
                        onChange={this.handleChange}
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
                        onChange={this.handleChange}
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
                        onChange={this.handleChange}
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
                        onChange={this.handleChange}
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
                        onChange={this.handleChange}
                        accept="image/*"
                        required
                      />
                    </Form.Group>

                    <div className="d-flex justify-content-end">
                      <Button onClick={this.nextStep}>Next</Button>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <h5 className="mb-3">
                      <i className="bi bi-lock-fill text-primary"></i> Account
                      Information
                    </h5>

                    <Form.Group className="mb-3">
                      <Form.Label>
                        <i className="bi bi-person-fill me-2"></i> Username *
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={this.handleChange}
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
                          type={this.state.showPassword ? "text" : "password"}
                          name="password"
                          value={formData.password}
                          onChange={this.handleChange}
                          isInvalid={!!errors.password}
                          placeholder="Enter password"
                          required
                        />
                        <Button
                          variant="outline-secondary"
                          onClick={() =>
                            this.setState({
                              showPassword: !this.state.showPassword,
                            })
                          }
                        >
                          <i
                            className={
                              this.state.showPassword
                                ? "bi bi-eye-slash"
                                : "bi bi-eye"
                            }
                          ></i>
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
                        <i className="bi bi-lock-fill me-2"></i> Confirm
                        Password *
                      </Form.Label>
                      <div className="input-group">
                        <Form.Control
                          type={this.state.showConfirm ? "text" : "password"}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={this.handleChange}
                          isInvalid={!!errors.confirmPassword}
                          placeholder="Confirm your password"
                          required
                        />
                        <Button
                          variant="outline-secondary"
                          onClick={() =>
                            this.setState({
                              showConfirm: !this.state.showConfirm,
                            })
                          }
                        >
                          <i
                            className={
                              this.state.showConfirm
                                ? "bi bi-eye-slash"
                                : "bi bi-eye"
                            }
                          ></i>
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
                        <i className="bi bi-question-circle me-2"></i> Secret
                        Question *
                      </Form.Label>
                      <Form.Select
                        name="secretQuestion"
                        value={formData.secretQuestion}
                        onChange={this.handleChange}
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
                        onChange={this.handleChange}
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
                      <Button variant="secondary" onClick={this.prevStep}>
                        Previous
                      </Button>
                      <Button onClick={this.nextStep}>Next</Button>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <h5 className="mb-3">
                      <i className="bi bi-geo-alt-fill text-primary"></i>{" "}
                      Address Information
                    </h5>

                    {/* Street */}
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <i className="bi bi-geo-fill me-2"></i> Street *
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={this.handleChange}
                        placeholder="Enter your street address"
                        isInvalid={!!errors.street}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.street && (
                          <span style={{ color: "red", fontSize: "15px" }}>
                            {errors.street}
                          </span>
                        )}
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* City */}
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <i className="bi bi-buildings-fill me-2"></i> City *
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={this.handleChange}
                        placeholder="Enter your city"
                        isInvalid={!!errors.city}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.city && (
                          <span style={{ color: "red", fontSize: "15px" }}>
                            {errors.city}
                          </span>
                        )}
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* State */}
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <i className="bi bi-geo-alt me-2"></i> State *
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={this.handleChange}
                        placeholder="Enter your state/province"
                        isInvalid={!!errors.state}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.state && (
                          <span style={{ color: "red", fontSize: "15px" }}>
                            {errors.state}
                          </span>
                        )}
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* Zip Code */}
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <i className="bi bi-mailbox me-2"></i> Zip Code *
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={this.handleChange}
                        placeholder="Enter your zip/postal code"
                        isInvalid={!!errors.zip}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.zip && (
                          <span style={{ color: "red", fontSize: "15px" }}>
                            {errors.zip}
                          </span>
                        )}
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* Country */}
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <i className="bi bi-flag-fill me-2"></i> Country *
                      </Form.Label>
                      <Form.Select
                        name="country"
                        value={formData.country}
                        onChange={this.handleChange}
                        isInvalid={!!errors.country}
                        required
                      >
                        <option value="">Select a country</option>
                        <option value="Vietnam">Vietnam</option>
                        <option value="United States">United States</option>
                        <option value="Japan">Japan</option>
                        <option value="France">France</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.country && (
                          <span style={{ color: "red", fontSize: "15px" }}>
                            {errors.country}
                          </span>
                        )}
                      </Form.Control.Feedback>
                    </Form.Group>

                    {/* Buttons */}
                    <div className="d-flex justify-content-between">
                      <Button variant="secondary" onClick={this.prevStep}>
                        Previous
                      </Button>
                      <Button variant="success" type="submit">
                        Finish
                      </Button>
                    </div>
                  </>
                )}
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default WizardProfileForm;
