const http = require('http');
const path = require('path');
const express = require('express');
const port = 5000;
const app = express();
const rootFolder = path.normalize(__dirname);
app.use('/node_modules/jquery/dist', express.static(path.join(rootFolder, 'node_modules/jquery/dist')));
app.use('/node_modules/handlebars/dist', express.static(path.join(rootFolder, 'node_modules/handlebars/dist')));
app.use('/node_modules/sammy/lib', express.static(path.join(rootFolder, 'node_modules/sammy/lib')));
app.use('/node_modules/sammy/lib/plugins', express.static(path.join(rootFolder, 'node_modules/sammy/lib/plugins/')));
app.use('/templates', express.static(path.join(rootFolder, 'templates')));
app.use('/js', express.static(path.join(rootFolder, 'js')));
app.use('/style', express.static(path.join(rootFolder, 'style')));
const server = http.createServer(app);

app.get('/', function (req, res) {
    return res.sendFile(path.join(rootFolder, 'index.html'));
});

server.listen(port, () => {
    console.log("Running on http://localhost:" + port);
});

