
class AIAssistant {
  constructor(containerId) {
    this.containerId = containerId;

    // Configuration
    this.CHAT_API_URL = '/.netlify/functions/chat-proxy';
    this.SHEETS_API_URL = '/.netlify/functions/sheets-proxy';

    // Generate unique session ID
    this.sessionId = localStorage.getItem('chatSessionId') || 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('chatSessionId', this.sessionId);

    // State
    this.isOpen = false;
    this.unreadCount = 1;
    this.messages = [];
    this.isLoading = false;

    // Initialize with welcome message
    const welcomeMessage = {
        role: 'assistant',
        content: 'Welcome to Phyllon Tech. I\'m here to assist you with any questions you might have.',
        timestamp: new Date()
    };
    this.messages.push(welcomeMessage);

    this.init();
  }

  init() {
    this.render();
    this.setupEventListeners();
    this.updateBadge();
  }

  render() {
    const container = document.getElementById(this.containerId);
    if (!container) {
      console.error(`Container with id "${this.containerId}" not found`);
      return;
    }

    container.innerHTML = `
      <!-- Chatbot Button -->
      <button
        id="chatbotButton"
        class="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-14 h-14 sm:w-16 sm:h-16 bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 group"
        aria-label="Open chat"
      >
        <!-- Chat Icon -->
        <svg id="chatIcon" class="w-7 h-7 sm:w-8 sm:h-8 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>

        <!-- Close Icon (hidden by default) -->
        <svg id="closeIcon" class="w-7 h-7 sm:w-8 sm:h-8 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>

        <!-- Unread Badge -->
        <span
            id="unreadBadge"
            class="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-accent text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse"
        >
            1
        </span>
      </button>

      <!-- Chat Modal -->
      <div
        id="chatModal"
        class="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 w-[calc(100vw-2rem)] sm:w-96 h-[70vh] sm:h-[500px] max-h-[600px] bg-white dark:bg-dark rounded-xl shadow-2xl z-50 hidden flex-col overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 transform scale-95 opacity-0"
      >
        <!-- Chat Header -->
        <div class="bg-primary text-white p-4 flex items-center justify-between shrink-0">
            <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
            </div>
            <div>
                <h3 class="font-display font-semibold">AI Assistant</h3>
                <p class="text-xs text-white/80">Always here to help</p>
            </div>
            </div>
            <button
            id="closeModal"
            class="p-1 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Close chat"
            >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
            </button>
        </div>

        <!-- Chat Messages -->
        <div id="chatMessages" class="flex-1 overflow-y-auto p-4 space-y-4 chat-messages bg-gray-50 dark:bg-background-dark">
            <!-- Messages will be inserted here -->
        </div>

        <!-- Typing Indicator -->
        <div id="typingIndicator" class="hidden px-4 py-2 bg-gray-50 dark:bg-background-dark">
            <div class="flex items-center space-x-2">
            <div class="w-8 h-8 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
                <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
            </div>
            <div class="bg-white dark:bg-dark px-4 py-2 rounded-xl rounded-bl-none shadow-sm">
                <div class="typing-indicator flex space-x-1">
                <span class="w-2 h-2 bg-gray-400 rounded-full"></span>
                <span class="w-2 h-2 bg-gray-400 rounded-full"></span>
                <span class="w-2 h-2 bg-gray-400 rounded-full"></span>
                </div>
            </div>
            </div>
        </div>

        <!-- Chat Input -->
        <div class="p-4 bg-white dark:bg-dark border-t border-gray-200 dark:border-gray-700 shrink-0">
            <form id="chatForm" class="flex items-center space-x-2">
            <input
                type="text"
                id="messageInput"
                placeholder="Type your message..."
                class="flex-1 px-4 py-2 bg-gray-100 dark:bg-background-dark text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                autocomplete="off"
            >
            <button
                type="submit"
                id="sendButton"
                class="p-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
            >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
            </button>
            </form>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    // DOM Elements - assign to instance properties
    this.chatbotButton = document.getElementById('chatbotButton');
    this.chatModal = document.getElementById('chatModal');
    this.closeModal = document.getElementById('closeModal');
    this.chatForm = document.getElementById('chatForm');
    this.messageInput = document.getElementById('messageInput');
    this.chatMessages = document.getElementById('chatMessages');
    this.unreadBadge = document.getElementById('unreadBadge');
    this.chatIcon = document.getElementById('chatIcon');
    this.closeIcon = document.getElementById('closeIcon');
    this.typingIndicator = document.getElementById('typingIndicator');
    this.sendButton = document.getElementById('sendButton');

    // Event listeners
    this.chatbotButton?.addEventListener('click', () => this.toggleChat());
    this.closeModal?.addEventListener('click', () => this.toggleChat());
    this.chatForm?.addEventListener('submit', (e) => this.handleSubmit(e));

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen) {
          this.toggleChat();
        }
    });

    // Handle enter key in input
    this.messageInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.chatForm.dispatchEvent(new Event('submit'));
        }
    });
  }

  // Toggle chat modal
  toggleChat() {
      this.isOpen = !this.isOpen;

      if (this.isOpen) {
        this.chatModal.classList.remove('hidden');
        this.chatModal.classList.add('flex');

        // Animate in
        setTimeout(() => {
            this.chatModal.classList.remove('scale-95', 'opacity-0');
            this.chatModal.classList.add('scale-100', 'opacity-100');
        }, 10);

        // Update icons
        this.chatIcon.classList.add('hidden');
        this.closeIcon.classList.remove('hidden');

        // Clear unread count
        this.unreadCount = 0;
        this.updateBadge();

        // Render messages
        this.renderMessages();

        // Focus input (only on non-mobile screens)
        setTimeout(() => {
            if (window.innerWidth >= 768) {
                this.messageInput.focus();
            }
        }, 300);
      } else {
        this.chatModal.classList.add('scale-95', 'opacity-0');
        this.chatModal.classList.remove('scale-100', 'opacity-100');

        setTimeout(() => {
            this.chatModal.classList.add('hidden');
            this.chatModal.classList.remove('flex');
        }, 300);

        // Update icons
        this.chatIcon.classList.remove('hidden');
        this.closeIcon.classList.add('hidden');
      }
  }

  // Update badge
  updateBadge() {
      if (this.unreadCount > 0) {
        this.unreadBadge.textContent = this.unreadCount > 9 ? '9+' : this.unreadCount;
        this.unreadBadge.classList.remove('hidden');
      } else {
        this.unreadBadge.classList.add('hidden');
      }
  }

  // Render messages
  renderMessages() {
      this.chatMessages.innerHTML = this.messages.map(msg => this.createMessageHTML(msg)).join('');
      this.scrollToBottom();
  }

  // Create message HTML
  createMessageHTML(message) {
      const isUser = message.role === 'user';
      const time = this.formatTime(message.timestamp);

      if (isUser) {
        return `
            <div class="flex justify-end">
            <div class="max-w-[80%]">
                <div class="bg-primary text-white px-4 py-2 rounded-xl rounded-br-none shadow-sm">
                <p class="text-sm">${this.escapeHTML(message.content)}</p>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">${time}</p>
            </div>
            </div>
        `;
      } else {
        return `
            <div class="flex items-start space-x-2">
            <div class="w-8 h-8 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
            </div>
            <div class="max-w-[80%]">
                <div class="bg-white dark:bg-dark px-4 py-2 rounded-xl rounded-bl-none shadow-sm border border-gray-100 dark:border-gray-700">
                <p class="text-sm text-gray-800 dark:text-gray-200">${this.escapeHTML(message.content)}</p>
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">${time}</p>
            </div>
            </div>
        `;
      }
  }

  // Format time
  formatTime(date) {
      return new Date(date).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
  }

  // Escape HTML
  escapeHTML(str) {
      const div = document.createElement('div');
      div.textContent = str;
      return div.innerHTML;
  }

  // Scroll to bottom
  scrollToBottom() {
      this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
  }

  // Show typing indicator
  showTyping() {
      this.typingIndicator.classList.remove('hidden');
      this.scrollToBottom();
  }

  // Hide typing indicator
  hideTyping() {
      this.typingIndicator.classList.add('hidden');
  }

  // Send conversation data to Google Sheets
  async sendToSheets(userMessage, aiResponse) {
      try {
          const response = await fetch(this.SHEETS_API_URL, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  timestamp: new Date().toISOString(),
                  userMessage: userMessage,
                  aiResponse: aiResponse,
                  sessionId: this.sessionId,
                  userAgent: navigator.userAgent
              })
          });

          if (!response.ok) {
              throw new Error('Sheets API request failed');
          }

          const data = await response.json();
      } catch (error) {
          console.error('Sheets API Error:', error);
      }
  }

  // Send message to DeepInfra API
  async sendToAPI(userMessage) {
      const conversationHistory = this.messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      try {
        const response = await fetch(this.CHAT_API_URL, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            messages: conversationHistory
            })
        });

        if (!response.ok) {
            throw new Error('API request failed');
        }

        const data = await response.json();
        return data.content;
      } catch (error) {
        console.error('API Error:', error);
        return 'I apologize, but I\'m having trouble connecting right now. Please try again in a moment.';
      }
  }

  // Handle form submission
  async handleSubmit(e) {
      e.preventDefault();

      const content = this.messageInput.value.trim();
      if (!content || this.isLoading) return;

      // Add user message
      const userMessage = {
        role: 'user',
        content: content,
        timestamp: new Date()
      };
      this.messages.push(userMessage);
      this.renderMessages();

      // Clear input
      this.messageInput.value = '';

      // Disable input while loading
      this.isLoading = true;
      this.messageInput.disabled = true;
      this.sendButton.disabled = true;

      // Show typing indicator
      this.showTyping();

      // Get AI response
      const aiResponse = await this.sendToAPI(content);

      // Hide typing indicator
      this.hideTyping();

      // Add AI message
      const assistantMessage = {
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      };
      this.messages.push(assistantMessage);

      // Send conversation data to Google Sheets (async, don't wait)
      this.sendToSheets(content, aiResponse);

      // Update unread if chat is closed
      if (!this.isOpen) {
        this.unreadCount++;
        this.updateBadge();
      }

      this.renderMessages();

      // Re-enable input
      this.isLoading = false;
      this.messageInput.disabled = false;
      this.sendButton.disabled = false;
      this.messageInput.focus();
  }
}

// Auto-initialize AIAssistant on DOM content loaded
document.addEventListener('DOMContentLoaded', function() {
  new AIAssistant('ai-assistant-container');
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AIAssistant;
}