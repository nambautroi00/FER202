# 🎬 Movies JSON Server - Client-Server Communication

Ứng dụng quản lý phim sử dụng React, React Bootstrap, Axios và json-server để thực hiện các thao tác CRUD.

## 📋 Tính năng

- ✅ Đăng nhập/Đăng xuất (Authentication)
- ✅ Hiển thị thông tin người dùng trong Header
- ✅ Quản lý phim (CRUD):
  - 📝 Thêm phim mới
  - 📖 Xem danh sách phim
  - ✏️ Chỉnh sửa phim
  - 🗑️ Xóa phim
- ✅ Sử dụng Context API + useReducer để quản lý state
- ✅ Sử dụng Axios để giao tiếp với API
- ✅ Protected Routes (Bảo vệ các route cần đăng nhập)

## 🚀 Cài đặt và Chạy

### Bước 1: Cài đặt dependencies

```bash
npm install
```

### Bước 2: Cài đặt json-server (toàn cục)

```bash
npm install -g json-server
```

### Bước 3: Chạy json-server

Mở một terminal mới và chạy:

```bash
json-server --watch db.json --port 3001
```

Bạn sẽ thấy thông báo:
```
\{^_^}/ hi!

  Loading db.json
  Done

  Resources
  http://localhost:3001/movies
  http://localhost:3001/genres
  http://localhost:3001/accounts

  Home
  http://localhost:3001
```

### Bước 4: Chạy ứng dụng React

Trong một terminal khác, chạy:

```bash
npm start
```

Ứng dụng sẽ mở tại `http://localhost:3000`

## 👤 Thông tin đăng nhập

Có 3 tài khoản mặc định:

1. **Admin**
   - Username: `admin`
   - Password: `admin123`

2. **User 1**
   - Username: `user1`
   - Password: `user123`

3. **Test User**
   - Username: `test`
   - Password: `test123`

## 📁 Cấu trúc Dự án

```
movies-json-server/
├── db.json                    # Dữ liệu giả lập (genres, movies, accounts)
├── src/
│   ├── api/
│   │   └── movieAPI.js        # Cấu hình Axios instance
│   ├── components/
│   │   ├── Header.jsx         # Header với thông tin đăng nhập
│   │   ├── Login.jsx          # Form đăng nhập
│   │   ├── MovieForm.jsx      # Form thêm/sửa phim
│   │   ├── MovieTable.jsx     # Bảng danh sách phim
│   │   └── ProtectedRoute.jsx # Component bảo vệ route
│   ├── contexts/
│   │   ├── AuthContext.jsx    # Context quản lý authentication
│   │   └── MovieContext.jsx  # Context quản lý movies CRUD
│   ├── pages/
│   │   ├── LoginPage.jsx      # Trang đăng nhập
│   │   └── MovieManager.jsx   # Trang quản lý phim
│   ├── reducers/
│   │   ├── authReducers.jsx   # Reducer cho authentication
│   │   └── movieReducers.jsx # Reducer cho movies
│   ├── App.js                 # Component chính với routing
│   └── index.js               # Entry point
```

## 🔧 Công nghệ sử dụng

- **React** - UI Framework
- **React Router DOM** - Routing
- **React Bootstrap** - UI Components
- **Bootstrap** - CSS Framework
- **Axios** - HTTP Client
- **json-server** - REST API Mock Server
- **Context API** - State Management
- **useReducer** - State Management Hook

## 📝 API Endpoints

json-server tự động tạo các endpoint sau:

- `GET /movies` - Lấy danh sách phim
- `GET /movies/:id` - Lấy chi tiết phim
- `POST /movies` - Thêm phim mới
- `PUT /movies/:id` - Cập nhật phim
- `DELETE /movies/:id` - Xóa phim
- `GET /genres` - Lấy danh sách thể loại
- `GET /accounts` - Lấy danh sách tài khoản

## 🎯 Cách sử dụng

1. **Đăng nhập**: Sử dụng một trong các tài khoản ở trên
2. **Xem danh sách phim**: Sau khi đăng nhập, bạn sẽ thấy danh sách phim
3. **Thêm phim**: Điền form "Thêm Phim Mới" và nhấn "Thêm Phim"
4. **Sửa phim**: Nhấn nút "Sửa" trên bảng, chỉnh sửa và lưu
5. **Xóa phim**: Nhấn nút "Xóa" và xác nhận

## 📚 Tài liệu tham khảo

- [React Documentation](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [Axios](https://axios-http.com/)
- [json-server](https://github.com/typicode/json-server)
