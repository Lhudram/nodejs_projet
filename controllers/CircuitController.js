// ////////////////////// L I S T E R     C I R C U I T S
let modelcircuit = require('../models/circuit.js');
let async=require('async');

module.exports.ListerCircuit = function (request, response) {
    response.title = 'Liste des circuits';
    modelcircuit.getListeCircuit(function (err, result) {
        if (err) {
            console.log(err);
            return;
        }
        response.listeCircuit = result;
        response.render('listerCircuit', response);
    });
};
module.exports.DetailsCircuit = function (request, response) {
    response.title = 'Details du circuit';
    let cirnum = request.params.cirnum;

    async.parallel([
            function (callback){
                modelcircuit.getListeCircuit((function (err, result) {
                    callback(err, result);
                }));
            },
            function (callback){
                modelcircuit.getDetailsCircuit(cirnum, (function (err, result) {
                    callback(err, result[0]);
                }));
            }],
        function (err, result){
            if (err) {
                console.log(err);
                return;
            }
            response.listeCircuit=result[0];
            response.detailsCircuit=result[1];
            response.render('listerCircuit',response);
        }
    );
};
