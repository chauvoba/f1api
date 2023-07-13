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

**STEP 4 : BẮT ĐẦU THỰC HIỆN TRUY VẤN**

Bắt đầu với 1 vài api truy vấn đơn giản 

**+ API tra cứu thông tin các đội đua F1, cùng thông tin các tay đua trong biên chế :**

Format api truy vấn : 
http://localhost:4000/api/v1/teams/get-all-team-info

Ví dụ : 
http://localhost:4000/api/v1/teams/get-all-team-info

=> Kết quả nhận được :
{
    "code": 200,
    "results": {
        "object": [
            {
                "id": "99dd6aba-3cb6-4624-97ff-9ff9f95f1406",
                "name": "Oracle Red Bull Racing",
                "base": "Milton Keynes",
                "team_chief": "Horner",
                "technical_chief": "Wache",
                "chassis": "RB19",
                "power_unit": "Honda RBPT",
                "first_team_entry": 1997,
                "world_championships": 5,
                "highest_race_finish": 1,
                "pole_positions": 91,
                "fastest_laps": 91,
                "drivers": [
                    {
                        "driver_name": "Max Verstappen",
                        "id": "26bbc21b-7783-4809-ad87-888a210df628"
                    },
                    {
                        "driver_name": "Sergio Perez",
                        "id": "f4714f3f-dc9f-4560-92fc-101981af2454"
                    }
                ]
            },
            .....

**+ API tra cứu một đội đua F1 bất kỳ sử dụng id của đội đua, cùng thông tin các tay đua trong biên chế**

Format api truy vấn : 
http://localhost:4000/api/v1/teams/get-team-info/:teamid

Ví dụ :
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
                "fastest_laps": 2,
                "drivers":[]
            }
}

ID của một vài đội đua khác mà bạn có thể thử nghiệm : 

=> Đội 1 : a5723c13-5f91-4a72-8f3b-f535225d2098

=> Đội 2 : 99dd6aba-3cb6-4624-97ff-9ff9f95f1406

**+ API tra cứu thông tin của tay đua, kèm với đội đua mà người này thuộc biên chế**

Format api truy vấn : 
http://localhost:4000/api/v1/drivers/get-driver-info/:driverid

Ví dụ :
http://localhost:4000/api/v1/drivers/get-driver-info/26bbc21b-7783-4809-ad87-888a210df628

=> Kết quả nhận được :
{
    "code": 200,
    "results": {
        "object": [
            {
                "driver_name": "Max Verstappen",
                "country": "Netherlands",
                "podium": 87,
                "points": 2267,
                "grand_prix_entered": 173,
                "world_champions": 2,
                "highest_race_finish": 1,
                "highest_grid_position": 1,
                "date_of_birth": "1997-09-30",
                "place_of_birth": "Belgium",
                "teams": {
                    "name": "Oracle Red Bull Racing"
                }
            }
        ]
    }
}

Tiếp tục với một vài api nâng cao

**+ API tra cứu kết quả của một tay đua trong năm tùy chọn dựa theo ID của tay đua**

Format api truy vấn :
http://localhost:4000/api/v1/drivers/:driverid/get-driver-result/:year

Ví dụ : 
http://localhost:4000/api/v1/drivers/26bbc21b-7783-4809-ad87-888a210df628/get-driver-result/2023

=> Kết quả nhận được :
{
    "code": 200,
    "results": {
        "object": {
            "resp": "result for driver 26bbc21b-7783-4809-ad87-888a210df628 in 2023",
            "result": [
                {
                    "car": "Red Bull Racing Honda RBPT",
                    "position": 1,
                    "points": 25,
                    "drivers.driver_name": "Max Verstappen",
                    "races.grand_prix": "Bahrain",
                    "races.date": "2023-03-03"
                },
                {
                    "car": "Red Bull Racing Honda RBPT",
                    "position": 2,
                    "points": 19,
                    "drivers.driver_name": "Max Verstappen",
                    "races.grand_prix": "Saudi Arabia",
                    "races.date": "2023-03-17"
                }
            ]
        }
    }
}

**+ API tra cứu kết quả của toàn bộ tay đua F1 trong năm, dựa theo year**

Format api truy vấn : 
http://localhost:4000/api/v1/drivers/get-all-driver-result/:year

Ví dụ :
http://localhost:4000/api/v1/drivers/get-all-driver-result/2023

=> Kết quả nhận được : 

{
    "code": 200,
    "results": {
        "object": {
            "resp": "Showing 2023 results of all drivers participated",
            "result": [
                {
                    "total points": "44",
                    "drivers.id": "26bbc21b-7783-4809-ad87-888a210df628",
                    "drivers.driver_name": "Max Verstappen",
                    "drivers.nationality": "Netherlands",
                    "races.year": 2023
                },
                {
                    "total points": "18",
                    "drivers.id": "f4714f3f-dc9f-4560-92fc-101981af2454",
                    "drivers.driver_name": "Sergio Perez",
                    "drivers.nationality": "Mexico",
                    "races.year": 2023
                },
                ......

**+ API tra cứu kết quả của một cuộc đua**

Format api truy vấn : 

http://localhost:4000/api/v1/races/:year/get-race-result/:raceid 

Ví dụ : 

http://localhost:4000/api/v1/races/2023/get-race-result/64aff9b2-538d-4a3d-9fc5-5e03f2a5f311

=> Kết quả nhận được : 

{
    "code": 200,
    "results": {
        "object": {
            "resp": "Showing result of race 64aff9b2-538d-4a3d-9fc5-5e03f2a5f311 in 2023",
            "result": [
                {
                    "car": "Red Bull Racing Honda RBPT",
                    "position": 1,
                    "laps": 57,
                    "time": "1:33:56",
                    "race_points": 25,
                    "number_order": 1,
                    "races.grand_prix": "Bahrain",
                    "drivers.driver_name": "Max Verstappen"
                },
                {
                    "car": "Alfa Romeo Ferrari",
                    "position": 8,
                    "laps": 57,
                    "time": "1:34:12",
                    "race_points": 4,
                    "number_order": 77,
                    "races.grand_prix": "Bahrain",
                    "drivers.driver_name": "Valtteri Pottas"
                },
                {
                    "car": "Alfa Romeo Ferrari",
                    "position": 16,
                    "laps": 56,
                    "time": "1:35:36",
                    "race_points": 0,
                    "number_order": 24,
                    "races.grand_prix": "Bahrain",
                    "drivers.driver_name": "Zhou Guanyu"
                }
            ]
        }
    }
}

**+ Api tra cứu thành tích trong năm của toàn bộ đội đua**

Format api truy vấn: 

http://localhost:4000/api/v1/teams/get-all-team-result/:year

Ví dụ : 

http://localhost:4000/api/v1/teams/get-all-team-result/2023

=> Kết quả nhận được : 

{
    "code": 200,
    "results": {
        "object": {
            "resp": "Showing all F1 teams result in 2023",
            "result": [
                {
                    "Team total points": "0",
                    "drivers.teams.id": "847679d7-8050-4892-ae86-68f2ec1dc3a8",
                    "drivers.teams.name": "Scuderia AlphaTauri"
                },
                {
                    "Team total points": "62",
                    "drivers.teams.id": "99dd6aba-3cb6-4624-97ff-9ff9f95f1406",
                    "drivers.teams.name": "Oracle Red Bull Racing"
                },
                {
                    "Team total points": "4",
                    "drivers.teams.id": "a5723c13-5f91-4a72-8f3b-f535225d2098",
                    "drivers.teams.name": "Alfa Romeo F1 Team Stake"
                }
            ]
        }
    }
}

**+ Api tra cứu thành tích trong năm của 1 đội đua**

Format api : 

http://localhost:4000/api/v1/teams/:teamid/get-team-result/:year

Ví dụ : 

http://localhost:4000/api/v1/teams/99dd6aba-3cb6-4624-97ff-9ff9f95f1406/get-team-result/2023

=> Kết quả nhận được 

{
    "code": 200,
    "results": {
        "object": [
            {
                "Total team points in grand prix": "25",
                "races.grand_prix": "Bahrain",
                "races.date": "2023-03-03"
            },
            {
                "Total team points in grand prix": "37",
                "races.grand_prix": "Saudi Arabia",
                "races.date": "2023-03-17"
            }
        ]
    }
}

**NHỮNG PHẦN ĐÃ THỰC HIỆN ĐƯỢC** 

**TEAM API :**

+ Api trả kết quả thông tin toàn bộ đội đua kèm các tay đua thuộc biên chế
+ Api trả kết quả thông tin đội đua dựa theo teamid
+ Api trả kết quả thành tích đua của tất cả đội đua theo năm
+ Api trả kết quả thành tích đua của đội đua theo năm

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
