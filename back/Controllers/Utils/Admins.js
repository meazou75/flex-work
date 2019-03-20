const jwt = require('jsonwebtoken');

// Tableau d'utilisateur
const Kings = [
    {
        id: 1, // Id pour referencer un utilisateur
        firstName: 'Admin', // Prenom
        lastName: 'Admin', // Nom
        login: 'admin', // Username pour authentification
        password: 'd033e22ae348aeb5660fc2140aec35850c4da997' // Mot de pass hashé en sha1
    }
];

// Fonction qui génère un token avec Jwt
genToken = id =>
    jwt.sign({ id: id }, 'supermotdepasse', {
        expiresIn: 86400
    });

// Exportation du tableau Kings et de la fonction genToken
module.exports = { Kings, genToken };
