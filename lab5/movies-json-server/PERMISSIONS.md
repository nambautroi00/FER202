# 🔐 Hệ thống Phân quyền

## 📋 Tổng quan

Ứng dụng hỗ trợ 2 loại quyền:
- **Admin**: Quản trị viên - có đầy đủ quyền (thêm, sửa, xóa phim)
- **User**: Người dùng thường - chỉ xem danh sách phim

## 👤 Tài khoản mặc định

### Admin
- **Username**: `admin`
- **Password**: `admin123`
- **Role**: `admin`
- **Quyền**: ✅ Thêm phim, ✅ Sửa phim, ✅ Xóa phim, ✅ Xem phim

### User
- **Username**: `user1` hoặc `test`
- **Password**: `user123` hoặc `test123`
- **Role**: `user`
- **Quyền**: ❌ Thêm phim, ❌ Sửa phim, ❌ Xóa phim, ✅ Xem phim

## 🔧 Cách hoạt động

### 1. Cấu trúc dữ liệu (db.json)

Mỗi account có field `role`:
```json
{
  "id": 1,
  "username": "admin",
  "password": "admin123",
  "email": "admin@example.com",
  "fullName": "Administrator",
  "role": "admin"  // ← Field này xác định quyền
}
```

### 2. Helper Function (authUtils.js)

```javascript
export const isAdmin = (user) => {
  return user && user.role === 'admin';
};
```

### 3. Components áp dụng phân quyền

#### MovieForm.jsx
- **Admin**: Hiển thị form thêm phim mới
- **User**: Hiển thị thông báo "Chỉ quản trị viên mới có quyền thêm phim"

#### MovieTable.jsx
- **Admin**: Hiển thị nút "Sửa" và "Xóa"
- **User**: Hiển thị "Chỉ xem" thay vì các nút

#### Header.jsx
- Hiển thị badge role (👑 Admin hoặc 👤 User) bên cạnh tên người dùng

## 🎯 Kiểm thử

### Test với Admin:
1. Đăng nhập với `admin` / `admin123`
2. ✅ Thấy form "Thêm Phim Mới"
3. ✅ Thấy nút "Sửa" và "Xóa" trong bảng
4. ✅ Thấy badge "👑 Admin" trong Header

### Test với User:
1. Đăng nhập với `user1` / `user123`
2. ❌ Thấy thông báo "Chỉ quản trị viên mới có quyền thêm phim"
3. ❌ Không thấy nút "Sửa" và "Xóa" (chỉ thấy "Chỉ xem")
4. ✅ Thấy badge "👤 User" trong Header
5. ✅ Vẫn có thể xem danh sách phim và sử dụng FilterBar

## 📝 Cấu trúc File

```
src/
├── utils/
│   └── authUtils.js       # Helper functions kiểm tra quyền
├── components/
│   ├── MovieForm.jsx      # Áp dụng phân quyền cho form thêm phim
│   ├── MovieTable.jsx    # Áp dụng phân quyền cho nút Sửa/Xóa
│   └── Header.jsx        # Hiển thị role badge
└── contexts/
    └── AuthContext.jsx    # Quản lý thông tin user và role
```

## 🔄 Flow phân quyền

```
User Login
    ↓
AuthContext lấy thông tin user (bao gồm role)
    ↓
Components sử dụng useAuthState() để lấy user
    ↓
Components gọi isAdmin(user) để kiểm tra quyền
    ↓
Hiển thị UI tương ứng với quyền
```

## 💡 Lưu ý

1. **Role được lưu trong localStorage**: Khi user đăng nhập, role được lưu cùng với thông tin user
2. **Role được validate từ db.json**: Role được lấy trực tiếp từ API, không thể giả mạo
3. **UI được ẩn/hiện động**: Không cần reload trang, phân quyền được áp dụng ngay lập tức
4. **Backend validation**: Nên thêm validation ở backend để đảm bảo an toàn (hiện tại chỉ có frontend validation)

## 🚀 Mở rộng

Để thêm role mới, cần:
1. Thêm role vào `db.json`
2. Cập nhật `authUtils.js` với helper function mới
3. Cập nhật logic phân quyền trong các components

