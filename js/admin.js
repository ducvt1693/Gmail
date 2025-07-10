document.addEventListener('DOMContentLoaded', async () => {
  // Get purchase log from localStorage
  const purchaseLog = JSON.parse(localStorage.getItem('purchaseLog') || '[]');
  
  // Load current email list
  let currentEmails = [];
  try {
    const response = await fetch('emails.txt');
    if (response.ok) {
      const emailText = await response.text();
      currentEmails = emailText.split('\n').filter(email => email.trim() !== '');
    }
  } catch (error) {
    console.error('Error loading emails:', error);
  }
  
  // Update statistics
  updateStats(purchaseLog, currentEmails.length);
  
  // Display purchase history
  displayPurchases(purchaseLog);
  
  // Add email management section
  addEmailManagement(currentEmails);
});

function updateStats(purchases, emailCount) {
  if (purchases.length === 0) {
    document.getElementById('noData').style.display = 'block';
  } else {
    // Hide no data message
    document.getElementById('noData').style.display = 'none';
  }
  
  // Calculate totals
  const totalOrders = purchases.length;
  const totalMails = purchases.reduce((total, purchase) => total + purchase.quantity, 0);
  const totalRevenue = totalMails * 2300; // 2,300 VNĐ per mail
  
  // Update UI
  document.getElementById('totalOrders').textContent = totalOrders;
  document.getElementById('totalMails').textContent = totalMails;
  document.getElementById('totalRevenue').textContent = totalRevenue.toLocaleString('vi-VN');
  
  // Add stock count if it doesn't exist
  const statsContainer = document.querySelector('.stats');
  if (!document.getElementById('stockCard')) {
    const stockCard = document.createElement('div');
    stockCard.id = 'stockCard';
    stockCard.classList.add('stat-card');
    
    const stockNumber = document.createElement('div');
    stockNumber.id = 'stockCount';
    stockNumber.classList.add('stat-number');
    stockNumber.textContent = emailCount;
    
    const stockLabel = document.createElement('div');
    stockLabel.classList.add('stat-label');
    stockLabel.textContent = 'Email còn lại';
    
    stockCard.appendChild(stockNumber);
    stockCard.appendChild(stockLabel);
    statsContainer.appendChild(stockCard);
  } else {
    document.getElementById('stockCount').textContent = emailCount;
  }
}

function displayPurchases(purchases) {
  const purchaseListContainer = document.getElementById('purchaseList');
  
  // Clear existing content
  purchaseListContainer.innerHTML = '';
  
  // Sort purchases by timestamp (newest first)
  const sortedPurchases = [...purchases].reverse();
  
  // Create purchase items
  sortedPurchases.forEach(purchase => {
    const purchaseItem = document.createElement('div');
    purchaseItem.classList.add('purchase-item');
    
    const header = document.createElement('div');
    header.classList.add('purchase-header');
    
    const customerCode = document.createElement('div');
    customerCode.classList.add('customer-code');
    customerCode.textContent = `👤 ${purchase.customer_code}`;
    
    const quantity = document.createElement('div');
    quantity.classList.add('quantity');
    quantity.textContent = `${purchase.quantity} mail`;
    
    const timestamp = document.createElement('div');
    timestamp.classList.add('timestamp');
    timestamp.textContent = `🕒 ${purchase.timestamp}`;
    
    header.appendChild(customerCode);
    header.appendChild(quantity);
    header.appendChild(timestamp);
    
    purchaseItem.appendChild(header);
    purchaseListContainer.appendChild(purchaseItem);
  });
}

// Add email management functionality
function addEmailManagement(currentEmails) {
  const container = document.querySelector('.container');
  
  // Create email management section
  const emailSection = document.createElement('div');
  emailSection.classList.add('email-management');
  emailSection.innerHTML = `
    <h2>📧 Quản lý Email</h2>
    <div class="email-actions">
      <button id="downloadEmailsBtn" class="btn">📥 Tải danh sách email hiện tại</button>
      <button id="addEmailsBtn" class="btn">➕ Thêm email mới</button>
    </div>
    <div class="email-input-container" style="display: none;">
      <textarea id="emailInput" placeholder="Nhập mỗi email trên một dòng" rows="5"></textarea>
      <button id="saveEmailsBtn" class="btn">💾 Lưu email</button>
    </div>
  `;
  
  container.appendChild(emailSection);
  
  // Set up event listeners
  document.getElementById('downloadEmailsBtn').addEventListener('click', () => {
    downloadEmailsList(currentEmails);
  });
  
  document.getElementById('addEmailsBtn').addEventListener('click', () => {
    const inputContainer = document.querySelector('.email-input-container');
    inputContainer.style.display = inputContainer.style.display === 'none' ? 'block' : 'none';
  });
  
  document.getElementById('saveEmailsBtn').addEventListener('click', () => {
    const emailInput = document.getElementById('emailInput');
    const newEmails = emailInput.value.split('\n').filter(email => email.trim() !== '');
    
    if (newEmails.length === 0) {
      alert('Vui lòng nhập ít nhất một email.');
      return;
    }
    
    // Combine with existing emails
    const updatedEmails = [...currentEmails, ...newEmails];
    
    // Create updated emails.txt file for download
    downloadEmailsList(updatedEmails, true);
    
    // Update UI
    currentEmails = updatedEmails;
    updateStats(JSON.parse(localStorage.getItem('purchaseLog') || '[]'), currentEmails.length);
    
    // Clear input
    emailInput.value = '';
    document.querySelector('.email-input-container').style.display = 'none';
    
    alert(`Đã thêm ${newEmails.length} email mới. Vui lòng tải file emails.txt mới và cập nhật vào repository GitHub của bạn.`);
  });
}

// Download emails list
function downloadEmailsList(emails, isUpdate = false) {
  // Create text content
  const content = emails.join('\n');
  
  // Create download link
  const element = document.createElement('a');
  const file = new Blob([content], {type: 'text/plain'});
  element.href = URL.createObjectURL(file);
  element.download = 'emails.txt';
  
  // Show instructions if it's an update
  if (isUpdate) {
    alert('Tải file emails.txt mới và thay thế file cũ trong repository GitHub của bạn để cập nhật danh sách email.');
  }
  
  // Trigger download
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
} 