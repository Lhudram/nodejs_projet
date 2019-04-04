const modelresultat = require("../models/resultatAdmin");
const modelpilote = require("../models/piloteAdmin");
const async = require("async");

module.exports.ListeGP = function (request, response) {
    response.title = 'Liste des grands prix';
    modelresultat.getListeGrandPrix(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.listeGP = result;
        response.render('listerAdminResultat', response);
    });
};

module.exports.ListeResultat = function (request, response) {
    response.title = 'Liste des résultats';
    const id = request.body.listegp;
    async.parallel([function (callback) {
        modelresultat.getListeResultat(id, function (err, result) {
            callback(err, result);
        });
    }, function (callback) {
        modelpilote.getExcluPilotes(function (err, result) {
            callback(err, result);
        });
    }], function (err, result) {
        if (err)
            console.log("ERREUR de fonction async");
        response.resultat = result[0];
        if (result[1])
            response.listePilote = result[1];
        for (let i = 1; i <= result[0].length; i++) {
            response.resultat[i - 1].place = i;
            response.lastplace = i + 1;
        }
        const score = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1, 0];
        for (let i = 0; i <= result[0].length - 1; i++) {
            if (i <= 10)
                response.resultat[i].points = score[i];
            else
                response.resultat[i].points = 0;
        }
        response.gpnum = id;
        response.render('listerAdminResultatSaisie', response);
    });
};

module.exports.TraiterAjout = function (request, response) {
    response.title = 'Ajout d\'un resultat';
    let resultat;
    const temps = request.body.m + ":" + request.body.s + ":" + request.body.ms;
    resultat = [request.body.gpnum, request.body.pilote, temps];
    const id = request.body.gpnum;
    async.parallel([function (callback) {
        modelresultat.ajouterResultat(resultat, function (err, result) {
            if (err) {
                console.log(err);
                callback();
            }
            callback();
        });
    }, function (callback) {
        modelpilote.getExcluPilotes(function (err, result) {
            callback(err, result);
        });
    }, function (callback) {
        modelresultat.getListeResultat(id, function (err, result) {
            callback(err, result);
        });
    }], function (err, result) {
        response.resultat = result[0];
        if (result[1])
            response.listePilote = result[1];
        for (let i = 1; i <= result[0].length; i++) {
            response.resultat[i - 1].place = i;
            response.lastplace = i + 1;
        }
        const score = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1, 0];
        for (let i = 0; i <= result[1].length - 1; i++) {
            if (i <= 10)
                response.resultat[i].points = score[i];
            else
                response.resultat[i].points = 0;
        }
        response.gpnum = id;
        response.render('listerAdminResultatSaisie', response);
    });
};

module.exports.TraiterSuppression = function (request, response) {
    response.title = 'Suppression d\'un resultat';
    modelresultat.supprimerResultat(request.params.id, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        modelresultat.getListeResultat(request.params.gpnum, function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.resultat = result;
            for (let i = 1; i <= result.length; i++) {
                response.resultat[i - 1].place = i;
                response.lastplace = i + 1;
            }
            const score = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1, 0];
            for (let i = 0; i <= result.length - 1; i++) {
                if (i <= 10)
                    response.resultat[i].points = score[i];
                else
                    response.resultat[i].points = 0;
            }
            response.resultat = result;
            response.gpnum = request.params.gpnum;
            response.render('listerAdminResultatSaisie', response);
        });
    });
};
