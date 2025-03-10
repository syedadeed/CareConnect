// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the chat widget
    initChatWidget();
});

// Initialize the chat widget
function initChatWidget() {
    const chatButton = document.getElementById('chat-button');
    const chatContainer = document.getElementById('chat-container');
    const closeChat = document.getElementById('close-chat');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.getElementById('chat-input-field');
    const sendMessage = document.getElementById('send-message');
    
    if (!chatButton || !chatContainer || !closeChat || !chatMessages || !chatInput || !sendMessage) {
        console.error('Chat elements not found');
        return;
    }
    
    // Toggle chat container visibility when chat button is clicked
    chatButton.addEventListener('click', function() {
        chatContainer.style.display = 'flex';
        chatButton.style.display = 'none';
        chatInput.focus();
    });
    
    // Hide chat container when close button is clicked
    closeChat.addEventListener('click', function() {
        chatContainer.style.display = 'none';
        chatButton.style.display = 'flex';
    });
    
    // Send message when send button is clicked
    sendMessage.addEventListener('click', function() {
        sendUserMessage();
    });
    
    // Send message when Enter key is pressed in the input field
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendUserMessage();
        }
    });
    
    // Function to send a user message
    function sendUserMessage() {
        const message = chatInput.value.trim();
        
        if (message === '') return;
        
        // Add user message to chat
        addMessage(message, 'user');
        
        // Clear input field
        chatInput.value = '';
        
        // Simulate response (in a real app, this would be an API call)
        setTimeout(() => {
            // Show typing indicator
            showTypingIndicator();
            
            // Process the message and get a response
            setTimeout(() => {
                // Remove typing indicator
                removeTypingIndicator();
                
                // Add support response
                const response = getChatbotResponse(message);
                addMessage(response, 'support');
            }, 1500);
        }, 500);
    }
    
    // Function to add a message to the chat
    function addMessage(text, type) {
        const messageElement = document.createElement('div');
        messageElement.className = `message ${type}`;
        messageElement.textContent = text;
        
        chatMessages.appendChild(messageElement);
        
        // Scroll to the bottom of the chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Function to show typing indicator
    function showTypingIndicator() {
        const typingElement = document.createElement('div');
        typingElement.className = 'message support typing-indicator';
        typingElement.innerHTML = '<span></span><span></span><span></span>';
        typingElement.id = 'typing-indicator';
        
        chatMessages.appendChild(typingElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Function to remove typing indicator
    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    // Function to get a chatbot response based on user input
    function getChatbotResponse(message) {
        // Convert message to lowercase for easier matching
        const lowerMessage = message.toLowerCase();
        
        // Check for common keywords and provide appropriate responses
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
            return 'Hello! How can I help you today?';
        } else if (lowerMessage.includes('doctor') || lowerMessage.includes('appointment') || lowerMessage.includes('consultation')) {
            return 'We have many volunteer doctors available for consultations. You can browse the Doctors section on our website to find a specialist that meets your needs.';
        } else if (lowerMessage.includes('ngo') || lowerMessage.includes('organization')) {
            return 'We partner with several NGOs that provide healthcare support. You can find more information in the NGOs section of our website.';
        } else if (lowerMessage.includes('hospital') || lowerMessage.includes('clinic')) {
            return 'We work with hospitals that offer subsidized or free treatment options. Please check the Hospitals section for more details.';
        } else if (lowerMessage.includes('donate') || lowerMessage.includes('donation') || lowerMessage.includes('contribute')) {
            return 'Thank you for your interest in donating! Your contribution will help provide healthcare to those in need. You can make a donation through our Donate section.';
        } else if (lowerMessage.includes('register') || lowerMessage.includes('sign up') || lowerMessage.includes('account')) {
            return 'You can register for an account by clicking on the Login/Register button in the top right corner of the website.';
        } else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('phone')) {
            return 'You can reach us through the Contact section of our website, or email us directly at support@careconnect.org.';
        } else if (lowerMessage.includes('thank')) {
            return "You're welcome! Is there anything else I can help you with?";
        } else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
            return 'Thank you for chatting with us. Have a great day!';
        } else if (lowerMessage.includes('help') || lowerMessage.includes('support') || lowerMessage.includes('assistance')) {
            return 'I can help you find doctors, connect with NGOs, locate hospitals, make donations, or answer questions about our services. What specifically do you need help with?';
        } else {
            return "I'm not sure I understand. Could you please provide more details or ask about our doctors, NGOs, hospitals, or donation options?";
        }
    }
    
    // Add CSS for typing indicator
    const style = document.createElement('style');
    style.textContent = `
        .typing-indicator {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0.5rem 1rem;
        }
        
        .typing-indicator span {
            height: 8px;
            width: 8px;
            background-color: #bbb;
            border-radius: 50%;
            display: inline-block;
            margin: 0 2px;
            animation: typing 1.4s infinite ease-in-out both;
        }
        
        .typing-indicator span:nth-child(1) {
            animation-delay: 0s;
        }
        
        .typing-indicator span:nth-child(2) {
            animation-delay: 0.2s;
        }
        
        .typing-indicator span:nth-child(3) {
            animation-delay: 0.4s;
        }
        
        @keyframes typing {
            0%, 80%, 100% { transform: scale(0.6); }
            40% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
} 