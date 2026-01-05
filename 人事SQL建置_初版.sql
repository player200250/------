-- 1. 先建立不依賴別人的表 (獨立表)
CREATE TABLE Department (
    department_Id INT IDENTITY(1,1) PRIMARY KEY,
    department_People NVARCHAR(50),
    department_Name NVARCHAR(50) NOT NULL,
    remark NVARCHAR(200)
);

-- 2. 建立職稱表 (依賴 Department)
CREATE TABLE Job_Title_Category (
    job_title_id INT IDENTITY(1,1) PRIMARY KEY,
    department_Id INT NOT NULL,
    jobTitle NVARCHAR(50) NOT NULL,
    CONSTRAINT FK_JobTitle_Dept FOREIGN KEY (department_Id) REFERENCES Department(department_Id)
);

-- 3. 建立員工主檔 (依賴 Job_Title_Category)
-- 蘊月幫主人把 email 改長了，employee_Number 設為 UNIQUE
CREATE TABLE Employee_Master (
    employee_id INT IDENTITY(1,1) PRIMARY KEY,
    employee_Number NVARCHAR(20) UNIQUE NOT NULL, 
    job_title_id INT, -- 關聯職稱
    employee_Name NVARCHAR(50) NOT NULL,
    personal_genderation NVARCHAR(10),
    personal_ID CHAR(10), -- 身分證固定10碼，用CHAR效能更好
    driver_lisence NVARCHAR(50),
    email NVARCHAR(100), -- 幫主人變長了！
    photo_path NVARCHAR(255),
    phoneNumber NVARCHAR(20),
    hireDate DATE,
    status NVARCHAR(20),
    emergency_people NVARCHAR(50),
    emergency_phone NVARCHAR(20),
    CONSTRAINT FK_Employee_Job FOREIGN KEY (job_title_id) REFERENCES Job_Title_Category(job_title_id)
);

-- 4. 建立出勤主表 (依賴 Employee_Master)
CREATE TABLE Attendance (
    attendance_Id INT IDENTITY(1,1) PRIMARY KEY,
    employee_Number NVARCHAR(20) NOT NULL, -- 統一使用 NVARCHAR(20) 與主檔對應
    attendance_Date DATE NOT NULL,
    clockInTime TIME,
    leave_early BIT DEFAULT 0,
    absent_from_work BIT DEFAULT 0,
    late BIT DEFAULT 0,
    expected_ClockInTime TIME,
    attendance_Type NVARCHAR(20),
    CONSTRAINT FK_Attendance_Employee FOREIGN KEY (employee_Number) REFERENCES Employee_Master(employee_Number)
);

-- 5. 建立打卡詳細表 (依賴 Attendance)
CREATE TABLE Clock_In_Out_Detail (
    detail_id INT IDENTITY(1,1) PRIMARY KEY,
    attendance_id INT NOT NULL,
    log_Location NVARCHAR(50),
    clockInTime TIME,
    clockOutTime TIME,
    total_Hours DECIMAL(5,2), -- 稍微加大一點範圍
    CONSTRAINT FK_ClockDetail_Attendance FOREIGN KEY (attendance_id) REFERENCES Attendance(attendance_id)
);

-- 6. 建立異動履歷表 (依賴 Employee_Master)
CREATE TABLE Employee_History (
    history_Id INT IDENTITY(1,1) PRIMARY KEY,
    employee_number NVARCHAR(20) NOT NULL,
    change_Type VARCHAR(30),
    change_Status VARCHAR(30),
    beforeValue NVARCHAR(200),
    afterValue NVARCHAR(200),
    applicant NVARCHAR(50),
    approver NVARCHAR(50),
    remark NVARCHAR(500),
    CONSTRAINT FK_History_Employee FOREIGN KEY (employee_number) REFERENCES Employee_Master(employee_Number)
);