let db = require('../configDb');

module.exports.getAllPilotes = function (callback) {
    db.getConnection(function (err, connexion) {
        if (err) {
            return;
        }
        let sql = "SELECT PILNUM, PILNOM, PILPRENOM, PILDATENAIS FROM pilote order by PILNOM";
        connexion.query(sql, callback);
        connexion.release();
    });
};

module.exports.getExcluPilotes = function (callback) {
    db.getConnection(function (err, connexion) {
        if (err) {
            return;
        }
        let sql = "SELECT PILNUM, PILNOM, PILPRENOM, PILDATENAIS FROM pilote WHERE PILNUM NOT IN (SELECT PILNUM FROM course) order by PILNOM";
        connexion.query(sql, callback);
        connexion.release();
    });
};

module.exports.ajouterPilote = function (pilote, callback) {
    db.getConnection(function (err, connexion) {
        if (err) {
            return;
        }
        let sql = "INSERT INTO pilote (PILPRENOM, PILNOM, PILDATENAIS, PAYNUM, ECUNUM, PILPOINTS, PILPOIDS, PILTAILLE, PILTEXTE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        connexion.query(sql, pilote, callback);
        connexion.release();
    });
};

module.exports.getAllNationalites = function (callback) {
    db.getConnection(function (err, connexion) {
        if (err) {
            return;
        }
        let sql = "SELECT PAYNOM, PAYNUM FROM pays";
        connexion.query(sql, callback);
        connexion.release();
    });
};

module.exports.getAllEcuries = function (callback) {
    db.getConnection(function (err, connexion) {
        if (err) {
            return;
        }
        let sql = "SELECT ECUNUM, ECUNOM FROM ecurie";
        connexion.query(sql, callback);
        connexion.release();
    });
};

module.exports.supprimerPilote = function (id, callback) {
    db.getConnection(function (err, connexion) {
        if (err)
            return;
        let sql = "DELETE FROM pilote WHERE PILNUM = ?";
        connexion.query(sql, id, callback);
        connexion.release();
    });
};

module.exports.modifierPilote = function (pilote, callback) {
    db.getConnection(function (err, connexion) {
        if (err)
            return;
        let sql = "UPDATE pilote SET PILPRENOM = ?, PILNOM = ? , PILDATENAIS = ?, PAYNUM = ?, ECUNUM = ?, PILPOINTS = ?, PILPOIDS = ?, PILTAILLE = ?, PILTEXTE = ? WHERE PILNUM = ?";
        connexion.query(sql, pilote, callback);
        connexion.release();
    });
};

module.exports.getPilote = function (id, callback) {
    db.getConnection(function (err, connexion) {
        if (err)
            return;
        let sql = "SELECT PILPRENOM, PILNOM, PILDATENAIS, PAYNUM, ECUNUM, PILPOINTS, PILPOIDS, PILTAILLE, PILTEXTE FROM pilote WHERE PILNUM = ?";
        connexion.query(sql, id, callback);
        connexion.release();
    });
};