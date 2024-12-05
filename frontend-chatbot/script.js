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

        // Send the user's message to the backend and handle the response
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

// Get chatbot response from backend API
async function getBotResponse(message) {
    try {
        const response = await fetch('http://localhost:5000/query', {  // Updated endpoint
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: message }),  // Send query as 'query'
        });
        const data = await response.json();

        // Check if data has responses and display
        if (data && data.length > 0) {
            const botResponse = `I found something in the **${data[0].column}** category:\n📄 **Details**: ${data[0].original_text}\n📚 **Source**: ${data[0].source}\n⭐ **Relevance Score**: ${data[0].score.toFixed(2)}`;
            addMessage(botResponse, 'bot');  // Display the bot's response
        } else {
            addMessage('Sorry, I couldn\'t find any relevant information.', 'bot');
        }
    } catch (error) {
        console.error('Error:', error);
        addMessage('Sorry, there was an error.', 'bot');
    }
}
