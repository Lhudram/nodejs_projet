let model = require('../models/resultats.js');
const async = require("async");
// //////////////////////////L I S T E R    R E S U L T A T S
module.exports.ListerResultat = function (request, response) {
    response.title = 'Liste des résulats des grands prix';

    async.parallel([function (callback) {
        model.getAllCourses(function (err, result) {
            callback(err, result);
        });
    }, function (callback) {
        if (request.params.id)
            model.getGrandPrix(request.params.id, function (err, result) {
                callback(err, result);
            });
        else
            callback(null);
    }, function (callback) {
        if (request.params.id)
            model.getGpPilotes(request.params.id, function (err, result) {
                callback(err, result);
            });
        else
            callback(null);
    }], function (err, result) {
        if (err)
            console.log("ERREUR de fonction async");
        response.listeCourses = result[0];
        if (result[1])
            response.gp = result[1][0];
        if (result[2]) {
            response.pilotes = result[2];
            for (let i = 1; i <= result[2].length; i++) {
                response.pilotes[i - 1].place = i;
            }
        }
        response.render('listerResultat', response);
    });
};
