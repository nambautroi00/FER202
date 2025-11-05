# 🚀 Hướng dẫn Chạy Nhanh

## Bước 1: Mở Terminal 1 - Chạy json-server

```bash
cd D:\FER202\lab5\movies-json-server
json-server --watch db.json --port 3001
```

**Lưu ý**: Giữ terminal này mở trong suốt quá trình phát triển.

## Bước 2: Mở Terminal 2 - Chạy React App

```bash
cd D:\FER202\lab5\movies-json-server
npm start
```

Ứng dụng sẽ tự động mở tại `http://localhost:3000`

## Bước 3: Đăng nhập

Sử dụng một trong các tài khoản sau:

- **Username**: `admin` / **Password**: `admin123`
- **Username**: `user1` / **Password**: `user123`
- **Username**: `test` / **Password**: `test123`

## ✅ Kiểm tra

1. ✅ Đăng nhập thành công → Chuyển đến trang `/movies`
2. ✅ Hiển thị thông tin người dùng trong Header
3. ✅ Xem danh sách phim
4. ✅ Thêm phim mới
5. ✅ Sửa phim (nhấn nút "Sửa")
6. ✅ Xóa phim (nhấn nút "Xóa")
7. ✅ Đăng xuất → Chuyển về trang `/login`

## 🔧 Troubleshooting

### Lỗi: "Cannot connect to json-server"
- Kiểm tra json-server đã chạy ở port 3001 chưa
- Kiểm tra file `db.json` có tồn tại trong thư mục root không

### Lỗi: "Port 3000 already in use"
- Đóng các ứng dụng khác đang dùng port 3000
- Hoặc sử dụng `PORT=3002 npm start` để chạy ở port khác

### Lỗi: "json-server: command not found"
- Cài đặt lại: `npm install -g json-server`

