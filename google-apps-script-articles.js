// Google Apps Script for JufipAI Articles Management
// This script handles article storage and retrieval for the website
// Deploy this as a Web App with anonymous access

// Configuration - Update with your spreadsheet IDs
const CONTACT_SHEET_ID = '1jocedsBqwQY3yGsiFNrcCuGY88qoj5aVnRuY1E7KWro'; // Your existing contact form sheet
const ARTICLES_SHEET_ID = 'YOUR_ARTICLES_SHEET_ID_HERE'; // Create a new sheet for articles

// CORS Headers for web access
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

// Main request handler
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;

    let result;
    switch(action) {
      case 'saveArticle':
        result = saveArticle(data.article);
        break;
      case 'getArticles':
        result = getArticles(data.status);
        break;
      case 'getArticle':
        result = getArticle(data.id);
        break;
      case 'updateArticle':
        result = updateArticle(data.article);
        break;
      case 'deleteArticle':
        result = deleteArticle(data.id);
        break;
      case 'submitContact':
        result = submitContact(data.formData);
        break;
      default:
        result = { success: false, message: 'Invalid action' };
    }

    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(CORS_HEADERS);

  } catch (error) {
    console.error('Error in doPost:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(CORS_HEADERS);
  }
}

// Handle GET requests
function doGet(e) {
  try {
    const action = e.parameter.action;

    let result;
    switch(action) {
      case 'getArticles':
        result = getArticles(e.parameter.status);
        break;
      case 'getArticle':
        result = getArticle(e.parameter.id);
        break;
      case 'getPublishedArticles':
        result = getPublishedArticles();
        break;
      default:
        result = {
          success: true,
          message: 'JufipAI Articles API is running',
          endpoints: [
            'GET ?action=getArticles&status=[published|draft|all]',
            'GET ?action=getArticle&id=[articleId]',
            'GET ?action=getPublishedArticles',
            'POST with action: saveArticle, updateArticle, deleteArticle'
          ]
        };
    }

    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(CORS_HEADERS);

  } catch (error) {
    console.error('Error in doGet:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(CORS_HEADERS);
  }
}

// Save a new article
function saveArticle(article) {
  try {
    const sheet = SpreadsheetApp.openById(ARTICLES_SHEET_ID).getSheetByName('Articles') ||
                  SpreadsheetApp.openById(ARTICLES_SHEET_ID).insertSheet('Articles');

    // Set headers if this is the first article
    if (sheet.getLastRow() === 0) {
      const headers = [
        'ID', 'Title', 'Author', 'Category', 'Excerpt', 'Content',
        'Featured Image', 'Status', 'Publish Date', 'Meta Description',
        'Keywords', 'Views', 'Created At', 'Updated At'
      ];
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    }

    // Generate unique ID if not provided
    if (!article.id) {
      article.id = 'article_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Add timestamps
    const now = new Date().toISOString();
    article.createdAt = now;
    article.updatedAt = now;
    article.views = 0;

    // Prepare row data
    const rowData = [
      article.id,
      article.title,
      article.author || 'JufipAI Team',
      article.category,
      article.excerpt || '',
      article.content,
      article.featuredImage || '',
      article.status,
      article.publishDate || now,
      article.metaDescription || '',
      article.keywords || '',
      article.views,
      article.createdAt,
      article.updatedAt
    ];

    // Append to sheet
    sheet.appendRow(rowData);

    return {
      success: true,
      message: 'Article saved successfully',
      articleId: article.id
    };

  } catch (error) {
    console.error('Error saving article:', error);
    return {
      success: false,
      message: error.toString()
    };
  }
}

// Get all articles or filter by status
function getArticles(status = 'all') {
  try {
    const sheet = SpreadsheetApp.openById(ARTICLES_SHEET_ID).getSheetByName('Articles');

    if (!sheet || sheet.getLastRow() <= 1) {
      return {
        success: true,
        articles: []
      };
    }

    const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 14).getValues();
    const articles = [];

    data.forEach(row => {
      const article = {
        id: row[0],
        title: row[1],
        author: row[2],
        category: row[3],
        excerpt: row[4],
        content: row[5],
        featuredImage: row[6],
        status: row[7],
        publishDate: row[8],
        metaDescription: row[9],
        keywords: row[10],
        views: row[11],
        createdAt: row[12],
        updatedAt: row[13]
      };

      // Filter by status if specified
      if (status === 'all' || article.status === status) {
        articles.push(article);
      }
    });

    // Sort by publish date (newest first)
    articles.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

    return {
      success: true,
      articles: articles
    };

  } catch (error) {
    console.error('Error getting articles:', error);
    return {
      success: false,
      message: error.toString(),
      articles: []
    };
  }
}

// Get published articles for public display
function getPublishedArticles() {
  return getArticles('published');
}

// Get a single article by ID
function getArticle(id) {
  try {
    const sheet = SpreadsheetApp.openById(ARTICLES_SHEET_ID).getSheetByName('Articles');

    if (!sheet || sheet.getLastRow() <= 1) {
      return {
        success: false,
        message: 'Article not found'
      };
    }

    const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 14).getValues();

    for (let i = 0; i < data.length; i++) {
      if (data[i][0] === id) {
        // Increment view count
        sheet.getRange(i + 2, 12).setValue((data[i][11] || 0) + 1);

        return {
          success: true,
          article: {
            id: data[i][0],
            title: data[i][1],
            author: data[i][2],
            category: data[i][3],
            excerpt: data[i][4],
            content: data[i][5],
            featuredImage: data[i][6],
            status: data[i][7],
            publishDate: data[i][8],
            metaDescription: data[i][9],
            keywords: data[i][10],
            views: (data[i][11] || 0) + 1,
            createdAt: data[i][12],
            updatedAt: data[i][13]
          }
        };
      }
    }

    return {
      success: false,
      message: 'Article not found'
    };

  } catch (error) {
    console.error('Error getting article:', error);
    return {
      success: false,
      message: error.toString()
    };
  }
}

