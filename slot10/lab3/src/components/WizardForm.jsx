import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  ProgressBar,
  Card,
  Nav,
} from "react-bootstrap";
import AboutForm from "./Account/AboutForm";
import AccountForm from "./Account/AccountForm";
import AddressForm from "./Account/AddressForm";

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
        secretQuestion: "",
        answer: "",
        street: "",
        city: "",
        state: "",
        zip: "",
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
      if (!formData.street) errors.street = "Street is required";
      if (!formData.city) errors.city = "City is required";
      if (!formData.state) errors.state = "State is required";
      if (!formData.zip) errors.zip = "Zip code is required";
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
    this.setState((prev) => ({ step: prev.step - 1, errors: {} }));
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
                  <span className="text-primary fw-bold">
                    {Math.round(progress)}%
                  </span>
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
                      cursor: "default",
                      fontWeight: step === 1 ? "bold" : "normal",
                      color:
                        step === 1
                          ? "#0d6efd"
                          : step > 1
                          ? "#198754"
                          : "#6c757d",
                    }}
                  >
                    <i className="bi bi-person-circle me-1"></i>
                    About
                    {step > 1 && (
                      <i className="bi bi-check-circle-fill ms-1 text-success"></i>
                    )}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    active={step === 2}
                    style={{
                      cursor: "default",
                      fontWeight: step === 2 ? "bold" : "normal",
                      color:
                        step === 2
                          ? "#0d6efd"
                          : step > 2
                          ? "#198754"
                          : "#6c757d",
                    }}
                  >
                    <i className="bi bi-lock me-1"></i>
                    Account
                    {step > 2 && (
                      <i className="bi bi-check-circle-fill ms-1 text-success"></i>
                    )}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    active={step === 3}
                    style={{
                      cursor: "default",
                      fontWeight: step === 3 ? "bold" : "normal",
                      color: step === 3 ? "#0d6efd" : "#6c757d",
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
                  <AboutForm
                    formData={formData}
                    errors={errors}
                    handleChange={this.handleChange}
                    onNext={this.nextStep}
                  />
                )}

                {/* Step 2: Account */}
                {step === 2 && (
                  <AccountForm
                    formData={formData}
                    errors={errors}
                    handleChange={this.handleChange}
                    onPrevious={this.prevStep}
                    onNext={this.nextStep}
                  />
                )}

                {/* Step 3: Address */}
                {step === 3 && (
                  <AddressForm
                    formData={formData}
                    errors={errors}
                    handleChange={this.handleChange}
                    onPrevious={this.prevStep}
                    onSubmit={this.handleSubmit}
                  />
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
