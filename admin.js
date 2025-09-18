// Admin Panel JavaScript for JufipAI Article Management
// This file handles authentication, article creation, and management

// Configuration
const ADMIN_PASSWORD = 'JufipAI2025!'; // Change this to your secure password
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'; // Will be updated with your script URL

// Initialize Quill Editor
let quill = null;

// Authentication State
let isAuthenticated = false;

// DOM Elements
const loginScreen = document.getElementById('loginScreen');
const adminPanel = document.getElementById('adminPanel');
const loginForm = document.getElementById('loginForm');
const passwordInput = document.getElementById('password');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');

// View Elements
const writeView = document.getElementById('writeView');
const manageView = document.getElementById('manageView');
const settingsView = document.getElementById('settingsView');

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Check if already authenticated (from localStorage)
    checkAuthentication();

    // Initialize event listeners
    initializeEventListeners();

    // Initialize Quill editor if authenticated
    if (isAuthenticated) {
        initializeQuillEditor();
        loadArticles();
    }
});

// Check authentication status
function checkAuthentication() {
    const savedAuth = localStorage.getItem('jufipai_admin_auth');
    const authExpiry = localStorage.getItem('jufipai_admin_expiry');

    if (savedAuth === 'true' && authExpiry) {
        const now = new Date().getTime();
        if (now < parseInt(authExpiry)) {
            showAdminPanel();
            return;
        }
    }

    // Clear expired auth
    localStorage.removeItem('jufipai_admin_auth');
    localStorage.removeItem('jufipai_admin_expiry');
}

// Initialize all event listeners
function initializeEventListeners() {
    // Login form
    loginForm.addEventListener('submit', handleLogin);

    // Logout button
    logoutBtn.addEventListener('click', handleLogout);

    // Menu navigation
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', handleMenuClick);
    });

    // Article form buttons
    const publishBtn = document.getElementById('publishBtn');
    const saveDraftBtn = document.getElementById('saveDraftBtn');

    if (publishBtn) {
        publishBtn.addEventListener('click', () => publishArticle('published'));
    }

    if (saveDraftBtn) {
        saveDraftBtn.addEventListener('click', () => publishArticle('draft'));
    }

    // Change password button
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', handleChangePassword);
    }
}

// Handle login submission
function handleLogin(e) {
    e.preventDefault();

    const password = passwordInput.value;

    if (password === ADMIN_PASSWORD) {
        // Set authentication in localStorage (expires in 24 hours)
        const expiry = new Date().getTime() + (24 * 60 * 60 * 1000);
        localStorage.setItem('jufipai_admin_auth', 'true');
        localStorage.setItem('jufipai_admin_expiry', expiry.toString());

        // Show admin panel
        showAdminPanel();

        // Clear password field
        passwordInput.value = '';
        loginError.style.display = 'none';
    } else {
        // Show error message
        loginError.style.display = 'block';
        passwordInput.classList.add('error');

        // Clear error after 3 seconds
        setTimeout(() => {
            loginError.style.display = 'none';
            passwordInput.classList.remove('error');
        }, 3000);
    }
}

// Show admin panel
function showAdminPanel() {
    isAuthenticated = true;
    loginScreen.style.display = 'none';
    adminPanel.style.display = 'block';

    // Initialize Quill editor
    if (!quill) {
        initializeQuillEditor();
    }

    // Load articles
    loadArticles();
}

// Handle logout
function handleLogout() {
    // Clear authentication
    localStorage.removeItem('jufipai_admin_auth');
    localStorage.removeItem('jufipai_admin_expiry');

    // Reset state
    isAuthenticated = false;

    // Show login screen
    loginScreen.style.display = 'flex';
    adminPanel.style.display = 'none';

    // Clear form data
    clearArticleForm();
}

