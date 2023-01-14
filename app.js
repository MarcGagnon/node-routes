// Import Node's http module
const http = require('http');
const about = require("./about");
const home = require("./home");

console.log(home);
console.log(about);

// Create a request listener function
function reqListener(req, res) {
    const url = req.url;

    // Create a capitalize function for the h2 created from the path
    function capitalize(string)
    {
        return string[0].toUpperCase() + string.slice(1);
    }

    if (url === "/") {
        res.write(home.Home());
        console.log(`Requested path : ${url}`);
        return res.end();
    } else if (url === "/about") {
        res.write(about.About());
        console.log(`Requested path : ${url}`);
        return res.end();
    }
    
    else {
        const path = url.split("/")[1];
        const h2 = capitalize(path);

        res.writeHead(400,
            { 'Content-Type': 'text/html' });
        res.write('<!DOCTYPE html><html>');
        res.write(`<head><title>404</title></head>`)
        res.write(`<body><h1>Node Server with routes</h1><h2>Awww... don't cry.</h2><p>It's just a 404 error page, you know?</p><p>Go back to the <a href="/">home page</a>.</p></body>`)
        res.write('</html>');
        console.log(`Requested path : ${url} (404)`);
        return res.end();
    }
}

// Create the web server
const server = http.createServer(reqListener)

// Tell the server where to listen
const PORT = 3000;
server.listen(PORT);

// Tell the user the server is running
console.log(`Server is listening on port ${PORT}... Ctrl+C to stop.`);