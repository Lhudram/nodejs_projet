const modelecurie = require("../models/ecurieAdmin.js");
let async = require('async');

module.exports.ListeEcurie = function (request, response) {
    response.title = 'Liste des ecuries';
    modelecurie.getListeEcurie(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.listeEcurie = result;
        response.render('listerAdminEcurie', response);
    });
};

module.exports.TraiterSuppression = function (request, response) {
    response.title = 'Suppression d\'une ecurie';
    modelecurie.supprimerEcurie(request.params.id, function () {
        modelecurie.getListeEcurie(function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.listeEcurie = result;
            response.render('listerAdminEcurie', response);
        });
    });
};

module.exports.AjouterEcurie = function (request, response) {
    response.title = 'Ajout d\'une ecurie';
    response.titreBouton = "AJOUTER";

    modelecurie.getAllPays(function (err, result) {
        response.pays = result;
        response.render('ajouterModifierEcurie', response);
    });
};

module.exports.TraiterAjout = function (request, response) {
    response.title = 'Ajout d\'une ecurie';

    let info;
    let ecurie = [];
    let i = 0;
    for (info in request.body.ecurie) {
        ecurie[i++] = request.body.ecurie[info];
    }
    modelecurie.ajouterEcurie(ecurie, function (err, result) {
        if (err)
            console.log(err);
        modelecurie.getListeEcurie(function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.listeEcurie = result;
            response.render('listerAdminEcurie', response);
        });
    });
};

module.exports.ModifierEcurie = function (request, response) {
    response.title = 'Modifier une ecurie';
    response.titreBouton = "MODIFIER";

    async.parallel([
        function (callback) {
            modelecurie.getAllPays(function (err, result) {
                callback(err, result);
            });
        },
        function (callback) {
            modelecurie.getEcurie(request.params.id, function (err, result) {
                callback(err, result);
            })
        }
    ], function (err, result) {
        response.pays = result[0];
        response.nom = result[1][0].ECUNOM;
        response.directeur = result[1][0].ECUNOMDIR;
        response.siege = result[1][0].ECUADRSIEGE;
        response.points = result[1][0].ECUPOINTS;
        response.id = request.params.id;

        response.render('ajouterModifierEcurie', response);
    });
};

module.exports.TraiterModification = function (request, response) {
    response.title = 'Modification d\'une ecurie';

    let info;
    let ecurie = [];
    let i = 0;
    for (info in request.body.ecurie) {
        ecurie[i++] = request.body.ecurie[info];
    }
    modelecurie.modifierEcurie(ecurie, request.body.id, function (err, result) {
        if (err)
            console.log(err);
        modelecurie.getListeEcurie(function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.listeEcurie = result;
            response.render('listerAdminEcurie', response);
        });
    });
};