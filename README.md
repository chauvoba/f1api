**API TRA CỨU DỮ LIỆU CÁC GIẢI ĐẤU ĐUA XE F1 THEO ĐỊNH DẠNG CỦA WEBSITE : www.formula1.com**

**STEP 1 : CÀI ĐẶT CÁC MODULE CẦN THIẾT** 

Để đảm bảo server hoạt động ổn định, chúng ta nên cài đặt chính xác các module sau  
+ NodeJS : Phiên bản 14.21.3
+ TypeScript : Phiên bản 5.0.4
+ Visual Studio Code : Phiên bản bất kỳ
+ Postgres SQL : Phiên bản 15

**STEP 2 : KHỞI CHẠY SERVER** 

Để khởi chạy server, chúng ta thực hiện tuần tự theo các bước sau 
+ Mở terminal, chạy lệnh "npm install" => Quan trọng, nhằm cài đặt các dependencies và package cần thiết của server
+ Chuẩn bị file .env, hoặc truy cập đến file .env theo đường dẫn "Basef1/.env" để thay đổi các config cấu hình cần thiết (Server của bài tập này sử dụng Postgres làm CSDL). Chỉnh sửa các config sau :
  
  -> DB_NAME : Tên Database lưu dữ liệu
  
  -> DB_USER : Tên User đăng nhập (Default là postgres)
  
  -> DB_PASS : Mật khẩu đăng nhập
  
  -> DB_HOST : Host của server, ở bài tập này sẽ là localhost

Sau khi hoàn tất, tại terminal, sử dụng lệnh "npm run start:dev" để khởi chạy server.

**STEP 3 : TẠO CƠ SỞ DỮ LIỆU (OPTIONAL - BỎ QUA BƯỚC NÀY NẾU BẠN ĐÃ CÓ SẴN CƠ SỞ DỮ LIỆU)**

Để khởi tạo dữ liệu, trước tiên tìm đến thư mục package.json và tìm kiếm xem package sequelize-cli và sequelize đã được cài đặt hay chưa. Nếu chưa, chúng ta mở terminal và chạy lệnh "npm i -D sequelize sequelize-cli" để cài đặt các package này.

Sau khi cài đặt hoàn tất, chúng ta cd đến thư mục src tại terminal, và sử dụng lệnh "npx sequelize init" để khởi tạo các thư mục cần thiết phục vụ cho quá trình tạo và migrate dữ liệu đến CSDL. 

Tiếp tục sử dụng lệnh "npx sequelize migration:create --name *tên-table-dữ-liệu-cần-tạo* để khởi tạo các file migration dữ liệu đến cho từng table tại CSDL. Sau khi sử dụng lệnh trên, các tập tin migration sẽ được khởi tạo ở đường dẫn "Basef1/src/migration/", chúng ta có thể tìm đến các tập tin này để config và định dạng các row dữ liệu cho từng table. 

Để migrate dữ liệu đến CSDL sau khi đã khởi tạo định dạng Table và chuẩn bị các file migration hoàn tất, chúng ta sử dụng lệnh "npx sequelize db:migrate".

Trong trường hợp bạn cần chỉnh sửa định dạng table sau khi đã migrate dữ liệu, chúng ta sử dụng lệnh "npx sequelize db:migrate:undo" để hủy bỏ các tiến trình migrate dữ liệu. Sử dụng lệnh này với số lần tương ứng với số table đã migrate.

Nếu gặp lỗi trong quá trình migration, hãy tìm đến thư mục config.json tại đường dẫn "Basef1/src/config/config.json" và thay đổi các config của Database tại mục "Development" thành các thông số tương ứng với Database hiện tại bạn đang sử dụng.

**STEP 4 : API TRUY VẤN DỮ LIỆU**

Bạn có thể truy cập đến đường dẫn sau để xem toàn bộ API đã được thực hiện của bài tập.
https://hitek-testing-api.postman.co/workspace/Hitek-~bfb8a5c6-7f12-4f56-856a-efe13bc319f0/collection/27761194-0bbfffe0-983e-417c-858e-eef6a2330159?action=share&creator=27761194

**NHỮNG PHẦN ĐÃ THỰC HIỆN ĐƯỢC** 

**TEAM API :**

+ Api trả kết quả thông tin toàn bộ đội đua kèm các tay đua thuộc biên chế
+ Api trả kết quả thông tin đội đua dựa theo teamid
+ Api trả kết quả thành tích đua của tất cả đội đua theo năm
+ Api trả kết quả thành tích đua của đội đua theo năm
+ Api trả kết quả tổng điểm của đội đua đạt được trong năm

**DRIVER API :** 

+ Api trả kết quả thông tin toàn bộ tay đua F1 kèm đội đua mà tất cả thuộc biên chế
+ Api trả kết quả thông tin tay đua kèm đội đua mà người này thuộc biên chế
+ Api trả kết quả tra cứu thành tích đua trong 1 năm của tay đua dựa theo driverid và year
+ Api trả kết quả thành tích đua trong năm của toàn bộ tay đua

  **RACE API**

+ Api hiển thị thông tin của một cuộc đua (Địa điểm, ngày, năm)
+ Api hiển thị kết quả của một cuộc đua (Người chiến thắng, thời gian, ...) 


**NHỮNG PHẦN CHƯA THỰC HIỆN ĐƯỢC**

=> Crawl dữ liệu trực tiếp từ Website www.formula1.com
