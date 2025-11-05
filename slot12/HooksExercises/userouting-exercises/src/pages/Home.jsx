import React from 'react';
import { Card, Container, Row, Col, ListGroup, Badge } from 'react-bootstrap';

function Home() {
  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm">
            <Card.Body className="text-center">
              <Card.Title className="display-4 text-primary mb-4">
                🏠 Trang Chủ
              </Card.Title>
              <Card.Text className="lead mb-4">
                Chào mừng bạn đến với ứng dụng React Router!
              </Card.Text>
              <Card.Text className="mb-4">
                Đây là trang chủ của ứng dụng. Bạn có thể điều hướng đến các trang khác 
                bằng cách sử dụng thanh điều hướng ở trên.
              </Card.Text>
              
              <div className="mt-4">
                <h5 className="mb-3">✨ Tính năng:</h5>
                <ListGroup variant="flush">
                  <ListGroup.Item className="d-flex align-items-center">
                    <Badge bg="success" className="me-2">✓</Badge>
                    Điều hướng không tải lại trang
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex align-items-center">
                    <Badge bg="success" className="me-2">✓</Badge>
                    Highlight trang hiện tại
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex align-items-center">
                    <Badge bg="success" className="me-2">✓</Badge>
                    URL thay đổi theo điều hướng
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex align-items-center">
                    <Badge bg="success" className="me-2">✓</Badge>
                    Responsive design với Bootstrap
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
