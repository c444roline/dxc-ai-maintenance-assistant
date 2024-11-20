// Select elements
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Handle sending a message
sendBtn.addEventListener('click', () => {
    const message = userInput.value.trim();
    if (message) {
        // Display the user's message
        addMessage(message, 'user');

        // Send the user's message to the chatbot backend and handle the response
        getBotResponse(message);
        
        // Clear the input field
        userInput.value = '';
    }
});

// Add a message to the chat box
function addMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the latest message
}

// Simulate chatbot response (replace with API call)
async function getBotResponse(message) {
    // Example API call to a chatbot backend
    try {
        const response = await fetch('http://localhost:5000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
        });
        const data = await response.json();

        // Display the bot's response
        addMessage(data.response, 'bot');
    } catch (error) {
        console.error('Error:', error);
        addMessage('Sorry, there was an error.', 'bot');
    }
}