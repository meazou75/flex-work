const jwt = require('jsonwebtoken');

const Kings = [
    {
        id: 1,
        firstName: 'Admin',
        lastName: 'Admin',
        login: 'admin',
        password: 'd033e22ae348aeb5660fc2140aec35850c4da997'
    }
];

genToken = id =>
    jwt.sign({ id: id }, 'supermotdepasse', {
        expiresIn: 86400
    });

module.exports = { Kings, genToken };
