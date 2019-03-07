const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const http = require('http');
const sha1 = require('sha1');

const Controllers = require('./Controllers');
const { Kings, genToken } = require('./Controllers/Utils/Admins');


// Server
const httpServer = http.createServer(app);

// Usings
app.use(bodyParser.json());
app.use('/', (_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, x-access-token');
    res.header(
        'Access-Control-Allow-Methods',
        'PUT, GET, POST, DELETE, OPTIONS'
    );
    next();
});

// Listen
httpServer.listen(8088, () =>
    console.log(`> Ready on http://0.0.0.0:8088`)
);

app.options('/login', (_, res) => res.send('POST'));

app.post('/login', (req, res) => {
    const user = Kings.find(
        ({ login, password }) =>
            login === req.body.login && password === sha1(req.body.password)
    );

    if (!user) {
        return res.json({ success: false });
    }

    return res.json({ success: true, token: genToken(user.id) });
});

// Routes
app.use('/', Controllers);
app.all('*', (_, res) => res.status(404).end());
