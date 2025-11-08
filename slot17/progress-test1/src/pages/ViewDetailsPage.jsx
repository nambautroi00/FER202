/**
 * FILE: ViewDetailsPage.jsx
 * MỤC ĐÍCH: Trang xem chi tiết payment
 * 
 * CÁCH HOẠT ĐỘNG:
 * - Trang hiển thị chi tiết đầy đủ của một payment
 * - Lấy payment ID từ URL params (:id)
 * - Tìm payment trong allPayments từ PaymentContext
 * - Hiển thị thông tin: ID, semester, course, amount, date, userId
 * - Có nút "Edit Payment" để chuyển sang trang sửa
 * - Có nút "Back to Dashboard" để quay về trang chính
 * 
 * ROUTE: /payment/:id (protected, cần authentication)
 * 
 * STATE:
 * - payment: Payment object được tìm thấy
 * - notFound: Boolean - payment không tồn tại
 * 
 * LƯU Ý:
 * - Chỉ hiển thị payments của user hiện tại (đã được filter trong PaymentContext)
 * - Nếu không tìm thấy → hiển thị thông báo lỗi
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Alert, Spinner, Row, Col } from 'react-bootstrap';
import { usePayments } from '../contexts/PaymentContext';
import NavigationHeader from '../components/NavigationHeader';

const ViewDetailsPage = () => {
  // Lấy payment ID từ URL params
  // Ví dụ: /payment/123 → id = "123"
  const { id } = useParams();
  
  // Hook để navigate đến route khác
  const navigate = useNavigate();
  
  // Lấy allPayments và loading từ PaymentContext
  // allPayments: danh sách payments của user hiện tại (chưa filter)
  const { allPayments, loading } = usePayments();
  
  // State để lưu payment được tìm thấy
  const [payment, setPayment] = useState(null);
  
  // State để đánh dấu không tìm thấy payment
  const [notFound, setNotFound] = useState(false);

  /**
   * useEffect: Tìm payment theo ID khi component mount hoặc id/allPayments thay đổi
   * 
   * LUỒNG:
   * 1. Khi allPayments được load xong (length > 0)
   * 2. Tìm payment có id khớp với id từ URL
   * 3. Nếu tìm thấy → setPayment
   * 4. Nếu không tìm thấy → setNotFound = true
   */
  useEffect(() => {
    if (allPayments.length > 0) {
      // Tìm payment có id khớp
      const foundPayment = allPayments.find(p => p.id === id);
      
      if (foundPayment) {
        setPayment(foundPayment);
      } else {
        // Không tìm thấy → đánh dấu notFound
        setNotFound(true);
      }
    }
  }, [id, allPayments]);

  /**
   * Format số tiền theo định dạng Việt Nam
   * @param {number} amount - Số tiền
   * @returns {string} Số tiền đã format (ví dụ: "3.000.000 VNĐ")
   */
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' VNĐ';
  };

  /**
   * Format ngày theo định dạng Việt Nam
   * @param {string} dateString - Ngày dạng string (YYYY-MM-DD)
   * @returns {string} Ngày đã format (ví dụ: "5 tháng 11, 2025")
   */
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Hiển thị loading spinner khi đang tải dữ liệu
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

  // Hiển thị thông báo lỗi nếu không tìm thấy payment
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

  // Hiển thị chi tiết payment
  return (
    <>
      <NavigationHeader />
      <Container className="mt-4">
        {/* Nút quay về dashboard */}
        <Button variant="secondary" onClick={() => navigate('/home')} className="mb-3">
          ← Back to Dashboard
        </Button>

        {/* Card hiển thị chi tiết payment */}
        <Card className="shadow-sm">
          <Card.Header as="h4">Payment Details</Card.Header>
          <Card.Body>
            <Row>
              {/* Cột trái: ID, Semester, Course */}
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

              {/* Cột phải: Amount, Date, User ID */}
              <Col md={6}>
                <div className="mb-3">
                  <strong>Amount:</strong>
                  {/* Format số tiền với màu primary và font size lớn */}
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

            {/* Các nút action */}
            <div className="mt-4 d-flex gap-2">
              {/* Nút sửa payment → chuyển đến trang edit */}
              <Button
                variant="warning"
                onClick={() => navigate(`/payment/edit/${payment.id}`)}
              >
                Edit Payment
              </Button>
              
              {/* Nút quay về danh sách */}
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

