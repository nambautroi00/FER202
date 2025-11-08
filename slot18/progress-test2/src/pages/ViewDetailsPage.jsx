import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Alert, Spinner, Row, Col } from 'react-bootstrap';
import { usePayments } from '../contexts/PaymentContext';
import NavigationHeader from '../components/NavigationHeader';

const ViewDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allPayments, loading } = usePayments();
  const [payment, setPayment] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (allPayments.length > 0) {
      const foundPayment = allPayments.find(p => p.id === id);
      if (foundPayment) {
        setPayment(foundPayment);
      } else {
        setNotFound(true);
      }
    }
  }, [id, allPayments]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' VNĐ';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <>
        <NavigationHeader />
        <Container className="mt-4">
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        </Container>
      </>
    );
  }

  if (notFound || !payment) {
    return (
      <>
        <NavigationHeader />
        <Container className="mt-4">
          <Alert variant="danger">
            <Alert.Heading>Payment Not Found</Alert.Heading>
            <p>The payment with ID {id} was not found.</p>
            <Button variant="primary" onClick={() => navigate('/home')}>
              Back to Dashboard
            </Button>
          </Alert>
        </Container>
      </>
    );
  }

  return (
    <>
      <NavigationHeader />
      <Container className="mt-4">
        <Button variant="secondary" onClick={() => navigate('/home')} className="mb-3">
          ← Back to Dashboard
        </Button>

        <Card className="shadow-sm">
          <Card.Header as="h4">Payment Details</Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <div className="mb-3">
                  <strong>Payment ID:</strong>
                  <p className="text-muted">{payment.id}</p>
                </div>

                <div className="mb-3">
                  <strong>Semester:</strong>
                  <p className="text-muted">{payment.semester}</p>
                </div>

                <div className="mb-3">
                  <strong>Course Name:</strong>
                  <p className="text-muted">{payment.courseName}</p>
                </div>
              </Col>

              <Col md={6}>
                <div className="mb-3">
                  <strong>Amount:</strong>
                  <p className="text-primary fs-5">{formatCurrency(payment.amount)}</p>
                </div>

                <div className="mb-3">
                  <strong>Payment Date:</strong>
                  <p className="text-muted">{formatDate(payment.date)}</p>
                </div>

                <div className="mb-3">
                  <strong>User ID:</strong>
                  <p className="text-muted">{payment.userId}</p>
                </div>
              </Col>
            </Row>

            <div className="mt-4 d-flex gap-2">
              <Button
                variant="warning"
                onClick={() => navigate(`/payment/edit/${payment.id}`)}
              >
                Edit Payment
              </Button>
              <Button variant="secondary" onClick={() => navigate('/home')}>
                Back to List
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default ViewDetailsPage;

