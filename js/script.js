// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Add mobile navigation functionality
    const hamburgerMenu = document.createElement('div');
    hamburgerMenu.className = 'hamburger-menu';
    hamburgerMenu.innerHTML = '<span></span><span></span><span></span>';
    
    const nav = document.querySelector('nav');
    const header = document.querySelector('header .container');
    
    if (header && nav) {
        header.insertBefore(hamburgerMenu, nav);
        
        hamburgerMenu.addEventListener('click', function() {
            nav.classList.toggle('active');
            hamburgerMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !hamburgerMenu.contains(e.target) && nav.classList.contains('active')) {
                nav.classList.remove('active');
                hamburgerMenu.classList.remove('active');
            }
        });
    }
    
    // Handle dropdown menus for all navigation items
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        
        // For mobile: toggle dropdown on click
        link.addEventListener('click', function(e) {
            // If it has dropdown content, prevent default action on mobile
            if (dropdown.querySelector('.dropdown-content') && window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
                
                // Close other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                    }
                });
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
    
    // Enhanced 3D Book Effects
    const books = document.querySelectorAll('.book');
    books.forEach(book => {
        book.addEventListener('mousemove', function(e) {
            // Get position of mouse relative to the book
            const rect = book.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top;  // y position within the element
            
            // Calculate rotation based on mouse position
            const xRotation = ((y - rect.height / 2) / rect.height) * 20;
            const yRotation = ((rect.width / 2 - x) / rect.width) * 20;
            
            // Apply the rotation and other 3D effects
            book.style.transform = `
                translateY(-10px)
                rotateX(${xRotation}deg)
                rotateY(${yRotation}deg)
                scale3d(1.05, 1.05, 1.05)
            `;
            
            // Add lighting effect
            const shine = book.querySelector('::before');
            if (shine) {
                const px = Math.floor((x / rect.width) * 100);
                const py = Math.floor((y / rect.height) * 100);
                shine.style.background = `radial-gradient(circle at ${px}% ${py}%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 80%)`;
            }
        });
        
        // Reset transform when mouse leaves
        book.addEventListener('mouseleave', () => {
            book.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
        
        // Add click effect for books
        book.addEventListener('click', function() {
            // Add a class to trigger page flip animation
            book.classList.add('flipping');
            
            // Reset background when mouse leaves
            document.addEventListener('mouseleave', function() {
                document.body.style.background = '#f9f9f9';
            });
            
            // Reset background when mouse leaves
            document.addEventListener('mouseleave', function() {
                document.body.style.background = '#f9f9f9';
            });
            
            // Remove the class after animation completes
            setTimeout(() => {
                book.classList.remove('flipping');
            }, 1000);
        });
    });
    
    // 3D effect for categories
    const categories = document.querySelectorAll('.category');
    categories.forEach(category => {
        category.addEventListener('mousemove', function(e) {
            const rect = category.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xRotation = ((y - rect.height / 2) / rect.height) * 10;
            const yRotation = ((rect.width / 2 - x) / rect.width) * 10;
            
            category.style.transform = `
                translateY(-5px)
                translateZ(20px)
                rotateX(${xRotation}deg)
                rotateY(${yRotation}deg)
            `;
            
            // Move the icon for extra depth
            const icon = category.querySelector('i');
            if (icon) {
                icon.style.transform = `translateZ(40px) translate(${yRotation}px, ${-xRotation}px)`;
            }
        });
        
        category.addEventListener('mouseleave', () => {
            category.style.transform = '';
            const icon = category.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateZ(30px)';
            }
        });
    });
    
    // 3D effect for authors
    const authors = document.querySelectorAll('.author');
    authors.forEach(author => {
        author.addEventListener('mousemove', function(e) {
            const rect = author.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xRotation = ((y - rect.height / 2) / rect.height) * 10;
            const yRotation = ((rect.width / 2 - x) / rect.width) * 10;
            
            author.style.transform = `
                translateY(-5px)
                translateZ(20px)
                rotateX(${xRotation}deg)
                rotateY(${yRotation}deg)
            `;
        });
        
        author.addEventListener('mouseleave', () => {
            author.style.transform = '';
        });
    });
    
    // Search functionality placeholder
    const searchBar = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    
    searchButton.addEventListener('click', function() {
        const searchTerm = searchBar.value.trim();
        if (searchTerm) {
            // Implement search functionality
            console.log('Searching for:', searchTerm);
            // In a real application, you would redirect to search results or filter content
        }
    });
    
    // Allow search on Enter key press
    searchBar.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchButton.click();
        }
    });
    
    // Add page transition effects
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            // Only apply to internal links
            if (link.getAttribute('href').startsWith('#') || 
                link.getAttribute('href') === '' || 
                link.getAttribute('href').startsWith('/')) {
                
                e.preventDefault();
                const href = link.getAttribute('href');
                
                // Add transition effect to the body
                document.body.classList.add('page-transition');
                
                // Navigate after transition
                setTimeout(() => {
                    window.location.href = href;
                }, 500);
            }
        });
    });
    
    // Add CSS class for page transition
    const style = document.createElement('style');
    style.textContent = `
        .page-transition {
            animation: pageTransition 0.5s ease-out;
        }
        
        @keyframes pageTransition {
            0% {
                opacity: 1;
                transform: translateZ(0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateZ(-100px) scale(0.9);
            }
        }
        
        .book.flipping {
            animation: pageFlip 1s ease-in-out;
        }
    `;
    document.head.appendChild(style);
});

// Book Preview Functionality
const bookPreviewModal = document.getElementById('bookPreviewModal');
const closeBtn = document.querySelector('.close');

