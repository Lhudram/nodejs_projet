let HomeController = require('./../controllers/HomeController');
let ResultatController = require('./../controllers/ResultatController');
let EcurieController = require('./../controllers/EcurieController');
let PiloteController = require('./../controllers/PiloteController');
let CircuitController = require('./../controllers/CircuitController');

// Routes
module.exports = function (app) {

// Main Routes
    app.get('/', HomeController.Index);

// pilotes
    app.get('/repertoirePilote', PiloteController.Repertoire);
    app.get('/repertoirePilote/:lettre', PiloteController.PilParLettre);
    app.get('/descriptionPilote/:pilnom/:pilprenom', PiloteController.DetailsPers);

    // circuits!
    app.get('/circuits', CircuitController.ListerCircuit);
    app.get('/circuits/:cirnum', CircuitController.DetailsCircuit);

// Ecuries
    app.get('/ecuries', EcurieController.ListerEcurie);
    app.get('/detailEcurie/:id', EcurieController.ListerEcurie);

    //Résultats
    app.get('/resultats/:id', ResultatController.ListerResultat);
    app.get('/resultats', ResultatController.ListerResultat);


// tout le reste
    app.get('*', HomeController.Index);
    app.post('*', HomeController.Index);

};
