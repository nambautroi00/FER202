# Lab3 - Movie Management System

## 📁 Cấu trúc dự án đã được tái cấu trúc

### 🎯 Tổng quan

Ứng dụng quản lý phim được xây dựng bằng **React Class Components** (không sử dụng Hooks), bao gồm các tính năng:

- ✅ Trang chủ với Carousel và danh sách phim
- ✅ Tìm kiếm, lọc, sắp xếp phim
- ✅ Thêm vào favourites (localStorage)
- ✅ Form wizard 3 bước để xây dựng profile
- ✅ Responsive design với Bootstrap

---

## 📂 Cấu trúc thư mục

```
lab3/
├── public/
│   └── images/                    # Ảnh phim (GalacticWars.jpg, DeepBlue.jpg,...)
├── src/
│   ├── components/
│   │   ├── Account/               # ⭐ FORM COMPONENTS (Đã tách)
│   │   │   ├── AboutForm.jsx      # Step 1: About Information
│   │   │   ├── AccountForm.jsx    # Step 2: Account Information
│   │   │   └── AddressForm.jsx    # Step 3: Address Information
│   │   ├── Carousel/
│   │   │   └── HomeCarousel.jsx   # Carousel giới thiệu phim
│   │   ├── Filter/
│   │   │   ├── Filter.jsx         # Component tìm kiếm/lọc/sắp xếp
│   │   │   └── Filter.css
│   │   ├── Footer/
│   │   │   ├── MyFooter.jsx
│   │   │   └── Footer.css
│   │   ├── Movie/
│   │   │   ├── MovieCard.jsx      # Card hiển thị thông tin phim
│   │   │   └── MovieCard.css
│   │   ├── NavBar/
│   │   │   ├── NavBar.jsx         # Navigation bar
│   │   │   └── NavBar.css
│   │   └── WizardForm.jsx         # ⭐ MAIN FORM (Đã tối ưu)
│   ├── data/
│   │   ├── carousel.js            # Data cho carousel
│   │   └── movies/
│   │       └── movies.js          # Data 9 phim + genres
│   ├── pages/
│   │   ├── HomePage.jsx           # Trang chủ
│   │   ├── MoviePage.jsx          # Trang danh sách phim
│   │   ├── AccountPage.jsx        # Trang wizard form
│   │   ├── AboutPage.jsx          # Giới thiệu
│   │   ├── ContactPage.jsx        # Liên hệ
│   │   ├── FavouritesPage.jsx     # Phim yêu thích
│   │   └── FooterPage.jsx         # Footer wrapper
│   ├── App.js                     # Main App component
│   └── index.css                  # Global styles
└── package.json
```

---

## ⭐ Điểm mới: Form đã được tách thành 3 components

### **Trước đây** (1 file dài 600+ dòng):
```
WizardForm.jsx
  ├── Constructor + State
  ├── Validation logic
  ├── Step 1 form (130 dòng)
  ├── Step 2 form (170 dòng)
  └── Step 3 form (140 dòng)
```

### **Bây giờ** (Dễ đọc và maintain hơn):

#### 1. **WizardForm.jsx** (230 dòng - Main orchestrator)
```jsx
class WizardProfileForm extends React.Component {
  // State management
  // Validation logic
  // Navigation (nextStep, prevStep)
  // Render tabs + progress bar
  // Gọi các sub-components
}
```

#### 2. **AboutForm.jsx** (150 dòng - Step 1)
```jsx
class AboutForm extends React.Component {
  // First Name, Last Name
  // Email, Phone, Age
  // Avatar upload
  // Next button
}
```

#### 3. **AccountForm.jsx** (180 dòng - Step 2)
```jsx
class AccountForm extends React.Component {
  // Username
  // Password (với show/hide)
  // Confirm Password (với show/hide)
  // Secret Question
  // Answer
  // Previous + Next buttons
}
```

#### 4. **AddressForm.jsx** (160 dòng - Step 3)
```jsx
class AddressForm extends React.Component {
  // Street, City, State
  // Zip Code
  // Country (dropdown)
  // Previous + Finish buttons
}
```

---

