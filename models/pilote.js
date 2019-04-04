let db = require('../configDb');

/*
* Récupérer la première lettre des pilotes de l'écurie
* @return Un tableau qui contient la première lettre des pilotes dans l'ordre alphabétique, de manière unique
*/
module.exports.getPremiereLettre = function (callback) {
    db.getConnection(function(err, connexion){
        if (err) {
            return;
        }
        let sql = "SELECT DISTINCT(LEFT(PILNOM, 1)) AS premierelettre FROM pilote ORDER BY PILNOM ASC";
        connexion.query(sql, callback);
        connexion.release();
    });
};

module.exports.getPiloteAvecPremiereLettre = function (data, callback) {
    db.getConnection(function(err, connexion){
        if (err) {
            return;
        }
        let sql = "SELECT p.PILNOM, p.PILPRENOM, ph.PHOADRESSE, ph.PHOCOMMENTAIRE FROM pilote p join photo ph ON p.PILNUM=ph.PILNUM where PHONUM=1 AND LEFT(PILNOM,1) =?";
        connexion.query(sql, data, callback);
        connexion.release();
    });
};

module.exports.getDetailsPilote = function (nom, prenom, callback) {
    db.getConnection(function(err, connexion){
        if (err) {
            return;
        }
        let sql = "SELECT p.pilnom, p.pilprenom, py.paynat, p.pilpoids, p.piltaille, p.piltexte, p.pildatenais, ph.phoadresse, ph.phocommentaire, e.ecunom from pilote p join pays py on p.paynum=py.paynum join photo ph ON p.PILNUM=ph.PILNUM left join ecurie e on e.ecunum = p.ecunum where ph.phonum=1 AND p.pilnom =? AND p.pilprenom=?";

        connexion.query(sql, [nom, prenom], callback);
        connexion.release();
    });
};
module.exports.getImagesPilotes = function (nom, prenom, callback) {
    db.getConnection(function(err, connexion){
        if (err) {
            return;
        }
        let sql = "SELECT ph.phocommentaire, ph.phoadresse , ph.phosujet from pilote p join photo ph on p.PILNUM=ph.PILNUM where ph.phonum <> 1 AND p.pilnom =? AND p.pilprenom=?";

        connexion.query(sql, [nom, prenom], callback);
        connexion.release();
    });
};module.exports.getSponsorsPilote = function (nom, prenom, callback) {
    db.getConnection(function(err, connexion){
        if (err) {
            return;
        }
        let sql = "SELECT s.sponom, s.sposectactivite from pilote p join sponsorise sp on p.pilnum = sp.pilnum join sponsor s on s.sponum = sp.sponum  where p.pilnom =? AND p.pilprenom=?";

        connexion.query(sql, [nom, prenom], callback);
        connexion.release();
    });
};
