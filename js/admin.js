document.addEventListener('DOMContentLoaded', () => {
  // Get purchase log from localStorage
  const purchaseLog = JSON.parse(localStorage.getItem('purchaseLog') || '[]');
  
  // Update statistics
  updateStats(purchaseLog);
  
  // Display purchase history
  displayPurchases(purchaseLog);
});

function updateStats(purchases) {
  if (purchases.length === 0) {
    document.getElementById('noData').style.display = 'block';
    return;
  }
  
  // Calculate totals
  const totalOrders = purchases.length;
  const totalMails = purchases.reduce((total, purchase) => total + purchase.quantity, 0);
  const totalRevenue = totalMails * 2300; // 2,300 VNĐ per mail
  
  // Update UI
  document.getElementById('totalOrders').textContent = totalOrders;
  document.getElementById('totalMails').textContent = totalMails;
  document.getElementById('totalRevenue').textContent = totalRevenue.toLocaleString('vi-VN');
  
  // Hide no data message
  document.getElementById('noData').style.display = 'none';
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