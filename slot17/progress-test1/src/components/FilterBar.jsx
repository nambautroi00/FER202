/**
 * FILE: FilterBar.jsx
 * MỤC ĐÍCH: Component bộ lọc và tìm kiếm payments
 * 
 * CÁCH HOẠT ĐỘNG:
 * - Hiển thị các controls để filter và sort payments
 * - Tìm kiếm: text input để tìm trong semester và courseName
 * - Filter theo Semester: dropdown với danh sách semesters unique
 * - Filter theo Course: dropdown với danh sách courses unique
 * - Sort: dropdown để chọn cách sắp xếp (course/date/amount, asc/desc)
 * - Reset: nút để reset tất cả filters về mặc định
 * 
 * LUỒNG XỬ LÝ:
 * 1. User thay đổi filter → gọi function từ PaymentContext
 * 2. PaymentContext dispatch action → cập nhật state.filters
 * 3. useEffect trong PaymentContext detect filters thay đổi
 * 4. Gọi applyFilters() → filter và sort lại payments
 * 5. Cập nhật filteredPayments → PaymentTable tự động re-render
 * 
 * TỰ ĐỘNG LẤY OPTIONS:
 * - Semesters và Courses được lấy từ allPayments
 * - Sử dụng Set để loại bỏ duplicates
 * - Tự động cập nhật khi payments thay đổi
 */

import React from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import { usePayments } from '../contexts/PaymentContext';

const FilterBar = () => {
  // Lấy data và functions từ PaymentContext
  const {
    allPayments,        // Tất cả payments của user (để lấy unique values)
    filters,            // Filters hiện tại
    setSearchTerm,      // Function cập nhật search term
    setSemesterFilter,  // Function cập nhật semester filter
    setCourseFilter,    // Function cập nhật course filter
    setSort,            // Function cập nhật sort
    resetFilters,       // Function reset tất cả filters
  } = usePayments();

  /**
   * Lấy danh sách unique semesters từ allPayments
   * - Map qua allPayments để lấy semester của mỗi payment
   * - Sử dụng Set để loại bỏ duplicates
   * - Convert Set về Array
   */
  const semesters = [...new Set(allPayments.map((p) => p.semester))];
  
  /**
   * Lấy danh sách unique courses từ allPayments
   * - Map qua allPayments để lấy courseName của mỗi payment
   * - Sử dụng Set để loại bỏ duplicates
   * - Convert Set về Array
   */
  const courses = [...new Set(allPayments.map((p) => p.courseName))];

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header as="h5">Bộ lọc, Tìm kiếm & Sắp xếp</Card.Header>
      <Card.Body>
        <Form>
          <Row className="g-3">
            {/* Tìm kiếm: Text input */}
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

            {/* Filter theo Semester: Dropdown */}
            <Col xs={6} md={4} lg={2}>
              <Form.Group>
                <Form.Label>Lọc theo Semester</Form.Label>
                <Form.Select
                  value={filters.semester}
                  onChange={(e) => setSemesterFilter(e.target.value)}
                >
                  <option value="">All Semesters</option>
                  {/* Render các option từ danh sách semesters unique */}
                  {semesters.map((sem) => (
                    <option key={sem} value={sem}>
                      {sem}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Filter theo Course: Dropdown */}
            <Col xs={6} md={4} lg={2}>
              <Form.Group>
                <Form.Label>Lọc theo Course</Form.Label>
                <Form.Select
                  value={filters.course}
                  onChange={(e) => setCourseFilter(e.target.value)}
                >
                  <option value="">All Courses</option>
                  {/* Render các option từ danh sách courses unique */}
                  {courses.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Sort: Dropdown chọn cách sắp xếp */}
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

            {/* Nút Reset: Reset tất cả filters về mặc định */}
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