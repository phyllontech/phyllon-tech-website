
// Configuration
const DEEPINFRA_API_KEY = import.meta.env.VITE_DEEPINFRA_API_KEY || 
                          localStorage.getItem('DEEPINFRA_API_KEY') || 
                          '';
const DEEPINFRA_API_URL = import.meta.env.VITE_DEEPINFRA_API_URL || 
                          'https://api.deepinfra.com/v1/openai/chat/completions';
const MODEL = import.meta.env.VITE_MODEL || 
              'meta-llama/Meta-Llama-3-8B-Instruct';

// DOM Elements
const chatbotButton = document.getElementById('chatbotButton');
const chatModal = document.getElementById('chatModal');
const closeModal = document.getElementById('closeModal');
const chatForm = document.getElementById('chatForm');
const messageInput = document.getElementById('messageInput');
const chatMessages = document.getElementById('chatMessages');
const unreadBadge = document.getElementById('unreadBadge');
const chatIcon = document.getElementById('chatIcon');
const closeIcon = document.getElementById('closeIcon');
const typingIndicator = document.getElementById('typingIndicator');
const sendButton = document.getElementById('sendButton');

// State
let isOpen = false;
let unreadCount = 1;
let messages = [];
let isLoading = false;

// Initialize with welcome message
const welcomeMessage = {
    role: 'assistant',
    content: 'Hello! 👋 How may I help you today? I\'m here to assist you with any questions you might have.',
    timestamp: new Date()
};
messages.push(welcomeMessage);

// Toggle chat modal
function toggleChat() {
    isOpen = !isOpen;
    
    if (isOpen) {
    chatModal.classList.remove('hidden');
    chatModal.classList.add('flex');
    
    // Animate in
    setTimeout(() => {
        chatModal.classList.remove('scale-95', 'opacity-0');
        chatModal.classList.add('scale-100', 'opacity-100');
    }, 10);
    
    // Update icons
    chatIcon.classList.add('hidden');
    closeIcon.classList.remove('hidden');
    
    // Clear unread count
    unreadCount = 0;
    updateBadge();
    
    // Render messages
    renderMessages();
    
    // Focus input
    setTimeout(() => messageInput.focus(), 300);
    } else {
    chatModal.classList.add('scale-95', 'opacity-0');
    chatModal.classList.remove('scale-100', 'opacity-100');
    
    setTimeout(() => {
        chatModal.classList.add('hidden');
        chatModal.classList.remove('flex');
    }, 300);
    
    // Update icons
    chatIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
    }
}

// Update badge
function updateBadge() {
    if (unreadCount > 0) {
    unreadBadge.textContent = unreadCount > 9 ? '9+' : unreadCount;
    unreadBadge.classList.remove('hidden');
    } else {
    unreadBadge.classList.add('hidden');
    }
}

// Render messages
function renderMessages() {
    chatMessages.innerHTML = messages.map(msg => createMessageHTML(msg)).join('');
    scrollToBottom();
}

// Create message HTML
function createMessageHTML(message) {
    const isUser = message.role === 'user';
    const time = formatTime(message.timestamp);
    
    if (isUser) {
    return `
        <div class="flex justify-end">
        <div class="max-w-[80%]">
            <div class="bg-primary text-white px-4 py-2 rounded-xl rounded-br-none shadow-sm">
            <p class="text-sm">${escapeHTML(message.content)}</p>
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
            <p class="text-sm text-gray-800 dark:text-gray-200">${escapeHTML(message.content)}</p>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">${time}</p>
        </div>
        </div>
    `;
    }
}

// Format time
function formatTime(date) {
    return new Date(date).toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
    });
}

// Escape HTML
function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

// Scroll to bottom
function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show typing indicator
function showTyping() {
    typingIndicator.classList.remove('hidden');
    scrollToBottom();
}

// Hide typing indicator
function hideTyping() {
    typingIndicator.classList.add('hidden');
}

// Send message to DeepInfra API
async function sendToAPI(userMessage) {
    const conversationHistory = messages.map(msg => ({
    role: msg.role,
    content: msg.content
    }));

    try {
    const response = await fetch(DEEPINFRA_API_URL, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPINFRA_API_KEY}`
        },
        body: JSON.stringify({
        model: MODEL,
        messages: [
            {
            role: 'system',
            content: 'You are Phyllon Tech\'s AI assistant. Phyllon Tech provides AI-powered business automation and web development services.\n\nOur services include:\n1. Business Website Development - Clean, fast, mobile-responsive websites with contact forms, WhatsApp integration, and SEO optimization\n2. 24/7 WhatsApp AI Receptionist - Automated customer responses, CRM integration, conversation analytics, and seamless human handoff\n3. Custom Business Dashboard - Secure role-based access, data management panels, analytics, and custom features\n4. AI Voice Agent - Automated call handling, lead qualification, CRM/WhatsApp handoff, 100+ languages supported\n\nContact: WhatsApp +91-8097137041, Email: phyllontechofficial@gmail.com\nWebsite: phyllontech.com\n\nBenefits: Fast delivery, ongoing support, custom solutions, 24/7 automation\nBe professional yet approachable. Focus on how our solutions help businesses grow and save time. For pricing or specific implementation details, direct customers to contact us via WhatsApp or email.'
            },
            ...conversationHistory
        ],
        max_tokens: 500,
        temperature: 0.7
        })
    });

    if (!response.ok) {
        throw new Error('API request failed');
    }

    const data = await response.json();
    return data.choices[0].message.content;
    } catch (error) {
    console.error('API Error:', error);
    return 'I apologize, but I\'m having trouble connecting right now. Please try again in a moment.';
    }
}

// Handle form submission
async function handleSubmit(e) {
    e.preventDefault();
    
    const content = messageInput.value.trim();
    if (!content || isLoading) return;

    // Add user message
    const userMessage = {
    role: 'user',
    content: content,
    timestamp: new Date()
    };
    messages.push(userMessage);
    renderMessages();
    
    // Clear input
    messageInput.value = '';
    
    // Disable input while loading
    isLoading = true;
    messageInput.disabled = true;
    sendButton.disabled = true;
    
    // Show typing indicator
    showTyping();
    
    // Get AI response
    const aiResponse = await sendToAPI(content);
    
    // Hide typing indicator
    hideTyping();
    
    // Add AI message
    const assistantMessage = {
    role: 'assistant',
    content: aiResponse,
    timestamp: new Date()
    };
    messages.push(assistantMessage);
    
    // Update unread if chat is closed
    if (!isOpen) {
    unreadCount++;
    updateBadge();
    }
    
    renderMessages();
    
    // Re-enable input
    isLoading = false;
    messageInput.disabled = false;
    sendButton.disabled = false;
    messageInput.focus();
}

// Event listeners
chatbotButton.addEventListener('click', toggleChat);
closeModal.addEventListener('click', toggleChat);
chatForm.addEventListener('submit', handleSubmit);

// Close on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) {
    toggleChat();
    }
});

// Handle enter key in input
messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    chatForm.dispatchEvent(new Event('submit'));
    }
});

// Initialize badge on load
updateBadge();

// Check for system dark mode preference
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
}