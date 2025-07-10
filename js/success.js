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
    
    // Create admin file update button if needed
    if (!document.getElementById('updateEmailsBtn') && purchaseData.remainingEmails) {
      createAdminUpdateButton(purchaseData.remainingEmails);
    }
  });
});

// Function to create admin update button
function createAdminUpdateButton(remainingEmails) {
  const actionsDiv = document.querySelector('.actions');
  
  const updateBtn = document.createElement('button');
  updateBtn.id = 'updateEmailsBtn';
  updateBtn.className = 'btn admin-btn';
  updateBtn.textContent = '🔄 Cập nhật file emails.txt (ADMIN)';
  
  updateBtn.addEventListener('click', () => {
    // Create the remaining emails content
    const content = remainingEmails.join('\n');
    
    // Create download link for admin to update manually
    const element = document.createElement('a');
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'emails.txt';
    
    // Show instructions
    alert('Tải file emails.txt mới và thay thế file cũ trong repository GitHub của bạn để cập nhật danh sách email.');
    
    // Trigger download
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  });
  
  actionsDiv.appendChild(updateBtn);
} 