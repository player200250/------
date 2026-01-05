
 --查找資料語法
SELECT 
    E.employee_Number AS [員工編號],
    E.employee_Name AS [員工姓名],
    E.personal_genderation AS [性別],
    E.personal_ID AS [身分證字號],
    E.phoneNumber AS [員工個人電話],
    E.status AS [異動狀態狀態], -- 在職/離職
    E.email AS [電子信箱],
    D.department_Name AS [所屬部門],
    J.jobTitle AS [職稱]
FROM Employee_Master E
LEFT JOIN Job_Title_Category J ON E.job_title_id = J.job_title_id
LEFT JOIN Department D ON J.department_Id = D.department_Id;

--查找員工詳細資料
SELECT 
    E.employee_Number AS [員工編號],
    E.employee_Name AS [姓名],
    E.personal_genderation AS [性別],
   -- E.birthday AS [生日], 資料庫要添加
    D.department_Name AS [部門],
    J.jobTitle AS [職稱],
    E.personal_ID AS [身分證],
    E.driver_lisence AS [員工駕照],
    E.phoneNumber AS [電話],
    E.email AS [信箱],
    E.hireDate AS [到職日],
   --E.resignationDate AS [離職日], 資料庫要添加
    E.status AS [狀態],
    E.photo_path AS [員工大頭照],
    E.emergency_people AS[緊急聯絡人],
    E.emergency_people AS[緊急電話]
FROM Employee_Master E
LEFT JOIN Job_Title_Category J ON E.job_title_id = J.job_title_id
LEFT JOIN Department D ON J.department_Id = D.department_Id;

SELECT * from Employee_Master

SELECT 
    (SELECT COUNT(*) FROM Employee_Master WHERE status = '在職') AS [應到人數],
    COUNT(CASE WHEN clockInTime IS NOT NULL THEN 1 END) AS [實到人數],
    COUNT(CASE WHEN late = 1 THEN 1 END) AS [遲到人數],
    COUNT(CASE WHEN attendance_Type = '請假' THEN 1 END) AS [請假中]
FROM Attendance
WHERE attendance_Date = CAST(GETDATE() AS DATE);

select * from Attendance

SELECT * FROM Employee_Master 
WHERE employee_Number = 'EMP003'; -- 這裡放妳 UI 選中的變數

SELECT 
    change_Type AS [異動類型],
    change_Status AS [審核狀態],
    beforeValue AS [異動前],
    afterValue AS [異動後],
    applicant AS [申請人],
    remark AS [異動原因]
FROM Employee_History
WHERE employee_number = 'EMP001'
ORDER BY history_Id DESC;

-- 1. 插入部門資料
INSERT INTO Department (department_Name, department_People, remark)
VALUES 
(N'人事部', N'張大通', N'負責全公司人力資源'),
(N'業務部', N'林經理', N'負責搬家業務接洽'),
(N'運輸部', N'王組長', N'包含各機庫司機與搬運工');

-- 2. 插入職稱資料
INSERT INTO Job_Title_Category (department_Id, jobTitle)
VALUES 
(1, N'人事專員'),
(3, N'司機'),
(3, N'搬運組長');

-- 3. 修正後的員工主檔 (去掉了多餘的地點欄位)
INSERT INTO Employee_Master 
(employee_Number, job_title_id, employee_Name, personal_genderation, personal_ID, email, phoneNumber, status, hireDate)
VALUES 
('EMP001', 2, N'王曉明', N'男', 'N1XXXXXXXX', '00091@GMAIL.COM', '0980-1151154', N'在職', '2023-01-01'),
('EMP002', 1, N'陳曉美', N'女', 'Y1XXXXXXXX', 'maya-25@GMAIL.COM', '0910-222333', N'在職', '2023-05-20'),
('EMP003', 3, N'威廉森', N'男', 'N1XXXXXXXX', 'will@GMAIL.COM', '0912-345678', N'在職', '2024-02-15');

-- 4. 插入今日出勤資料
INSERT INTO Attendance 
(employee_Number, attendance_Date, clockInTime, expected_ClockInTime, late, attendance_Type)
VALUES 
('EMP001', CAST(GETDATE() AS DATE), '08:55:12', '09:00:00', 0, N'正常'),
('EMP002', CAST(GETDATE() AS DATE), '09:15:20', '09:00:00', 1, N'正常'),
('EMP003', CAST(GETDATE() AS DATE), NULL, '09:00:00', 0, N'請假');

-- 5. 插入異動履歷
INSERT INTO Employee_History 
(employee_number, change_Type, change_Status, beforeValue, afterValue, applicant, remark)
VALUES 
('EMP001', N'調組', N'已審核', N'台北總部', N'台南機庫', N'系統管理員', N'業務需求調整');

