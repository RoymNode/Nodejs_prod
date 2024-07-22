const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const fs = require('fs');

const chatHandler = server => {
    // -- 2. Initialize the WS server
    const wss = new WebSocket.Server({server});

    // Handling client connections
    wss.on('connection', ws => {

        // A) In case of message from client
        ws.on('message', message => {
            console.log(`Received: ${message}`)
            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN){
                    client.send(message);
                };
            });
        });

        // B Send welcome message to clint
        console.log('Client connected');
        ws.send('Welcome the chat')
    });
}

module.exports = { chatHandler }