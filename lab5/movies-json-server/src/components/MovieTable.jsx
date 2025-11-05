import React from 'react';
import { Table, Button, Image, Modal, Alert, Spinner, Badge } from 'react-bootstrap';
import { useMovieState, useMovieDispatch } from '../contexts/MovieContext';
import { useAuthState } from '../contexts/AuthContext';
import { isAdmin } from '../utils/authUtils';

const MovieTable = () => {
  const state = useMovieState();
  // Lấy confirmDelete từ Context (chứa logic xóa phim)
  const { dispatch, confirmDelete } = useMovieDispatch(); 
  const { user } = useAuthState();
  
  const { movies, genres, loading, movieToDelete, showDeleteModal, movieToView, showDetailModal, searchQuery, genreFilter, durationFilter, sortOrder } = state;

  // Kiểm tra quyền admin
  const userIsAdmin = isAdmin(user);

  // Tạo genre map từ dữ liệu API
  const genreMap = genres.reduce((map, genre) => {
    map[genre.id] = genre.name;
    return map;
  }, {});

  // Hàm lọc và sắp xếp phim
  const getFilteredAndSortedMovies = () => {
    let filtered = [...movies];

    // Lọc theo tên phim (tìm kiếm)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(movie => 
        movie.title.toLowerCase().includes(query) ||
        movie.description?.toLowerCase().includes(query)
      );
    }

    // Lọc theo thể loại
    if (genreFilter) {
      filtered = filtered.filter(movie => 
        movie.genreId === parseInt(genreFilter)
      );
    }

    // Lọc theo thời lượng
    if (durationFilter) {
      const [min, max] = durationFilter.split('-').map(Number);
      filtered = filtered.filter(movie => {
        const duration = movie.duration || 0;
        if (max === 999) {
          return duration >= min;
        }
        return duration >= min && duration <= max;
      });
    }

    // Sắp xếp theo tên phim
    if (sortOrder === 'asc') {
      filtered.sort((a, b) => a.title.localeCompare(b.title, 'vi', { sensitivity: 'base' }));
    } else if (sortOrder === 'desc') {
      filtered.sort((a, b) => b.title.localeCompare(a.title, 'vi', { sensitivity: 'base' }));
    }

    return filtered;
  };

  const filteredMovies = getFilteredAndSortedMovies();

  // Hàm để lấy màu badge theo danh mục
  const getCategoryBadgeVariant = (genreName) => {
    const categoryColors = {
      'Sci-Fi': 'primary',
      'Comedy': 'warning',
      'Drama': 'info', 
      'Horror': 'dark',
      'Romance': 'danger',
      'Action': 'success',
      'Thriller': 'secondary'
    };
    return categoryColors[genreName] || 'secondary';
  };

  const handleEditClick = (movie) => {
      // Mở Modal Sửa và gán dữ liệu vào state
      dispatch({ type: 'OPEN_EDIT_MODAL', payload: movie });
  };
  
  const handleDeleteClick = (movie) => {
      // Mở Modal Xác nhận Xóa và gán phim vào movieToDelete
      dispatch({ type: 'OPEN_DELETE_MODAL', payload: movie });
  };

  const handleViewDetailClick = (movie) => {
      // Mở Modal Chi tiết và gán phim vào movieToView
      dispatch({ type: 'OPEN_DETAIL_MODAL', payload: movie });
  };

  return (
    <>
      {loading && movies.length === 0 ? (
          <div className="text-center my-4">
              <Spinner animation="border" role="status" variant="primary" className="me-2" />
              <Alert variant="info" className="mt-3">Đang tải dữ liệu phim...</Alert>
          </div>
      ) : (
        <>
          {/* Hiển thị số lượng kết quả */}
          <div className="mb-2">
            <small className="text-muted">
              Hiển thị <strong>{filteredMovies.length}</strong> / <strong>{movies.length}</strong> phim
              {(searchQuery || genreFilter || durationFilter || sortOrder) && (
                <span className="ms-2 text-primary">(đã lọc)</span>
              )}
            </small>
          </div>

          {filteredMovies.length === 0 ? (
            <Alert variant="warning" className="mt-3">
              Không tìm thấy phim nào phù hợp với bộ lọc của bạn.
            </Alert>
          ) : (
            <Table striped bordered hover responsive className="mt-2">
              <thead>
                <tr>
                  <th>Avatar</th>
                  <th>ID</th>
                  <th>Tên Phim</th>
                  <th>Danh mục</th>
                  <th>Thời lượng (phút)</th>
                  <th>Năm</th>
                  <th>Quốc gia</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredMovies.map((movie, index) => {
              const genreName = genreMap[movie.genreId] || 'Unknown';
              return (
                <tr key={movie.id}>
                  <td>
                    <Image 
                      src={movie.avatar || movie.poster || 'https://via.placeholder.com/50'} 
                      alt={movie.title} 
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                      rounded 
                    />
                  </td>
                  <td>#{movie.id}</td>
                  <td>
                    <strong>{movie.title}</strong>
                    <br />
                    <small className="text-muted">{movie.description?.substring(0, 50)}...</small>
                  </td>
                  <td>
                    <Badge bg={getCategoryBadgeVariant(genreName)}>
                      {genreName}
                    </Badge>
                  </td>
                  <td>{movie.duration} phút</td>
                  <td>{movie.year}</td>
                  <td>{movie.country}</td>
                  <td>
                    <div className="d-flex gap-1 flex-wrap">
                      {/* Nút Xem chi tiết - cho tất cả user */}
                      <Button 
                        variant="info" 
                        size="sm" 
                        onClick={() => handleViewDetailClick(movie)}
                        className="me-1"
                      >
                        👁️ Chi tiết
                      </Button>
                      {/* Nút Sửa/Xóa - chỉ cho admin */}
                      {userIsAdmin && (
                        <>
                          <Button 
                            variant="primary" 
                            size="sm" 
                            onClick={() => handleEditClick(movie)}
                            className="me-1"
                          >
                            ✏️ Sửa
                          </Button>
                          <Button 
                            variant="danger" 
                            size="sm" 
                            onClick={() => handleDeleteClick(movie)}
                          >
                            🗑️ Xóa
                          </Button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              );
                })}
              </tbody>
            </Table>
          )}
        </>
      )}

      {/* MODAL CHI TIẾT PHIM */}
      {movieToView && (
        <Modal show={showDetailModal} onHide={() => dispatch({ type: 'CLOSE_DETAIL_MODAL' })} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>📽️ Chi tiết Phim</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-md-4 text-center mb-3">
                <Image 
                  src={movieToView.avatar || movieToView.poster || 'https://via.placeholder.com/300x400'} 
                  alt={movieToView.title}
                  fluid
                  rounded
                  style={{ maxHeight: '400px', objectFit: 'cover' }}
                />
              </div>
              <div className="col-md-8">
                <h3 className="mb-3">{movieToView.title}</h3>
                
                <div className="mb-3">
                  <strong>Thể loại:</strong>{' '}
                  <Badge bg={getCategoryBadgeVariant(genreMap[movieToView.genreId] || 'Unknown')}>
                    {genreMap[movieToView.genreId] || 'Unknown'}
                  </Badge>
                </div>

                <div className="mb-3">
                  <strong>Mô tả:</strong>
                  <p className="mt-2">{movieToView.description || 'Không có mô tả'}</p>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <strong>Năm phát hành:</strong> {movieToView.year || 'N/A'}
                  </div>
                  <div className="col-md-6">
                    <strong>Quốc gia:</strong> {movieToView.country || 'N/A'}
                  </div>
                </div>

                <div className="mb-3">
                  <strong>Thời lượng:</strong> {movieToView.duration || 0} phút
                </div>

                <div className="mb-3">
                  <strong>ID Phim:</strong> #{movieToView.id}
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => dispatch({ type: 'CLOSE_DETAIL_MODAL' })}>
              Đóng
            </Button>
            {userIsAdmin && (
              <>
                <Button 
                  variant="primary" 
                  onClick={() => {
                    dispatch({ type: 'CLOSE_DETAIL_MODAL' });
                    handleEditClick(movieToView);
                  }}
                >
                  ✏️ Chỉnh sửa
                </Button>
              </>
            )}
          </Modal.Footer>
        </Modal>
      )}

      {/* MODAL XÁC NHẬN XÓA */}
      <Modal show={showDeleteModal} onHide={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận Xóa Phim</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có chắc chắn muốn xóa phim <strong>"{movieToDelete?.title}"</strong> (ID: {movieToDelete?.id}) không?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => dispatch({ type: 'CLOSE_DELETE_MODAL' })}>
            Hủy bỏ
          </Button>
          <Button variant="danger" onClick={() => confirmDelete(movieToDelete.id)}>
            Xác nhận Xóa
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MovieTable;