// Update an existing article
function updateArticle(article) {
  try {
    const sheet = SpreadsheetApp.openById(ARTICLES_SHEET_ID).getSheetByName('Articles');

    if (!sheet || sheet.getLastRow() <= 1) {
      return {
        success: false,
        message: 'Articles sheet not found'
      };
    }

    const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues();

    // Find the article row
    for (let i = 0; i < data.length; i++) {
      if (data[i][0] === article.id) {
        // Update the row
        const updatedRow = [
          article.id,
          article.title,
          article.author,
          article.category,
          article.excerpt,
          article.content,
          article.featuredImage,
          article.status,
          article.publishDate,
          article.metaDescription,
          article.keywords,
          sheet.getRange(i + 2, 12).getValue(), // Preserve view count
          sheet.getRange(i + 2, 13).getValue(), // Preserve created date
          new Date().toISOString() // Update timestamp
        ];

        sheet.getRange(i + 2, 1, 1, 14).setValues([updatedRow]);

        return {
          success: true,
          message: 'Article updated successfully'
        };
      }
    }

    return {
      success: false,
      message: 'Article not found'
    };

  } catch (error) {
    console.error('Error updating article:', error);
    return {
      success: false,
      message: error.toString()
    };
  }
}

// Delete an article
function deleteArticle(id) {
  try {
    const sheet = SpreadsheetApp.openById(ARTICLES_SHEET_ID).getSheetByName('Articles');

    if (!sheet || sheet.getLastRow() <= 1) {
      return {
        success: false,
        message: 'Articles sheet not found'
      };
    }

    const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues();

    // Find and delete the article row
    for (let i = 0; i < data.length; i++) {
      if (data[i][0] === id) {
        sheet.deleteRow(i + 2);
        return {
          success: true,
          message: 'Article deleted successfully'
        };
      }
    }

    return {
      success: false,
      message: 'Article not found'
    };

  } catch (error) {
    console.error('Error deleting article:', error);
    return {
      success: false,
      message: error.toString()
    };
  }
}

// Handle contact form submission (existing functionality)
function submitContact(formData) {
  try {
    const sheet = SpreadsheetApp.openById(CONTACT_SHEET_ID).getActiveSheet();

    const timestamp = new Date();
    const rowData = [
      formData['Full Name'] || '',
      formData['Email Address'] || '',
      formData['Company Name'] || '',
      formData['Project Description'] || '',
      timestamp
    ];

    sheet.appendRow(rowData);

    return {
      success: true,
      message: 'Contact form submitted successfully',
      timestamp: timestamp
    };

  } catch (error) {
    console.error('Error submitting contact:', error);
    return {
      success: false,
      message: error.toString()
    };
  }
}

// Test function for debugging
function testAPI() {
  // Test saving an article
  const testArticle = {
    title: 'Test Article',
    author: 'Admin',
    category: 'Technology',
    excerpt: 'This is a test article',
    content: '<p>Test content</p>',
    status: 'draft'
  };

  const saveResult = saveArticle(testArticle);
  console.log('Save result:', saveResult);

  const getResult = getArticles('all');
  console.log('Get articles result:', getResult);
}