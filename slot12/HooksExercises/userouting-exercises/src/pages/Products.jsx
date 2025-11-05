import React from 'react';
import { Container, Row, Col, Card, Button, Alert, Badge } from 'react-bootstrap';

function Products() {
  const products = [
    { id: 1, name: 'Laptop Gaming', price: '25,000,000 VNĐ', image: '💻', category: 'Laptop' },
    { id: 2, name: 'Smartphone', price: '15,000,000 VNĐ', image: '📱', category: 'Điện thoại' },
    { id: 3, name: 'Headphone', price: '2,500,000 VNĐ', image: '🎧', category: 'Phụ kiện' },
    { id: 4, name: 'Smart Watch', price: '8,000,000 VNĐ', image: '⌚', category: 'Đồng hồ' }
  ];

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <div className="text-center mb-5">
            <h1 className="display-4 mb-3">🛍️ Sản Phẩm</h1>
            <p className="lead text-muted">
              Khám phá các sản phẩm công nghệ mới nhất
            </p>
          </div>
        </Col>
      </Row>
      
      <Row>
        {products.map(product => (
          <Col key={product.id} md={6} lg={3} className="mb-4">
            <Card className="h-100 shadow-sm border-0">
              <Card.Body className="text-center d-flex flex-column">
                <div className="display-1 mb-3">{product.image}</div>
                <Badge bg="secondary" className="mb-2 align-self-center">
                  {product.category}
                </Badge>
                <Card.Title className="h5">{product.name}</Card.Title>
                <Card.Text className="text-success fw-bold fs-5">
                  {product.price}
                </Card.Text>
                <Button 
                  variant="primary" 
                  size="sm" 
                  className="mt-auto"
                >
                  Thêm vào giỏ
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      
      <Row className="mt-5">
        <Col>
          <Alert variant="info" className="text-center">
            <Alert.Heading>📝 Thông tin thêm</Alert.Heading>
            <p className="mb-0">
              Đây là trang sản phẩm được tạo bằng React Router với Bootstrap. 
              URL hiện tại là <code>/san-pham</code>
            </p>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
}

export default Products;
