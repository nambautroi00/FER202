import React from "react";
import { Card, Form, Row, Col } from "react-bootstrap";
import "./Filter.css";

export default function Filter({ 
  searchTerm, 
  setSearchTerm, 
  yearFilter, 
  setYearFilter, 
  sortBy, 
  setSortBy 
}) {
  return (
    <Card className="filter-card mb-4 shadow-sm">
      <Card.Body>
        <h5 className="mb-3">
          <i className="bi bi-funnel-fill me-2"></i>
          Filter & Search
        </h5>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>
                <i className="bi bi-search me-2"></i>
                Search
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Search by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
          </Col>
          
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>
                <i className="bi bi-calendar-range me-2"></i>
                Filter by Year
              </Form.Label>
              <Form.Select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
              >
                <option value="all">All Years</option>
                <option value="<=2000">2000 and earlier</option>
                <option value="2001-2015">2001 - 2015</option>
                <option value=">2015">After 2015</option>
              </Form.Select>
            </Form.Group>
          </Col>
          
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>
                <i className="bi bi-sort-down me-2"></i>
                Sort By
              </Form.Label>
              <Form.Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">No Sorting</option>
                <option value="year-asc">Year ↑ (Oldest First)</option>
                <option value="year-desc">Year ↓ (Newest First)</option>
                <option value="title-asc">Title A→Z</option>
                <option value="title-desc">Title Z→A</option>
                <option value="duration-asc">Duration ↑ (Shortest)</option>
                <option value="duration-desc">Duration ↓ (Longest)</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

