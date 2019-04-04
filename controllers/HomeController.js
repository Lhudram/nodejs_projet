let model = require('../models/resultats.js');
let dateFormat = require('dateformat');

// ////////////////////////////////////////////// A C C U E I L

module.exports.Index = function (request, response) {
    response.title = "Bienvenue sur le site de WROOM (IUT du Limousin).";
    model.getLastResult(function (err, result) {
        if (err) {
            console.log(err);
        }
        response.lastResultDate = dateFormat(Date.parse(result[0].GPDATE), 'dd/mm/yyyy');
        response.lastResultMaj = dateFormat(Date.parse(result[0].GPDATEMAJ), 'dd/mm/yyyy');
        response.lastResult = result[0].GPNOM;
        response.lastResultNum = result[0].GPNUM;
        response.render('home', response);
    });
};
