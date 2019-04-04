let dateFormat = require('dateformat');
let async = require('async');

const modelpilote = require("../models/piloteAdmin");
module.exports.ListerPilotes = function (request, response) {
    response.title = 'Liste des pilotes';
    modelpilote.getAllPilotes(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        let i = 0;
        while (i < result.length) {
            result[i].PILDATENAIS = dateFormat(Date.parse(result[i].PILDATENAIS), 'dd/mm/yyyy');
            i++;
        }
        response.pilotes = result;
        response.render('listerAdminPilotes', response);
    });
};

module.exports.AjouterPilote = function (request, response) {
    response.title = 'Ajouter un pilote';
    async.parallel([
            function (callback) {
                modelpilote.getAllNationalites(function (err, result) {
                    callback(err, result);
                });
            },
            function (callback) {
                modelpilote.getAllEcuries(function (err, result) {
                    callback(err, result);
                });
            }],
        function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.nationalites = result[0];
            response.ecuries = result[1];
            response.titre = "Ajouter un pilote";
            response.titreBouton = "AJOUTER";
            response.render('ajouterModifierPilote', response);
        }
    );
};

module.exports.TraiterAjout = function (request, response) {
    response.title = 'Ajout d\'un pilote';
    let info;
    let pilote = [];
    let i = 0;
    for (info in request.body.pilote) {
        pilote[i++] = request.body.pilote[info];
    }
    modelpilote.ajouterPilote(pilote, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        modelpilote.getAllPilotes(function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            let i = 0;
            while (i < result.length) {
                result[i].PILDATENAIS = dateFormat(Date.parse(result[i].PILDATENAIS), 'dd/mm/yyyy');
                i++;
            }
            response.pilotes = result;
            response.render('listerAdminPilotes', response);
        });
    });
};

module.exports.TraiterSuppression = function (request, response) {
    response.title = 'Suppression d\'un pilote';
    modelpilote.supprimerPilote(request.params.id, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        modelpilote.getAllPilotes(function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            let i = 0;
            while (i < result.length) {
                result[i].PILDATENAIS = dateFormat(Date.parse(result[i].PILDATENAIS), 'dd/mm/yyyy');
                i++;
            }
            response.pilotes = result;
            response.render('listerAdminPilotes', response);
        });
    });
};

module.exports.ModifierPilote = function (request, response) {
    response.title = 'Mofifier un pilote';
    async.parallel([
            function (callback) {
                modelpilote.getAllNationalites(function (err, result) {
                    callback(err, result);
                });
            },
            function (callback) {
                modelpilote.getAllEcuries(function (err, result) {
                    callback(err, result);
                });
            },
            function (callback) {
                modelpilote.getPilote(request.params.id, function (err, result) {
                    callback(err, result);
                });
            }],
        function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.nationalites = result[0];
            response.ecuries = result[1];
            response.titre = "Modifier un pilote";
            response.titreBouton = "MODIFIER";
            response.id = request.params.id;
            response.prenom = result[2][0].PILPRENOM;
            response.nom = result[2][0].PILNOM;
            response.dateNaiss = dateFormat(Date.parse(result[2][0].PILDATENAIS), 'yyyy-mm-dd');
            response.nationalite = result[2][0].PAYNUM;
            response.ecurie = result[2][0].ECUNUM;

            for (let i = 0; i < response.nationalites.length; i++) {
                if (response.nationalites[i].PAYNUM === response.nationalite)
                    response.nationalites[i].selected = "selected";
            }
            for (let i = 0; i < response.ecuries.length; i++) {
                if (response.ecuries[i].ECUNUM === response.ecurie)
                    response.ecuries[i].selected = "selected";
            }

            response.points = result[2][0].PILPOINTS;
            response.poids = result[2][0].PILPOIDS;
            response.taille = result[2][0].PILTAILLE;
            response.texte = result[2][0].PILTEXTE;
            response.render('ajouterModifierPilote', response);
        }
    );
};

module.exports.TraiterModification = function (request, response) {
    response.title = 'Modification d\'un pilote';
    let info;
    let pilote = [];
    let i = 0;
    for (info in request.body.pilote) {
        pilote[i++] = request.body.pilote[info];
    }
    pilote[i] = request.body.id;
    modelpilote.modifierPilote(pilote, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        modelpilote.getAllPilotes(function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            let i = 0;
            while (i < result.length) {
                result[i].PILDATENAIS = dateFormat(Date.parse(result[i].PILDATENAIS), 'dd/mm/yyyy');
                i++;
            }
            response.pilotes = result;
            response.render('listerAdminPilotes', response);
        });
    });
};