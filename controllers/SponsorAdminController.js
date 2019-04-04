const modelsponsor = require("../models/sponsorAdmin.js");
const async = require("async");

module.exports.ListeSponsor = function (request, response) {
    response.title = 'Liste des sponsors';
    modelsponsor.getListeSponsor(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.sponsor = result;
        response.render('listerAdminSponsor', response);
    });
};

module.exports.TraiterSuppression = function (request, response) {
    response.title = 'Suppression d\'un sponsor';
    modelsponsor.supprimerSponsor(Number(request.params.id), function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        modelsponsor.getListeSponsor(function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.sponsor = result;
            response.render('listerAdminSponsor', response);
        });
    });
};


module.exports.AjouterSponsor = function (request, response) {
    response.title = 'Ajouter un sponsor';
    modelsponsor.getAllEcuries(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.ecurie = result;
        response.titre = "Ajouter un sponsor";
        response.titreBouton = "AJOUTER";
        response.render('ajouterModifierSponsor', response);
    });
};

module.exports.TraiterAjout = function (request, response) {
    response.title = 'Ajout d\'un sponsor';
    let info;
    let sponsor = [];
    let i = 0;
    for (info in request.body.sponsor) {
        sponsor[i++] = request.body.sponsor[info];
    }
    modelsponsor.ajouterSponsor(sponsor, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        modelsponsor.getListeSponsor(function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            console.log("coucou");
            response.sponsor = result;
            response.render('listerAdminSponsor', response);
        });
    });
};
module.exports.ModifierSponsor = function (request, response) {
    response.title = 'Mofifier un sponsor';
    async.parallel([
            function (callback) {
                modelsponsor.getAllEcuries(function (err, result) {
                    callback(err, result);
                });
            },
            function (callback) {
                modelsponsor.getSponsor(request.params.id, function (err, result) {
                    callback(err, result);
                });
            }],
        function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.titre = "Modifier un sponsor";
            response.titreBouton = "MODIFIER";
            response.id = request.params.id;
            response.nom = result[1][0].SPONOM;
            response.ecuries = result[0];
            response.secteur = result[1][0].SPOSECTACTIVITE;
            for (let i = 0; i < response.ecuries.length; i++) {
                if (response.ecuries[i].ecunum === result[1][0].ecunum)
                    response.ecuries[i].selected = "selected";
            }
            response.render('ajouterModifierSponsor', response);
        }
    );
};

module.exports.TraiterModification = function (request, response) {
    response.title = 'Modification d\'un sponsor';
    let info;
    let sponsor = [];
    let i = 0;
    for (info in request.body.sponsor) {
        sponsor[i++] = request.body.sponsor[info];
    }
    sponsor[i] = request.body.id;
    modelsponsor.modifierSponsor(sponsor, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        modelsponsor.getListeSponsor(function (err, result) {
            if (err) {
                console.log(err);
                return;
            }
            response.sponsor = result;
            response.render('listerAdminSponsor', response);
        });
    });
};
