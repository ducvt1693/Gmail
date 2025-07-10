# Cửa hàng Mail tự động - GitHub Pages Version

Đây là phiên bản GitHub Pages của hệ thống quản lý và bán mail tự động. Phiên bản này sử dụng HTML, CSS và JavaScript thuần, có thể triển khai dễ dàng trên GitHub Pages mà không cần server-side như phiên bản Flask gốc.

## Tính năng

- Hiển thị số lượng mail có sẵn
- Mua mail với mã khách hàng
- Tải xuống file text chứa các mail đã mua
- Trang admin hiển thị lịch sử mua hàng và thống kê

## Cài đặt

1. Fork repository này
2. Đăng nhập vào GitHub và đi đến repository đã fork
3. Vào Settings > Pages
4. Trong phần Source, chọn branch "main" và folder "/ (root)"
5. Nhấn Save
6. Đợi vài phút để GitHub Pages được triển khai
7. Truy cập trang web tại địa chỉ: https://[username].github.io/[repository-name]

## Sử dụng

### Trang chủ (index.html)
- Hiển thị số lượng mail có sẵn
- Nhập mã khách hàng và số lượng mail muốn mua
- Nhấn "Mua ngay" để hoàn tất giao dịch

### Trang mua thành công (success.html)
- Hiển thị thông tin mua hàng
- Hiển thị danh sách mail đã mua
- Nút tải xuống file txt chứa các mail

### Trang Admin (admin.html)
- Hiển thị thống kê về số đơn hàng, số mail đã bán và doanh thu
- Hiển thị lịch sử các đơn hàng đã thực hiện

## Tùy chỉnh

### Thêm mã khách hàng
Mở file `js/script.js` và thêm mã khách hàng mới vào mảng `validCustomerCodes`

### Thêm mail
Mở file `js/script.js` và thêm các địa chỉ mail mới vào mảng `mails`

## Lưu ý

- Phiên bản GitHub Pages này sử dụng localStorage để lưu trữ dữ liệu mua hàng, nên dữ liệu chỉ được lưu trữ trên trình duyệt của người dùng.
- Nếu người dùng xóa cache trình duyệt, dữ liệu sẽ bị mất.
- Để sử dụng với dữ liệu thực tế, bạn cần tích hợp với một backend thực hoặc dịch vụ lưu trữ đám mây.

## So sánh với phiên bản Flask
- Phiên bản GitHub Pages chỉ sử dụng client-side JavaScript, không cần server
- Dữ liệu được lưu trong localStorage thay vì file text/JSON trên server
- Không cần chạy server Flask, dễ dàng triển khai thông qua GitHub Pages 