let db = require('../configDb');

module.exports.getListeGrandPrix = function (callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            let sql ="SELECT gpnum, gpnom from grandprix";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.getListeResultat = function (id, callback) {
    // connection à la base
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT gpnum, tempscourse, pilnom, c.pilnum from course c join pilote p on c.pilnum=p.pilnum where gpnum =? order by tempscourse";
            connexion.query(sql, id, callback);
            connexion.release();
        }
    });
};

module.exports.supprimerResultat = function (id, callback) {
    // connection à la base
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "DELETE from course where PILNUM = ?";
            connexion.query(sql, id, callback);
            connexion.release();
        }
    });
};

module.exports.ajouterResultat = function (resultat, callback) {
    db.getConnection( function (err, connexion) {
        if (err) {
            return;
        }
        let sql = "INSERT INTO course VALUES (?, ?, ?)";
        connexion.query(sql, resultat, callback);
        connexion.release();
    })
};
