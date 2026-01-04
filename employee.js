// 1. 統一資料源：把原本寫死的資料改成「初始備份」，並與倉庫合併
let allEmployees = [];

function initData() {
    // 範例資料 (如果倉庫是空的，就顯示這些)
    const defaultData = [
        { id: 'EMP001', name: '王曉明', gender: '男', sn: 'N1XXXXXXXX', phone: '0980-1151154', status: '台南機庫', email: '00091@GMAIL.COM' },
        { id: 'EMP002', name: '陳曉美', gender: '女', sn: 'Y1XXXXXXXX', phone: '0910-222333', status: '千禧小路市', email: 'maya-25@GMAIL.COM' },
        { id: 'EMP003', name: '威廉森', gender: '男', sn: 'N1XXXXXXXX', phone: '0912-345678', status: '台南大路市', email: 'will@GMAIL.COM' }
    ];

    // 從倉庫領取主人新增的員工
    const savedData = JSON.parse(localStorage.getItem('myEmployees')) || [];

    //預設資料和local 合併
    allEmployees = [...defaultData, ...savedData];
    renderTable(allEmployees);
}

// 2. 渲染表格 (保持原樣，但加上空值防護)
function renderTable(data) {
    const tbody = document.getElementById('employee-list');
    if (!tbody) return;
    tbody.innerHTML = '';

    data.forEach(emp => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${emp.id}</td>
            <td>${emp.name}</td>
            <td>${emp.gender || '男'}</td>
            <td>${emp.sn || 'N/A'}</td>
            <td>${emp.phone || 'N/A'}</td>
            <td>${emp.status || '新進'}</td>
            <td>${emp.email || 'N/A'}</td>
            <td class="action-buttons">
                <button class="btn-more" onclick="showDetails('${emp.id}')">...</button>
                <button class="btn-edit" onclick="goToEditPage('${emp.id}')">編輯</button>
                <button class="btn-disable" onclick="goToDisablePage('${emp.id}')">停用</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function showDetails(empId) {
    // 1. 從所有員工中找到那一位 (包含預設與倉庫)
    const emp = allEmployees.find(e => e.id === empId);

    if (emp) {
        const detailContainer = document.getElementById('detail-info');
        // 2. 格式化顯示所有欄位 (把欄位排得整齊漂亮)
        detailContainer.innerHTML = `
            <div class="detail-grid">
                <p><strong>員工編號：</strong> ${emp.id}</p>
                <p><strong>員工姓名：</strong> ${emp.name}</p>
                <p><strong>性別：</strong> ${emp.gender || '未填'}</p>
                <p><strong>身分證字號：</strong> ${emp.sn || 'N/A'}</p>
                <p><strong>聯絡電話：</strong> ${emp.phone || 'N/A'}</p>
                <p><strong>電子信箱：</strong> ${emp.email || 'N/A'}</p>
                <p><strong>目前狀態：</strong> ${emp.status || '新進'}</p>
            </div>
        `;
        // 3. 顯示彈窗
        document.getElementById('detail-modal').style.display = 'flex';
    }
}

function closeModal() {
    document.getElementById('detail-modal').style.display = 'none';
}

// 3. 搜尋功能 (改為搜尋合併後的 allEmployees)
function handleSearch() {
    const idQuery = document.getElementById('emp-id').value.toLowerCase();
    const nameQuery = document.getElementById('emp-name').value.toLowerCase();
    const phoneQuery = document.getElementById('emp-phone').value.toLowerCase();

    const filtered = allEmployees.filter(emp => {
        return emp.id.toLowerCase().includes(idQuery) &&
            emp.name.toLowerCase().includes(nameQuery) &&
            emp.phone.includes(phoneQuery);
    });

    renderTable(filtered);
}

// 4. 單一的事件綁定入口
document.addEventListener('DOMContentLoaded', () => {
    initData(); // 初始化並合併資料

    const searchBtn = document.getElementById('search-btn');
    if (searchBtn) searchBtn.addEventListener('click', handleSearch);

    // 側邊欄切換
    const menuItems = document.querySelectorAll('.sidebar-menu li');
    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            const activeItem = document.querySelector('.sidebar-menu li.active');
            if (activeItem) activeItem.classList.remove('active');
            this.classList.add('active');
        });
    });

    // 跳轉按鈕邏輯
    const addBtn = document.querySelector('.btn-add'); // 確保 HTML 裡新增按鈕有 class="btn-add"
    if (addBtn) {
        addBtn.onclick = () => { window.location.href = 'add_employee.html'; };
    }
});