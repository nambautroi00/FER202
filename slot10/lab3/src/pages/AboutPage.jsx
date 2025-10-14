import { Container, Card, Row, Col } from "react-bootstrap";

export default function AboutPage() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow">
            <Card.Body>
              <h2 className="text-center mb-4">
                <i className="bi bi-info-circle-fill me-2"></i>
                About Movie Management
              </h2>
              <p className="lead">
                Welcome to our Movie Management System - your one-stop solution for organizing 
                and discovering amazing movies!
              </p>
              <hr />
              <h5 className="mt-4">Features:</h5>
              <ul>
                <li>Browse extensive movie collection</li>
                <li>Search and filter by various criteria</li>
                <li>Add movies to your favourites</li>
                <li>View detailed information about each movie</li>
                <li>Manage your profile and preferences</li>
              </ul>
              <h5 className="mt-4">Technology Stack:</h5>
              <p>Built with React and Bootstrap for a modern, responsive experience.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

