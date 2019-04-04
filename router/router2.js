let ConnexionController = require('./../controllers/ConnexionController');
let CircuitAdminController = require('./../controllers/CircuitAdminController');
let PiloteAdminController = require('./../controllers/PiloteAdminController');
let EcurieAdminController = require('./../controllers/EcurieAdminController');
let ResultatAdminController = require('./../controllers/ResultatAdminController');
let SponsorAdminController = require('./../controllers/SponsorAdminController');


// Routes
module.exports = function (app2) {

    // Main Routes
    app2.get('/', ConnexionController.Connexion);
    app2.get('/deconnexion', ConnexionController.Deconnexion);

    // pilotes
    app2.get('/pilotes', PiloteAdminController.ListerPilotes);
    app2.get('/ajouterpilote', PiloteAdminController.AjouterPilote);
    app2.post('/ajouterpilote', PiloteAdminController.TraiterAjout);
    app2.get('/pilotes/supprimer/:id', PiloteAdminController.TraiterSuppression);
    app2.post('/pilotes/modifier/:id', PiloteAdminController.TraiterModification);
    app2.get('/pilotes/modifier/:id', PiloteAdminController.ModifierPilote);

    // circuits
    app2.get('/circuits', CircuitAdminController.ListeCircuit);
    app2.get('/ajoutercircuit', CircuitAdminController.AjouterCircuit);
    app2.post('/ajoutercircuit', CircuitAdminController.TraiterAjout);
    app2.get('/circuits/supprimer/:id', CircuitAdminController.TraiterSuppression);
    app2.post('/circuits/modifier/:id', CircuitAdminController.TraiterModification);
    app2.get('/circuits/modifier/:id', CircuitAdminController.ModifierCircuit);

    // Ecuries
    app2.get('/ecuries', EcurieAdminController.ListeEcurie);
    app2.get('/ecuries/supprimer/:id', EcurieAdminController.TraiterSuppression);
    app2.get('/ecuries/modifier/:id', EcurieAdminController.ModifierEcurie);
    app2.post('/ecuries/modifier/:id', EcurieAdminController.TraiterModification);
    app2.get('/ecuries/ajouter', EcurieAdminController.AjouterEcurie);
    app2.post('/ecuries/ajouter', EcurieAdminController.TraiterAjout);

    // Résultats
    app2.get('/resultats', ResultatAdminController.ListeGP);
    app2.post('/resultats/saisie', ResultatAdminController.ListeResultat);
    app2.post('/resultats/saisie/ajouter', ResultatAdminController.TraiterAjout);
    app2.get('/resultats/saisie/supprimer/:gpnum/:id', ResultatAdminController.TraiterSuppression);


    // Sponsors
    app2.get('/sponsors', SponsorAdminController.ListeSponsor);
    app2.get('/sponsors/supprimer/:id', SponsorAdminController.TraiterSuppression);
    app2.get('/ajoutersponsor', SponsorAdminController.AjouterSponsor);
    app2.post('/ajoutersponsor', SponsorAdminController.TraiterAjout);
    app2.post('/sponsors/modifier/:id', SponsorAdminController.TraiterModification);
    app2.get('/sponsors/modifier/:id', SponsorAdminController.ModifierSponsor);


    // tout le reste
    app2.get('*', ConnexionController.Connexion);
    app2.post('*', ConnexionController.Connexion);

};