// Hindi books ISBNs (you can add more)
// Update the hindiBooks object to include image paths
const hindiBooks = {
  'गोदान': {
    isbn: 'ISBN:0143100803',
    image: 'images/books/godan.jpg'
  },
  'नीला चाँद': {
    isbn: 'ISBN:8171192477',
    image: 'images/books/nila-chand.jpg'
  },
  'मैला आँचल': {
    isbn: 'ISBN:8171192477', 
    image: 'images/books/maila-anchal.jpg'
  }
  // Add more books with images
};

function previewBook(bookTitle) {
  const isbn = hindiBooks[bookTitle];
  if (isbn) {
    bookPreviewModal.style.display = 'block';
    const viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
    viewer.load(isbn);
  }
}

// Modify the previewBook function to show images
function previewBook(bookTitle) {
  const book = hindiBooks[bookTitle];
  if (book) {
    bookPreviewModal.style.display = 'block';
    const viewerCanvas = document.getElementById('viewerCanvas');
    
    // Clear previous content
    viewerCanvas.innerHTML = '';
    
    // Add book cover image
    const img = document.createElement('img');
    img.src = book.image;
    img.alt = bookTitle;
    img.style.maxWidth = '100%';
    img.style.maxHeight = '100%';
    viewerCanvas.appendChild(img);
    
    // You can still keep the Google Books viewer as fallback
    try {
      const viewer = new google.books.DefaultViewer(viewerCanvas);
      viewer.load(book.isbn);
    } catch (e) {
      console.log('Google Books viewer not available, using image instead');
    }
  }
}

// Close modal
closeBtn.onclick = function() {
  bookPreviewModal.style.display = 'none';
}

// Close when clicking outside
window.onclick = function(event) {
  if (event.target == bookPreviewModal) {
    bookPreviewModal.style.display = 'none';
  }
}

// Add preview buttons to book elements
document.querySelectorAll('.book').forEach(book => {
  const title = book.querySelector('h3').textContent;
  if (hindiBooks[title]) {
    const previewBtn = document.createElement('button');
    previewBtn.className = 'preview-btn';
    previewBtn.innerHTML = '<i class="fas fa-book-open"></i> पूर्वावलोकन';
    previewBtn.onclick = () => previewBook(title);
    book.appendChild(previewBtn);
  }
});

// Chatbot functionality
const chatbotToggler = document.querySelector('.chatbot-toggler');
const chatbotContainer = document.querySelector('.chatbot-container');
const closeChatbot = document.querySelector('.close-chatbot');
const chatInput = document.querySelector('.chatbot-input input');
const sendBtn = document.querySelector('.send-btn');
const chatMessages = document.querySelector('.chatbot-messages');

// Toggle chatbot
chatbotToggler.addEventListener('click', () => {
  chatbotContainer.classList.toggle('active');
});

// Close chatbot
closeChatbot.addEventListener('click', () => {
  chatbotContainer.classList.remove('active');
});

// Hindi responses for the bot
const hindiResponses = {
  "नमस्ते": "नमस्ते! मैं हिंदी साहित्य सहायक हूँ। आपकी क्या सहायता कर सकता हूँ?",
  "किताबें": "हमारे पास विभिन्न हिंदी पुस्तकें उपलब्ध हैं। आप किस प्रकार की पुस्तक ढूंढ रहे हैं?",
  "लेखक": "हमारे पास प्रेमचंद, महादेवी वर्मा, निराला जैसे प्रसिद्ध हिंदी लेखकों की पुस्तकें हैं।",
  "साहित्य": "हिंदी साहित्य की विभिन्न विधाएँ जैसे उपन्यास, कहानी, कविता आदि उपलब्ध हैं।",
  "धन्यवाद": "आपका धन्यवाद! हमें आपकी सहायता करके खुशी हुई।"
};

// Create chat message
function createMessage(text, isUser) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');
  messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
  messageDiv.textContent = text;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Handle user input
function handleUserInput() {
  const userMessage = chatInput.value.trim();
  if (userMessage) {
    createMessage(userMessage, true);
    chatInput.value = '';
    
    // Simple response logic
    setTimeout(() => {
      let botResponse = "मैं आपके प्रश्न को समझ नहीं पाया। कृपया कोई अन्य प्रश्न पूछें।";
      
      for (const [key, value] of Object.entries(hindiResponses)) {
        if (userMessage.includes(key)) {
          botResponse = value;
          break;
        }
      }
      
      createMessage(botResponse, false);
    }, 1000);
  }
}

// Send message on button click
sendBtn.addEventListener('click', handleUserInput);

// Send message on Enter key
chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    handleUserInput();
  }
});

// Initial greeting
window.addEventListener('load', () => {
  setTimeout(() => {
    createMessage("नमस्ते! मैं हिंदी साहित्य सहायक हूँ। आपकी क्या सहायता कर सकता हूँ?", false);
  }, 1000);
});

// Add this to create an author image gallery
const authors = [
  {
    name: "प्रेमचंद",
    image: "images/authors/premchand.jpg",
    bio: "हिंदी के महान उपन्यासकार"
  },
  // Add more authors
];

function createAuthorGallery() {
  const gallerySection = document.createElement('section');
  gallerySection.className = 'author-gallery';
  
  authors.forEach(author => {
    const authorCard = document.createElement('div');
    authorCard.className = 'author-card';
    
    authorCard.innerHTML = `
      <img src="${author.image}" alt="${author.name}" class="author-image">
      <h3>${author.name}</h3>
      <p>${author.bio}</p>
    `;
    
    gallerySection.appendChild(authorCard);
  });
  
  document.querySelector('#authors').appendChild(gallerySection);
}

// Call this on page load
document.addEventListener('DOMContentLoaded', createAuthorGallery);