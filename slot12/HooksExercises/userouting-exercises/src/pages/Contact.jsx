import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, ListGroup } from 'react-bootstrap';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.');
    setFormData({ name: '', email: '', message: '' });
  };

  const contactInfo = [
    { icon: '📧', label: 'Email', value: 'contact@example.com' },
    { icon: '📞', label: 'Điện thoại', value: '+84 123 456 789' },
    { icon: '📍', label: 'Địa chỉ', value: '123 Đường ABC, Quận XYZ, TP.HCM' }
  ];

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={10}>
          <div className="text-center mb-5">
            <h1 className="display-4 mb-3">📞 Liên Hệ</h1>
            <p className="lead text-muted">
              Chúng tôi rất mong nhận được phản hồi từ bạn
            </p>
          </div>
          
          <Row>
            <Col md={6} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Header className="bg-primary text-white">
                  <h5 className="mb-0">📧 Thông tin liên hệ</h5>
                </Card.Header>
                <Card.Body>
                  <ListGroup variant="flush">
                    {contactInfo.map((info, index) => (
                      <ListGroup.Item key={index} className="d-flex align-items-center">
                        <span className="me-3 fs-4">{info.icon}</span>
                        <div>
                          <strong>{info.label}:</strong><br />
                          <span className="text-muted">{info.value}</span>
                        </div>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6}>
              <Card className="shadow-sm">
                <Card.Header className="bg-success text-white">
                  <h5 className="mb-0">💬 Gửi tin nhắn</h5>
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Họ và tên</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Nhập họ và tên của bạn"
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Nhập email của bạn"
                      />
                    </Form.Group>
                    
                    <Form.Group className="mb-3">
                      <Form.Label>Tin nhắn</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder="Nhập tin nhắn của bạn"
                      />
                    </Form.Group>
                    
                    <Button 
                      type="submit" 
                      variant="primary" 
                      size="lg" 
                      className="w-100"
                    >
                      Gửi tin nhắn
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          
          <Row className="mt-4">
            <Col>
              <Alert variant="success" className="text-center">
                <Alert.Heading>🎯 Thông tin về trang này</Alert.Heading>
                <p className="mb-0">
                  URL hiện tại: <code>/lien-he</code> | 
                  Đây là trang liên hệ được tạo bằng React Router với Bootstrap
                </p>
              </Alert>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;
