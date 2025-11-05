import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';

const FilterBar = () => {
  const state = useMovieState();
  const { dispatch } = useMovieDispatch();
  const { searchQuery, genreFilter, durationFilter, sortOrder, genres } = state;

  const handleSearchChange = (e) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value });
  };

  const handleGenreChange = (e) => {
    dispatch({ type: 'SET_GENRE_FILTER', payload: e.target.value });
  };

  const handleDurationChange = (e) => {
    dispatch({ type: 'SET_DURATION_FILTER', payload: e.target.value });
  };

  const handleSortChange = (e) => {
    dispatch({ type: 'SET_SORT_ORDER', payload: e.target.value });
  };

  const handleResetFilters = () => {
    dispatch({ type: 'RESET_FILTERS' });
  };

  return (
    <div className="mb-4 p-3 border rounded bg-light">
      <h5 className="mb-3">🔍 Tìm kiếm & Lọc phim</h5>
      
      <Row className="g-3">
        {/* Tìm kiếm theo tên */}
        <Col md={3}>
          <Form.Group>
            <Form.Label>Tìm kiếm theo tên</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tên phim..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Form.Group>
        </Col>

        {/* Lọc theo thể loại */}
        <Col md={2}>
          <Form.Group>
            <Form.Label>Thể loại</Form.Label>
            <Form.Select
              value={genreFilter}
              onChange={handleGenreChange}
            >
              <option value="">Tất cả thể loại</option>
              {genres.map((genre) => (
                <option key={genre.id} value={genre.id}>
                  {genre.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        {/* Lọc theo thời lượng */}
        <Col md={2}>
          <Form.Group>
            <Form.Label>Thời lượng (phút)</Form.Label>
            <Form.Select
              value={durationFilter}
              onChange={handleDurationChange}
            >
              <option value="">Tất cả</option>
              <option value="0-90">Dưới 90 phút</option>
              <option value="90-120">90 - 120 phút</option>
              <option value="120-150">120 - 150 phút</option>
              <option value="150-999">Trên 150 phút</option>
            </Form.Select>
          </Form.Group>
        </Col>

        {/* Sắp xếp */}
        <Col md={2}>
          <Form.Group>
            <Form.Label>Sắp xếp theo tên</Form.Label>
            <Form.Select
              value={sortOrder}
              onChange={handleSortChange}
            >
              <option value="">Mặc định</option>
              <option value="asc">A → Z (Tăng dần)</option>
              <option value="desc">Z → A (Giảm dần)</option>
            </Form.Select>
          </Form.Group>
        </Col>

        {/* Nút Reset */}
        <Col md={3}>
          <Form.Group>
            <Form.Label>&nbsp;</Form.Label>
            <div>
              <Button 
                variant="outline-secondary" 
                onClick={handleResetFilters}
                className="w-100"
              >
                🔄 Xóa bộ lọc
              </Button>
            </div>
          </Form.Group>
        </Col>
      </Row>

      {/* Hiển thị thông tin filter đang áp dụng */}
      {(searchQuery || genreFilter || durationFilter || sortOrder) && (
        <Row className="mt-2">
          <Col>
            <small className="text-muted">
              <strong>Đang áp dụng:</strong>
              {searchQuery && <span className="ms-2">Tìm kiếm: "{searchQuery}"</span>}
              {genreFilter && (
                <span className="ms-2">
                  Thể loại: {genres.find(g => g.id === parseInt(genreFilter))?.name || genreFilter}
                </span>
              )}
              {durationFilter && <span className="ms-2">Thời lượng: {durationFilter}</span>}
              {sortOrder && (
                <span className="ms-2">
                  Sắp xếp: {sortOrder === 'asc' ? 'A → Z' : 'Z → A'}
                </span>
              )}
            </small>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default FilterBar;

