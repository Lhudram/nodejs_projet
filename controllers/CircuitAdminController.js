const modelcircuit = require("../models/circuitAdmin.js");
let async = require('async');

module.exports.ListeCircuit = function (request, response) {
    response.title = 'Liste des circuits';
    modelcircuit.getListeCircuit(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.circuit = result;
        response.render('listerAdminCircuit', response);
    });
};

module.exports.AjouterCircuit = function (request, response) {
    response.title = 'Ajouter un circuit';
    modelcircuit.getAllPays(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.pays = result;
        response.titre = "Ajouter un circuit";
        response.titreBouton = "AJOUTER";
        response.render('ajouterModifierCircuit', response);
    });
};

module.exports.TraiterAjout = function (request, response) {
    response.title = 'Ajout d\'un circuit';
    let info;
    let circuit = [];
    let i = 0;
    for (info in request.body.circuit) {
        circuit[i++] = request.body.circuit[info];
    }
    modelcircuit.ajouterCircuit(circuit, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        modelcircuit.getListeCircuit(function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.circuit = result;
            response.render('listerAdminCircuit', response);
        });
    });
};

module.exports.TraiterSuppression = function (request, response) {
    response.title = 'Suppression d\'un circuit';
    modelcircuit.supprimerCircuit(request.params.id, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        modelcircuit.getListeCircuit(function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.circuit = result;
            response.render('listerAdminCircuit', response);
        });
    });
};

module.exports.ModifierCircuit = function (request, response) {
    response.title = 'Mofifier un circuit';
    async.parallel([
            function (callback) {
                modelcircuit.getAllPays(function (err, result) {
                    callback(err, result);
                });
            },
            function (callback) {
                modelcircuit.getCircuit(request.params.id, function (err, result) {
                    callback(err, result);
                });
            }],
        function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.pays = result[0];
            response.titre = "Modifier un circuit";
            response.titreBouton = "MODIFIER";
            response.id = request.params.id;
            response.nom = result[1][0].CIRNOM;
            response.longueur = result[1][0].CIRLONGUEUR;

            for (let i = 0; i < response.pays.length; i++) {
                if (response.pays[i].PAYNUM === response.pays)
                    response.pays[i].selected = "selected";
            }

            response.image = result[1][0].CIRADRESSEIMAGE;
            response.nbrspectateurs = result[1][0].CIRNBSPECTATEURS;
            response.texte = result[1][0].CIRTEXT;
            response.render('ajouterModifierCircuit', response);
        }
    );
};

module.exports.TraiterModification = function (request, response) {
    response.title = 'Modification d\'un circuit';
    let info;
    let circuit = [];
    let i = 0;
    for (info in request.body.circuit) {
        circuit[i++] = request.body.circuit[info];
    }
    circuit[i] = request.body.id;
    modelcircuit.modifierCircuit(circuit, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        modelcircuit.getListeCircuit(function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.circuit = result;
            response.render('listerAdminCircuit', response);
        });
    });
};