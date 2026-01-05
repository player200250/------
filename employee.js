// 1. 統一資料源：欄位已補齊 生日、離職日期
let allEmployees = [];

function initData() {
    const defaultData = [
        { 
            employee_Number: 'EMP001', 
            employee_Name: '王曉明', 
            personal_genderation: '男', 
            personal_ID: 'N1XXXXXXXX', 
            birthday: '1990-05-15',      // 新增生日
            phoneNumber: '0980-1151154', 
            status: '在職', 
            current_location: '台南機庫', 
            email: '00091@GMAIL.COM',
            hireDate: '2023-01-01',
            resignationDate: '',         // 新增離職日期 (在職中則為空)
            driver_lisence: '普通大貨車',
            emergency_people: '張大通',
            emergency_phone: '0911-222333',
            photo_path: 'https://via.placeholder.com/160x200?text=EMP001' 
        },
        { 
            employee_Number: 'EMP002', 
            employee_Name: '陳曉美', 
            personal_genderation: '女', 
            personal_ID: 'Y1XXXXXXXX', 
            birthday: '1995-10-20',      // 新增生日
            phoneNumber: '0910-222333', 
            status: '在職', 
            current_location: '千禧小路市', 
            email: 'maya-25@GMAIL.COM',
            hireDate: '2023-05-20',
            resignationDate: '',
            driver_lisence: '無',
            emergency_people: '陳爸爸',
            emergency_phone: '0922-333444',
            photo_path: 'https://via.placeholder.com/160x200?text=EMP002'
        }
    ];

    const savedData = JSON.parse(localStorage.getItem('myEmployees')) || [];
    allEmployees = [...defaultData, ...savedData];
    renderTable(allEmployees);
}

// 2. 渲染主表格
function renderTable(data) {
    const tbody = document.querySelector('.employee-table tbody');
    if (!tbody) return;

    tbody.innerHTML = data.map(emp => `
        <tr data-id="${emp.employee_Number}">
            <td>${emp.employee_Number}</td>
            <td>${emp.employee_Name}</td>
            <td>${emp.personal_genderation || '未設定'}</td>
            <td>${emp.personal_ID || '未設定'}</td>
            <td>${emp.phoneNumber}</td>
            <td>${emp.current_location || '未分配'}</td>
            <td>${emp.email}</td>
            <td class="action-buttons">
                <button class="btn-more" onclick="showDetail('${emp.employee_Number}')">...</button>
                <button class="btn-edit" onclick="location.href='edit_employee.html?id=${emp.employee_Number}'">編輯</button>
                <button class="btn-disable" onclick="location.href='disable_employee.html?id=${emp.employee_Number}'">停用</button>
            </td>
        </tr>
    `).join('');
}

// 3. 顯示詳細資訊 (左側照片 + 右側完整清單，包含生日與離職日)
function showDetail(empNumber) {
    const emp = allEmployees.find(e => e.employee_Number === empNumber);
    if (!emp) return;

    const detailInfo = document.getElementById('detail-info');
    
    detailInfo.innerHTML = `
        <div class="detail-wrapper" style="display: flex; gap: 25px; align-items: flex-start; padding: 10px;">
            <div class="detail-left" style="flex: 0 0 160px; text-align: center;">
                <img src="${emp.photo_path || 'https://via.placeholder.com/160x200?text=No+Image'}" 
                     style="width: 160px; height: 200px; object-fit: cover; border-radius: 12px; border: 3px solid #fce4ec; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
                <div style="margin-top: 12px; font-weight: bold; color: #c2185b;">
                    狀態：${emp.status}
                </div>
            </div>

            <div class="detail-right" style="flex: 1;">
                <h2 style="margin: 0 0 15px 0; color: #c2185b; border-bottom: 2px solid #fce4ec; padding-bottom: 8px;">
                    ${emp.employee_Name} <small style="color: #888; font-size: 0.9rem;">(編號: ${emp.employee_Number})</small>
                </h2>
                
                <div style="display: grid; grid-template-columns: 90px 1fr; gap: 8px; font-size: 0.95rem; line-height: 1.6;">
                    <strong>性別：</strong> <span>${emp.personal_genderation || '未設定'}</span>
                    <strong>身分證：</strong> <span>${emp.personal_ID || '未設定'}</span>
                    <strong>出生日期：</strong> <span>${emp.birthday || '未填寫'}</span>
                    <strong>聯絡電話：</strong> <span>${emp.phoneNumber || '未設定'}</span>
                    <strong>電子信箱：</strong> <span>${emp.email || '未設定'}</span>
                    <strong>駐點位置：</strong> <span>${emp.current_location || '未分配'}</span>
                    
                    <div style="grid-column: span 2; margin: 10px 0; border-top: 1px dashed #eee;"></div>
                    
                    <strong>到職日期：</strong> <span>${emp.hireDate || '未提供'}</span>
                    <strong>離職日期：</strong> <span style="color: ${emp.resignationDate ? '#d32f2f' : '#666'};">${emp.resignationDate || '在職中'}</span>
                    <strong>駕駛執照：</strong> <span>${emp.driver_lisence || '無'}</span>
                    
                    <div style="grid-column: span 2; margin: 10px 0; border-top: 1px dashed #eee;"></div>
                    
                    <strong>緊急聯絡：</strong> <span>${emp.emergency_people || '未設定'}</span>
                    <strong>聯絡電話：</strong> <span>${emp.emergency_phone || '未設定'}</span>
                </div>
            </div>
        </div>
    `;

    document.getElementById('detail-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('detail-modal').style.display = 'none';
}

function handleSearch() {
    const idQuery = document.getElementById('emp-id').value.toLowerCase();
    const nameQuery = document.getElementById('emp-name').value.toLowerCase();

    const filtered = allEmployees.filter(emp => {
        return (emp.employee_Number || "").toLowerCase().includes(idQuery) &&
               (emp.employee_Name || "").toLowerCase().includes(nameQuery);
    });

    renderTable(filtered);
}

document.addEventListener('DOMContentLoaded', () => {
    initData();
    const searchBtn = document.getElementById('search-btn');
    if (searchBtn) searchBtn.addEventListener('click', handleSearch);
    const addBtn = document.querySelector('.btn-add');
    if (addBtn) addBtn.onclick = () => location.href = 'add_employee.html';
});