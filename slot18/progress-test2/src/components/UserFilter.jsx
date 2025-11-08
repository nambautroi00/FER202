import React from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import { useUsers } from '../contexts/UserContext';

const UserFilter = () => {
  const {
    allUsers,
    filters,
    setSearchTerm,
    setRoleFilter,
    setStatusFilter,
    setSort,
    resetFilters,
  } = useUsers();

  const roles = [...new Set(allUsers.map((u) => u.role))];
  const statuses = [...new Set(allUsers.map((u) => u.status))];

  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header as="h5">Bộ lọc, Tìm kiếm & Sắp xếp</Card.Header>
      <Card.Body>
        <Form>
          <Row className="g-3">
            <Col xs={12} lg={4}>
              <Form.Group>
                <Form.Label>Tìm kiếm (ID/Username/FullName)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Search by ID, username or full name"
                  value={filters.searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Form.Group>
            </Col>

            <Col xs={6} md={4} lg={2}>
              <Form.Group>
                <Form.Label>Lọc theo Role</Form.Label>
                <Form.Select
                  value={filters.role}
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <option value="">All Roles</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col xs={6} md={4} lg={2}>
              <Form.Group>
                <Form.Label>Lọc theo Status</Form.Label>
                <Form.Select
                  value={filters.status}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">All Status</option>
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
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
                  <option value="username_asc">Username ascending</option>
                  <option value="username_desc">Username descending</option>
                  <option value="fullName_asc">Full Name ascending</option>
                  <option value="fullName_desc">Full Name descending</option>
                  <option value="role_asc">Role ascending</option>
                  <option value="role_desc">Role descending</option>
                  <option value="status_asc">Status ascending</option>
                  <option value="status_desc">Status descending</option>
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

export default UserFilter;