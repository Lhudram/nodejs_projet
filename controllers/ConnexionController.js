let modelconnexion = require('../models/connexion.js');
let crypto = require('crypto');

module.exports.Connexion = function (request, response) {
    response.title = "Bienvenue sur le site de WROOM (IUT du Limousin).";
    let login = request.body.login;
    let mdp = request.body.mdp;
    if (request.session.estConnecte === 1) {
        response.estConnecte = true;
    }
    else if (mdp !== undefined && login !== undefined) {
        mdp = crypto.createHash('sha1').update(mdp).digest("hex");
        modelconnexion.getConnexion(login, mdp, function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            if (result[0])
                request.session.estConnecte = (result[0]["login"]) ? 1 : 0;
            response.estConnecte = result;
        });
    }
    response.render('connexion', response);
};

module.exports.Deconnexion = function (request, response) {
    response.title = "Au revoir !";
    request.session.estConnecte = 0;
    response.render('connexion', response);
};