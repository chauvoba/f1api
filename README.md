**API TRA CỨU DỮ LIỆU CÁC GIẢI ĐẤU ĐUA XE F1 THEO ĐỊNH DẠNG CỦA WEBSITE : www.formula1.com**

**STEP 1 : CÀI ĐẶT CÁC MODULE CẦN THIẾT** 

Để đảm bảo server hoạt động ổn định, nên cài đặt chính xác các module sau  
+ NodeJS : Phiên bản 14.21.3
+ TypeScript : Phiên bản 5.0.4
+ Visual Studio Code : Phiên bản bất kỳ

**STEP 2 : KHỞI CHẠY SERVER** 

Để khởi chạy server, chúng ta thực hiện tuần tự theo các bước sau 
+ Mở terminal, chạy lệnh "npm install" => Quan trọng, nhằm cài đặt các dependencies và package cần thiết của server
+ Chuẩn bị file .env, hoặc truy cập đến file .env theo đường dẫn "Basef1/.env" để thay đổi các config cấu hình cần thiết (Server của bài tập này sử dụng Postgres làm CSDL). Chỉnh sửa các config sau :
  
  -> DB_NAME : Tên Database lưu dữ liệu
  
  -> DB_USER : Tên User đăng nhập (Default là Postgres)
  
  -> DB_PASS : Mật khẩu đăng nhập
  
  -> DB_HOST : Host của server, ở bài tập này sẽ là localhost

Sau khi hoàn tất, tại terminal, sử dụng lệnh "npm run start:dev" để khởi chạy server.

**STEP 3 : TẠO CƠ SỞ DỮ LIỆU (OPTIONAL - BỎ QUA BƯỚC NÀY NẾU BẠN ĐÃ CÓ SẴN CƠ SỞ DỮ LIỆU)**

Để khởi tạo dữ liệu, trước tiên tìm đến thư mục package.json và tìm kiếm xem package sequelize-cli và sequelize đã được cài đặt hay chưa. Nếu chưa, chúng ta mở terminal và chạy lệnh "npm i -D sequelize sequelize-cli" để cài đặt các package này.

Sau khi cài đặt hoàn tất, chúng ta cd đến thư mục src tại terminal, và sử dụng lệnh "npx sequelize init" để khởi tạo các thư mục cần thiết phục vụ cho quá trình tạo và migrate dữ liệu đến CSDL. 

Tiếp tục sử dụng lệnh "npx sequelize migration:create --name *tên-table-dữ-liệu-cần-tạo* để khởi tạo các file migration dữ liệu đến cho từng table tại CSDL. Sau khi sử dụng lệnh trên, các tập tin migration sẽ được khởi tạo ở đường dẫn "Basef1/src/migration/", chúng ta có thể tìm đến các tập tin này để config và định dạng cho từng table dữ liệu. 

Để migrate dữ liệu đến CSDL sau khi đã khởi tạo định dạng Table hoàn tất, chúng ta sử dụng lệnh "npx sequelize db:migrate".

Trong trường hợp bạn cần chỉnh sửa định dạng table sau khi đã migrate dữ liệu, chúng ta sử dụng lệnh "npx sequelize db:migrate:undo" để hủy bỏ các tiến trình migrate dữ liệu. Sử dụng lệnh này với số lần tương ứng với số table đã migrate.

Nếu gặp lỗi trong quá trình migration, tìm đến thư mục config.json tại đường dẫn "Basef1/src/config/config.json" và thay đổi các config của Database tại mục "Development" thành các thông số tương ứng với Database hiện tại bạn đang sử dụng.

**STEP 4 : BẮT ĐẦU THỰC HIỆN TRUY VẤN**

Bắt đầu với 1 vài api truy vấn đơn giản 

**+ API tra cứu thông tin các đội đua F1, cùng thông tin các tay đua trong biên chế :**

http://localhost:4000/api/v1/teams/get-all-team-info

=> Kết quả nhận được :
{
    "code": 200,
    "results": {
        "object": [
            {
                "id": "a5723c13-5f91-4a72-8f3b-f535225d2098",
                "name": "Alfa Romeo F1 Team Stake",
                "base": "Switzerland",
                "team_chief": "Alessandro",
                "technical_chief": "Monchaux",
                "chassis": "C43",
                "power_unit": "Ferrari",
                "first_team_entry": 1993,
                "world_championships": 0,
                "highest_race_finish": 1,
                "pole_positions": 1,
                "fastest_laps": 7,
                "drivers": [
                  {
                    "driver_name": 
                    .....
                  }
                ]
            },
  ......

**+ API tra cứu một đội đua F1 bất kỳ sử dụng id của đội đua, cùng thông tin các tay đua trong biên chế**

http://localhost:4000/api/v1/teams/get-team-info/847679d7-8050-4892-ae86-68f2ec1dc3a8

=> Kết quả nhận được : 
{
    "code": 200,
    "results": {
        "object": [
            {
                "id": "847679d7-8050-4892-ae86-68f2ec1dc3a8",
                "name": "Scuderia AlphaTauri",
                "base": "Faenza",
                "team_chief": "Tost",
                "technical_chief": "Egginton",
                "chassis": "AT04",
                "power_unit": "Honda RBPT",
                "first_team_entry": 1995,
                "world_championships": 0,
                "highest_race_finish": 1,
                "pole_positions": 1,
                "fastest_laps": 2
            }
}

ID của một vài đội đua khác mà bạn có thể thử nghiệm : 

=> Đội 1 : a5723c13-5f91-4a72-8f3b-f535225d2098

=> Đội 2 : 99dd6aba-3cb6-4624-97ff-9ff9f95f1406
  
  


