const http = require('http');
const path = require('path');
const fs = require('fs');

const serveStaticFile = (request, response) => {
    
    // Parse file name and determine filename
    // If no path was defined, return index.html
    const url = request.url === "/" ? 'index.html' : request.url;
    
    // If file was not found - send error
    // if file was found - return file
    // else look for the desired file

    // Read file async
    const filePath = path.join(__dirname, "../public", url)
    const fileExt = path.extname(filePath);

    let type = "";
    
    switch (fileExt) {
        case '.html':
            type = "text/html";
            break;

        case '.css':
            type = "text/css";
            break;
        
        case '.jpg':
            type = "image/jpeg";
            break;
    
        default:
            case '':
                type = "text/html";
            break;
    }

    fs.readFile(filePath, (error, content) => {
        // 1. Check for errors, if error exists return 404.html
        // 2. if all is well return file.
        if (error) {
            if (error.code === 'ENOENT') {
                const errorFile = path.join(__dirname, "public", "404.html");
                fs.readFile(errorFile, (err, data) => {
                    response.writeHead(404, {'Content-Type': 'text/html'})
                    response.end(data, 'utf8');
                });
            }
            else {
                response.writeHead(500);
                response.end('Server error');
            }
        }
        else {
            response.writeHead(200, {'Content-Type': type})
            response.end(content, 'utf8');
        }
    })

};

module.exports = { serveStaticFile };