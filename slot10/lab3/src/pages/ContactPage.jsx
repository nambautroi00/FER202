import React from "react";
import { Container, Card, Row, Col, Form, Button } from "react-bootstrap";

class ContactPage extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
  };

  render() {
    return (
      <Container className="mt-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="shadow">
              <Card.Body>
                <h2 className="text-center mb-4">
                  <i className="bi bi-envelope-fill me-2"></i>
                  Contact Us
                </h2>
                <p className="text-center text-muted mb-4">
                  Have questions? We'd love to hear from you!
                </p>
                
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="Enter your name" 
                      required 
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                      type="email" 
                      placeholder="Enter your email" 
                      required 
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control 
                      type="text" 
                      placeholder="Subject" 
                      required 
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={5} 
                      placeholder="Your message..." 
                      required 
                    />
                  </Form.Group>

                  <div className="d-grid">
                    <Button variant="primary" type="submit" size="lg">
                      <i className="bi bi-send-fill me-2"></i>
                      Send Message
                    </Button>
                  </div>
                </Form>

                <hr className="mt-4" />
                
                <div className="text-center">
                  <h5>Other Ways to Reach Us</h5>
                  <p>
                    <i className="bi bi-envelope me-2"></i>
                    nampnde180445@fpt.edu.vn
                  </p>
                  <p>
                    <i className="bi bi-telephone me-2"></i>
                    +84 123 456 789
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ContactPage;