## 🎨 Ưu điểm của cấu trúc mới

### ✅ **1. Single Responsibility Principle**
- Mỗi component chỉ làm 1 việc
- AboutForm chỉ xử lý Step 1
- AccountForm chỉ xử lý Step 2
- AddressForm chỉ xử lý Step 3

### ✅ **2. Dễ đọc hơn**
- File ngắn gọn, dễ tìm code
- Logic rõ ràng, tách biệt

### ✅ **3. Dễ maintain**
- Sửa Step 1 → chỉ cần mở AboutForm.jsx
- Không ảnh hưởng đến các step khác

### ✅ **4. Reusable**
- Có thể tái sử dụng các form riêng lẻ
- Dễ dàng thêm/bớt step

### ✅ **5. Testing**
- Dễ test từng component độc lập
- Không phụ thuộc vào WizardForm

---

## 🚀 Cách sử dụng

### 1. **Cài đặt dependencies**
```bash
cd D:\FER202\slot10\lab3
npm install
```

### 2. **Chạy ứng dụng**
```bash
npm start
```

### 3. **Build production**
```bash
npm run build
```

---

## 🔄 Flow hoạt động của Wizard Form

```
WizardForm (Main)
   ↓ Props
AboutForm → User fills → onNext() → WizardForm updates step
   ↓ Props
AccountForm → User fills → onNext() → WizardForm updates step
   ↓ Props
AddressForm → User fills → onSubmit() → WizardForm submits data
```

### Props được truyền xuống:
- `formData`: Dữ liệu form hiện tại
- `errors`: Lỗi validation
- `handleChange`: Hàm xử lý thay đổi input
- `onNext`: Chuyển sang step tiếp theo
- `onPrevious`: Quay lại step trước
- `onSubmit`: Submit form

---

## 📊 So sánh Before/After

| Tiêu chí | Before | After |
|----------|--------|-------|
| **Số file** | 1 file | 4 files |
| **Dòng code/file** | ~600 dòng | 150-230 dòng |
| **Dễ đọc** | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Dễ maintain** | ⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Reusable** | ❌ | ✅ |
| **Testing** | Khó | Dễ |

---

## 💡 Kiến thức áp dụng

### 1. **Component Composition**
```jsx
<WizardForm>
  <AboutForm />
  <AccountForm />
  <AddressForm />
</WizardForm>
```

### 2. **Props Drilling**
- Truyền state và functions từ parent xuống child
- Child gọi callback để cập nhật parent state

### 3. **Separation of Concerns**
- Logic validation ở parent (WizardForm)
- UI form ở child (AboutForm, AccountForm, AddressForm)

### 4. **Class Components**
- Constructor, state, lifecycle
- Không sử dụng hooks

---

## 🎯 Các tính năng

### 🎬 Movies Management
- ✅ Hiển thị 9 phim với ảnh HD
- ✅ Search theo title/description
- ✅ Filter theo năm (≤2000, 2001-2015, >2015)
- ✅ Sort theo year/title/duration
- ✅ View details (Modal)
- ✅ Add to favourites (LocalStorage)

### 📝 Profile Builder
- ✅ Wizard form 3 steps
- ✅ Progress bar với phần trăm
- ✅ Tab navigation với icons
- ✅ Validation từng step
- ✅ Show/hide password
- ✅ Icon trước mỗi field

### 🎨 UI/UX
- ✅ Responsive design
- ✅ Bootstrap components
- ✅ Icons (Bootstrap Icons)
- ✅ Animations
- ✅ Hover effects

---

## 👨‍💻 Tác giả

- **Name**: NamPN
- **Email**: nampnde180445@fpt.edu.vn
- **Course**: FER202 - Lab 3
- **Project**: Movie Management System

---

## 📝 Lưu ý

1. **Không sử dụng Hooks** - Toàn bộ là Class Components
2. **LocalStorage** - Favourites được lưu trong browser
3. **Validation** - Form có validation đầy đủ
4. **Icons** - Bootstrap Icons đã được import
5. **Images** - Ảnh phim nằm trong `public/images/`

---

**Happy Coding! 🎉**

