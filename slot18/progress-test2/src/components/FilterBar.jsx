import React from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import { usePayments } from '../contexts/PaymentContext';

const FilterBar = () => {
  const {
    allPayments,
    filters,
    setSearchTerm,
    setSemesterFilter,
    setCourseFilter,
    setSort,
    resetFilters,
  } = usePayments();

  // Lấy danh sách unique semesters và courses
  const semesters = [...new Set(allPayments.map((p) => p.semester))];
  const courses = [...new Set(allPayments.map((p) => p.courseName))];

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header as="h5">Bộ lọc, Tìm kiếm & Sắp xếp</Card.Header>
      <Card.Body>
        <Form>
          <Row className="g-3">
            <Col xs={12} lg={4}>
              <Form.Group>
                <Form.Label>Tìm kiếm (Semester/Course)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search by semester or course name"
                  value={filters.searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col xs={6} md={4} lg={2}>
              <Form.Group>
                <Form.Label>Lọc theo Semester</Form.Label>
                <Form.Select
                  value={filters.semester}
                  onChange={(e) => setSemesterFilter(e.target.value)}
                >
                  <option value="">All Semesters</option>
                  {semesters.map((sem) => (
                    <option key={sem} value={sem}>
                      {sem}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={6} md={4} lg={2}>
              <Form.Group>
                <Form.Label>Lọc theo Course</Form.Label>
                <Form.Select
                  value={filters.course}
                  onChange={(e) => setCourseFilter(e.target.value)}
                >
                  <option value="">All Courses</option>
                  {courses.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={12} md={4} lg={3}>
              <Form.Group>
                <Form.Label>Sắp xếp theo:</Form.Label>
                <Form.Select
                  value={filters.sortBy}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="course_asc">Course name ascending</option>
                  <option value="course_desc">Course name descending</option>
                  <option value="date_asc">Date ascending</option>
                  <option value="date_desc">Date descending</option>
                  <option value="amount_asc">Amount ascending</option>
                  <option value="amount_desc">Amount descending</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={12} md={4} lg={1}>
              <Form.Group>
                <Form.Label>&nbsp;</Form.Label>
                <Button
                  variant="outline-secondary"
                  className="w-100"
                  onClick={resetFilters}
                >
                  Reset
                </Button>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default FilterBar;