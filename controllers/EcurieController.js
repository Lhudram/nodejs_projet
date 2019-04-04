let model = require('../models/ecurie.js');
const async = require("async");

// //////////////////////// L I S T E R  E C U R I E S

module.exports.ListerEcurie = function (request, response) {
    response.title = 'Liste des écuries';

    async.parallel([function (callback) {
        model.getListeEcurie(function (err, result) {
            callback(err, result);
        });
    }, function (callback) {
        model.getEcurie(request.params.id, function (err, result) {
            callback(err, result);
        });
    }, function (callback) {
        model.getPilotesEcurie(request.params.id, function (err, result) {
            callback(err, result);
        });
    }, function (callback) {
        model.getVoituresEcurie(request.params.id, function (err, result) {
            callback(err, result);
        });
    }], function (err, result) {
        if (err)
            console.log("ERREUR de fonction async");
        response.listeEcurie = result[0];
        if (result[1])
            response.ecurie = result[1][0];
        if (result[2])
            response.pilotes = result[2];
        if (result[3])
            response.voitures = result[3];
        response.render('listerEcurie', response);
    });
};