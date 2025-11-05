# ✨ Tính năng FilterBar - Tìm kiếm & Lọc phim

## 📋 Tổng quan

Component `FilterBar.jsx` cung cấp các chức năng tìm kiếm, lọc và sắp xếp phim một cách linh hoạt.

## 🎯 Các tính năng

### 1. 🔍 Tìm kiếm theo tên phim
- Tìm kiếm theo tên phim (title)
- Tìm kiếm theo mô tả (description)
- Tìm kiếm không phân biệt hoa thường
- Tìm kiếm theo từ khóa (partial match)

**Cách sử dụng:**
- Nhập tên phim hoặc từ khóa vào ô "Tìm kiếm theo tên"
- Kết quả sẽ được cập nhật ngay lập tức

### 2. 🎭 Lọc theo thể loại
- Lọc phim theo thể loại (genre)
- Hiển thị tất cả thể loại có sẵn trong hệ thống
- Có thể chọn "Tất cả thể loại" để bỏ lọc

**Các thể loại:**
- Sci-Fi
- Comedy
- Drama
- Horror
- Romance
- Action
- Thriller

### 3. ⏱️ Lọc theo thời lượng
- Lọc phim theo khoảng thời lượng
- Các tùy chọn:
  - **Dưới 90 phút**: Phim ngắn
  - **90 - 120 phút**: Phim trung bình
  - **120 - 150 phút**: Phim dài
  - **Trên 150 phút**: Phim rất dài

### 4. 📊 Sắp xếp theo tên phim
- **A → Z (Tăng dần)**: Sắp xếp theo thứ tự bảng chữ cái
- **Z → A (Giảm dần)**: Sắp xếp ngược lại
- **Mặc định**: Giữ nguyên thứ tự ban đầu

### 5. 🔄 Xóa bộ lọc
- Nút "Xóa bộ lọc" để reset tất cả các filter
- Xóa tìm kiếm, thể loại, thời lượng và sắp xếp về mặc định

## 💡 Cách hoạt động

### State Management
FilterBar sử dụng Context API để quản lý state:
- `searchQuery`: Từ khóa tìm kiếm
- `genreFilter`: ID thể loại được chọn
- `durationFilter`: Khoảng thời lượng (dạng "min-max")
- `sortOrder`: Thứ tự sắp xếp ('asc', 'desc', hoặc '')

### Logic lọc và sắp xếp
1. **Lọc theo tên**: Tìm trong `title` và `description`
2. **Lọc theo thể loại**: So sánh `genreId` với filter
3. **Lọc theo thời lượng**: So sánh `duration` với khoảng đã chọn
4. **Sắp xếp**: Sử dụng `localeCompare` để sắp xếp theo tiếng Việt

### Hiển thị kết quả
- Hiển thị số lượng phim: "Hiển thị X / Y phim"
- Hiển thị "(đã lọc)" khi có filter đang áp dụng
- Hiển thị thông báo khi không tìm thấy kết quả

## 📝 Ví dụ sử dụng

### Tìm kiếm phim "Galactic"
1. Nhập "Galactic" vào ô tìm kiếm
2. Kết quả sẽ hiển thị phim "Galactic Wars"

### Lọc phim Sci-Fi
1. Chọn "Sci-Fi" trong dropdown thể loại
2. Chỉ hiển thị các phim thuộc thể loại Sci-Fi

### Tìm phim dưới 90 phút
1. Chọn "Dưới 90 phút" trong dropdown thời lượng
2. Chỉ hiển thị các phim có thời lượng < 90 phút

### Sắp xếp A → Z
1. Chọn "A → Z (Tăng dần)" trong dropdown sắp xếp
2. Danh sách phim được sắp xếp theo bảng chữ cái

### Kết hợp nhiều filter
- Tìm kiếm: "War"
- Thể loại: "Sci-Fi"
- Thời lượng: "90 - 120 phút"
- Sắp xếp: "A → Z"
→ Kết quả: Phim Sci-Fi có chứa "War", thời lượng 90-120 phút, sắp xếp A-Z

## 🔧 Cấu trúc Component

```jsx
<FilterBar />
  ├── Tìm kiếm theo tên (Input)
  ├── Lọc theo thể loại (Select)
  ├── Lọc theo thời lượng (Select)
  ├── Sắp xếp (Select)
  └── Nút Reset (Button)
```

## 📍 Vị trí trong ứng dụng

FilterBar được đặt trong `MovieManager.jsx`, giữa tiêu đề "Danh sách Phim" và `MovieTable`:

```
MovieManager
  ├── MovieForm
  ├── "Danh sách Phim"
  ├── FilterBar ← Vị trí này
  └── MovieTable
```

## 🎨 UI/UX

- Sử dụng React Bootstrap để có giao diện đẹp và responsive
- Layout responsive với grid system (Col md={...})
- Hiển thị thông tin filter đang áp dụng
- Màu sắc và icon trực quan
- Xử lý trường hợp không có kết quả

