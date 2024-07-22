let ws;

function connectWebSocket() {
    // 1. Create an instance of a WebSocket pointing to a apecific server and port
    ws = new WebSocket('wss://nodejs-prod.onrender.com')

    // 2. Event handling - onopne, onmessage, onclose
    // - Connection made to the server
    ws.onopen = () => {
        console.log('Connected to the server');
    };

    // - Server sends a message to me
    ws.onmessage = (event) => {
        // Server sends data as a 'blob' - event.data
        const reader = new FileReader();

        // Async function
        reader.onload = () => {
            console.log(reader.result);
            const chat = document.getElementById('chat');
            const message = document.createElement('div');
            message.textContent = reader.result;
            chat.appendChild(message);
            document.getElementById('message').value = "";
        };

        if (event.data instanceof Blob) {
            reader.readAsText(event.data);
        };
    };

    // - Connection to server closed
    ws.onclose = () => {

    };
};

function sendMessage() {
    if (ws.readyState === WebSocket.OPEN){
        ws.send(document.getElementById('message').value);
    };
}

connectWebSocket();