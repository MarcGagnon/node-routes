// Import Node's http module
const http = require('http');
const fs = require('fs');

// Create a request listener function
function reqListener(req, res) {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter</title></head>')
        res.write(`<body><h1>Node Server with routes</h1><h2>Listening on port ${PORT}</h2><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>`)
        res.write('</html');
        return res.end();
    }

    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        })

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
}

// Create the web server
const server = http.createServer(reqListener)

// Tell the server where to listen
const PORT = 3003;
server.listen(PORT);

// Tell the user the server is running
console.log(`Server is listening on port ${PORT}... Ctrl+C to stop.`);