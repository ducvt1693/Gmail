# Email Store System

This is an automatic email store system that manages emails stored in a text file. When customers make a purchase, emails are automatically removed from the available pool.

## How It Works

1. **Storage**: Emails are stored in `emails.txt` file in the root directory
2. **Purchase Process**: 
   - Customers enter their code and desired quantity
   - System checks if enough emails are available
   - If valid, the system provides the emails and updates the list
3. **Admin Management**:
   - View purchase history and statistics
   - Download current email list
   - Add new emails to the system

## Important Notes for GitHub Pages

Since GitHub Pages is a static hosting service, the system requires manual updates to the `emails.txt` file after purchases. After a purchase is made:

1. The system will generate an updated `emails.txt` file for download
2. Admin must download this file and replace the existing one in the GitHub repository
3. After committing the changes, the updated list will be available for future purchases

## Features

- Email inventory management
- Purchase tracking
- Customer verification via codes
- Admin dashboard with statistics
- Easy email list update system

## How to Add New Emails

1. Go to the Admin page
2. Click "Add email mới" button
3. Enter emails (one per line) in the textarea
4. Click "Lưu email" button
5. Download the generated `emails.txt` file
6. Replace the existing file in your GitHub repository

## Requirements

- A web browser with JavaScript enabled
- GitHub Pages for hosting
- Manual updates to `emails.txt` after purchases 