// Handle menu navigation
function handleMenuClick(e) {
    const button = e.currentTarget;
    const view = button.dataset.view;

    // Update active menu item
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    button.classList.add('active');

    // Show corresponding view
    document.querySelectorAll('.admin-view').forEach(v => {
        v.style.display = 'none';
    });

    switch(view) {
        case 'write':
            writeView.style.display = 'block';
            break;
        case 'manage':
            manageView.style.display = 'block';
            loadArticles();
            break;
        case 'settings':
            settingsView.style.display = 'block';
            break;
    }
}

// Initialize Quill Rich Text Editor
function initializeQuillEditor() {
    quill = new Quill('#editor', {
        theme: 'snow',
        modules: {
            toolbar: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                ['blockquote', 'code-block'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                [{ 'script': 'sub'}, { 'script': 'super' }],
                [{ 'indent': '-1'}, { 'indent': '+1' }],
                [{ 'color': [] }, { 'background': [] }],
                [{ 'align': [] }],
                ['link', 'image', 'video'],
                ['clean']
            ]
        },
        placeholder: 'Start writing your article here...'
    });
}

// Publish or save article
async function publishArticle(status) {
    // Validate required fields
    const title = document.getElementById('articleTitle').value;
    const content = quill.root.innerHTML;

    if (!title || !content || content === '<p><br></p>') {
        showMessage('Please fill in required fields', 'error');
        return;
    }

    // Prepare article data
    const articleData = {
        title: title,
        author: document.getElementById('articleAuthor').value || 'JufipAI Team',
        category: document.getElementById('articleCategory').value,
        excerpt: document.getElementById('articleExcerpt').value,
        content: content,
        featuredImage: document.getElementById('featuredImage').value,
        metaDescription: document.getElementById('metaDescription').value,
        keywords: document.getElementById('keywords').value,
        status: status,
        publishDate: new Date().toISOString(),
        id: generateArticleId()
    };

    // Save to Google Sheets (or local storage for now)
    try {
        await saveArticle(articleData);

        // Show success message
        showMessage(`Article ${status === 'published' ? 'published' : 'saved as draft'} successfully!`, 'success');

        // Clear form if published
        if (status === 'published') {
            clearArticleForm();
        }

        // Update statistics
        updateStatistics();

    } catch (error) {
        console.error('Error saving article:', error);
        showMessage('Error saving article. Please try again.', 'error');
    }
}

// Save article to storage (Google Sheets via Apps Script)
async function saveArticle(articleData) {
    // For now, save to localStorage (will be replaced with Google Sheets integration)
    let articles = JSON.parse(localStorage.getItem('jufipai_articles') || '[]');

    // Check if updating existing article
    const existingIndex = articles.findIndex(a => a.id === articleData.id);
    if (existingIndex > -1) {
        articles[existingIndex] = articleData;
    } else {
        articles.push(articleData);
    }

    localStorage.setItem('jufipai_articles', JSON.stringify(articles));

    // TODO: Send to Google Sheets
    // await fetch(GOOGLE_SCRIPT_URL, {
    //     method: 'POST',
    //     body: JSON.stringify(articleData)
    // });
}

// Load articles for management view
function loadArticles() {
    // Load from localStorage (will be replaced with Google Sheets fetch)
    const articles = JSON.parse(localStorage.getItem('jufipai_articles') || '[]');

    // Update statistics
    const totalArticles = articles.length;
    const publishedArticles = articles.filter(a => a.status === 'published').length;
    const draftArticles = articles.filter(a => a.status === 'draft').length;

    document.getElementById('totalArticles').textContent = totalArticles;
    document.getElementById('publishedArticles').textContent = publishedArticles;
    document.getElementById('draftArticles').textContent = draftArticles;

    // Populate articles table
    const tableBody = document.getElementById('articlesTableBody');
    if (tableBody) {
        tableBody.innerHTML = '';

        articles.reverse().forEach(article => {
            const row = createArticleRow(article);
            tableBody.appendChild(row);
        });
    }
}

