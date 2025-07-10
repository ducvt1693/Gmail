// Store for emails loaded from file
let mails = [];

// Customer codes
const validCustomerCodes = ["telegramMail"];

// Fetch emails from file on load
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('emails.txt');
    if (!response.ok) {
      throw new Error('Failed to load emails file');
    }
    
    const emailText = await response.text();
    mails = emailText.split('\n').filter(email => email.trim() !== '');
    
    // Update mail count
    const mailCountElement = document.getElementById('mailCount');
    mailCountElement.textContent = mails.length;
    
    // Set max quantity to available mail count
    const quantityInput = document.getElementById('quantity');
    quantityInput.max = mails.length;
  } catch (error) {
    console.error('Error loading emails:', error);
    alert('Không thể tải danh sách email. Vui lòng thử lại sau.');
  }
});

// Handle form submission
document.getElementById('purchaseForm').addEventListener('submit', async (event) => {
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
  
  // Update mails array (removing purchased emails)
  mails = mails.slice(quantity);
  
  // Update emails.txt via GitHub API (will be implemented in admin panel)
  
  // Save purchase to localStorage
  savePurchase(customerCode, quantity, purchasedMails);
  
  // Redirect to success page with data
  const purchaseData = {
    customerCode: customerCode,
    quantity: quantity,
    mails: purchasedMails,
    remainingEmails: mails
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