// ///////////////////////// R E P E R T O I R E    D E S    P I L O T E S
let async=require('async');

const modelpilote = require("../models/pilote");
module.exports.Repertoire = function (request, response) {
    response.title = 'Répertoire des pilotes';
    modelpilote.getPremiereLettre(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.repertoirePilotes = result;
        response.render('repertoirePilotes', response);
    });
};

module.exports.PilParLettre = function (request, response) {
    response.title = 'Liste des pilotes';
    const data = request.params.lettre;
    modelpilote.getPiloteAvecPremiereLettre(data, function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.listePilotesParNom = result;
        response.render('listePilotesParNom', response);
    });
};

module.exports.DetailsPers = function (request, response) {
    response.title = 'Liste des pilotes';
    let nom = request.params.pilnom;
    let prenom = request.params.pilprenom;
    response.title='Details du pilote '+nom+' '+prenom;

    async.parallel([
        function (callback){
            modelpilote.getDetailsPilote(nom, prenom, (function (err, result) {
                callback(err, result[0]);
            }));
        },
        function (callback){
            modelpilote.getSponsorsPilote(nom, prenom, (function (err, result) {
                callback(err, result);
            }));
        },
        function (callback){
            modelpilote.getImagesPilotes(nom, prenom, (function (err, result) {
                callback(err, result);
            }));
        }],
        function (err, result){
            if (err) {
                console.log(err);
                return;
            }
            response.detailsPilote=result[0];
            response.sponsorsPilote=result[1];
            response.imagesPilote=result[2];
            response.render('detailsPilote',response);
        }
    );
};