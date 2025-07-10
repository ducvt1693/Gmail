document.addEventListener('DOMContentLoaded', () => {
  // Get purchase data from localStorage
  const purchaseData = JSON.parse(localStorage.getItem('currentPurchase') || '{}');
  
  if (!purchaseData.customerCode) {
    // No purchase data found, redirect to home
    window.location.href = 'index.html';
    return;
  }
  
  // Display customer code and mail count
  document.getElementById('customerCode').textContent = `Khách hàng: ${purchaseData.customerCode}`;
  document.getElementById('mailCount').textContent = `Đã mua ${purchaseData.quantity} mail`;
  
  // Display purchased mails
  const mailListContainer = document.getElementById('mailList');
  purchaseData.mails.forEach(mail => {
    const mailItem = document.createElement('div');
    mailItem.classList.add('mail-item');
    mailItem.textContent = mail;
    mailListContainer.appendChild(mailItem);
  });
  
  // Handle download button
  document.getElementById('downloadBtn').addEventListener('click', () => {
    // Create text content
    const content = purchaseData.mails.join('\n');
    
    // Create download link
    const element = document.createElement('a');
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'mails_purchased.txt';
    
    // Trigger download
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  });
}); 