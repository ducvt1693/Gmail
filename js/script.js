// Mail data array
const mails = [
  "longchau53845533@gmail.com",
  "dongnam12778760@gmail.com",
  "pnhu55065@gmail.com",
  "legiang93424689@gmail.com",
  "hongq6621@gmail.com",
  "duongngan01224484@gmail.com",
  "tot588192@gmail.com",
  "longtu83762733@gmail.com",
  "nguyennam59739578@gmail.com",
  "hchi78411@gmail.com",
  // Add more emails as needed
];

// Customer codes
const validCustomerCodes = ["telegramMail"];

// Update mail count on load
document.addEventListener('DOMContentLoaded', () => {
  const mailCountElement = document.getElementById('mailCount');
  mailCountElement.textContent = mails.length;
  
  // Set max quantity to available mail count
  const quantityInput = document.getElementById('quantity');
  quantityInput.max = mails.length;
});

// Handle form submission
document.getElementById('purchaseForm').addEventListener('submit', (event) => {
  event.preventDefault();
  
  const customerCodeInput = document.getElementById('customer_code');
  const quantityInput = document.getElementById('quantity');
  
  const customerCode = customerCodeInput.value.trim();
  const quantity = parseInt(quantityInput.value);
  
  // Validate customer code
  if (!customerCode) {
    alert('Vui lòng nhập mã khách hàng.');
    return;
  }
  
  if (!validCustomerCodes.includes(customerCode)) {
    alert('Mã khách hàng không hợp lệ. Vui lòng liên hệ admin để được cấp mã.');
    return;
  }
  
  // Validate quantity
  if (isNaN(quantity) || quantity <= 0) {
    alert('Vui lòng nhập số lượng hợp lệ.');
    return;
  }
  
  if (quantity > mails.length) {
    alert('Không đủ mail trong kho. Vui lòng mua ít hơn.');
    return;
  }
  
  // Process purchase
  const purchasedMails = mails.slice(0, quantity);
  
  // Save purchase to localStorage
  savePurchase(customerCode, quantity, purchasedMails);
  
  // Redirect to success page with data
  const purchaseData = {
    customerCode: customerCode,
    quantity: quantity,
    mails: purchasedMails
  };
  
  localStorage.setItem('currentPurchase', JSON.stringify(purchaseData));
  window.location.href = 'success.html';
});

// Save purchase log to localStorage
function savePurchase(customerCode, quantity, mails) {
  const timestamp = new Date().toISOString();
  const purchase = {
    customer_code: customerCode,
    quantity: quantity,
    mails: mails,
    timestamp: new Date().toLocaleString('vi-VN')
  };
  
  let purchaseLog = JSON.parse(localStorage.getItem('purchaseLog') || '[]');
  purchaseLog.push(purchase);
  localStorage.setItem('purchaseLog', JSON.stringify(purchaseLog));
} 