// Create article table row
function createArticleRow(article) {
    const row = document.createElement('tr');
    const publishDate = new Date(article.publishDate).toLocaleDateString();

    row.innerHTML = `
        <td>${article.title}</td>
        <td>${article.author}</td>
        <td><span class="category-badge">${article.category}</span></td>
        <td><span class="status-badge status-${article.status}">${article.status}</span></td>
        <td>${publishDate}</td>
        <td class="actions">
            <button class="action-btn edit" onclick="editArticle('${article.id}')" title="Edit">
                <i class="fas fa-edit"></i>
            </button>
            <button class="action-btn delete" onclick="deleteArticle('${article.id}')" title="Delete">
                <i class="fas fa-trash"></i>
            </button>
            <button class="action-btn view" onclick="viewArticle('${article.id}')" title="View">
                <i class="fas fa-eye"></i>
            </button>
        </td>
    `;

    return row;
}

// Edit article
function editArticle(articleId) {
    const articles = JSON.parse(localStorage.getItem('jufipai_articles') || '[]');
    const article = articles.find(a => a.id === articleId);

    if (article) {
        // Switch to write view
        document.querySelector('.menu-item[data-view="write"]').click();

        // Populate form with article data
        document.getElementById('articleTitle').value = article.title;
        document.getElementById('articleAuthor').value = article.author;
        document.getElementById('articleCategory').value = article.category;
        document.getElementById('articleExcerpt').value = article.excerpt || '';
        document.getElementById('featuredImage').value = article.featuredImage || '';
        document.getElementById('metaDescription').value = article.metaDescription || '';
        document.getElementById('keywords').value = article.keywords || '';

        // Set Quill content
        quill.root.innerHTML = article.content;

        // Store current article ID for update
        document.getElementById('articleTitle').dataset.articleId = articleId;
    }
}

// Delete article
function deleteArticle(articleId) {
    if (confirm('Are you sure you want to delete this article?')) {
        let articles = JSON.parse(localStorage.getItem('jufipai_articles') || '[]');
        articles = articles.filter(a => a.id !== articleId);
        localStorage.setItem('jufipai_articles', JSON.stringify(articles));

        // Reload articles
        loadArticles();

        // Show success message
        showMessage('Article deleted successfully', 'success');
    }
}

// View article (opens in new tab)
function viewArticle(articleId) {
    // Open article in main website
    window.open(`/?article=${articleId}`, '_blank');
}

// Clear article form
function clearArticleForm() {
    document.getElementById('articleTitle').value = '';
    document.getElementById('articleAuthor').value = 'JufipAI Team';
    document.getElementById('articleCategory').selectedIndex = 0;
    document.getElementById('articleExcerpt').value = '';
    document.getElementById('featuredImage').value = '';
    document.getElementById('metaDescription').value = '';
    document.getElementById('keywords').value = '';

    if (quill) {
        quill.setText('');
    }

    // Remove any stored article ID
    delete document.getElementById('articleTitle').dataset.articleId;
}

// Update statistics
function updateStatistics() {
    loadArticles();
}

// Generate unique article ID
function generateArticleId() {
    return 'article_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Show message toast
function showMessage(message, type = 'success') {
    const toast = document.getElementById('messageToast');
    const messageText = document.getElementById('messageText');
    const icon = toast.querySelector('i');

    // Update message and icon
    messageText.textContent = message;
    icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';

    // Update toast style
    toast.className = `message-toast ${type}`;
    toast.style.display = 'flex';

    // Auto-hide after 3 seconds
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}

// Handle password change
function handleChangePassword() {
    const newPassword = prompt('Enter new admin password:');
    if (newPassword && newPassword.length >= 8) {
        alert('Password change functionality requires backend implementation. For now, update ADMIN_PASSWORD in admin.js file.');
    } else if (newPassword) {
        alert('Password must be at least 8 characters long.');
    }
}

// Handle article search
document.getElementById('articleSearch')?.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#articlesTableBody tr');

    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
});