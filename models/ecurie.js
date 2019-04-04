let db = require('../configDb');

module.exports.getListeEcurie = function (callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT ecunum, payadrdrap, ecunom FROM ecurie e INNER JOIN pays p ";
            sql = sql + "ON p.paynum=e.paynum ORDER BY ecunom";
            connexion.query(sql, callback);

            connexion.release();
        }
    });
};

module.exports.getEcurie = function (id, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT FPNOM, ECUNOM, ECUNOMDIR, ECUADRSIEGE, PAYNOM, ECUADRESSEIMAGE FROM ECURIE e JOIN PAYS p ON e.PAYNUM = p.PAYNUM JOIN FOURN_PNEU fp ON e.FPNUM = fp.FPNUM WHERE ECUNUM = ?";
            connexion.query(sql, [id], callback);

            connexion.release();
        }
    });
};

module.exports.getPilotesEcurie = function (id, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT PILNOM, PILPRENOM, PHOADRESSE FROM pilote pi JOIN photo ph ON pi.PILNUM = ph.PILNUM WHERE ECUNUM = ? AND PHONUM = 1";
            connexion.query(sql, [id], callback);

            connexion.release();
        }
    });
};

module.exports.getVoituresEcurie = function (id, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT VOINOM, VOIADRESSEIMAGE, TYPELIBELLE FROM voiture v JOIN type_voiture t ON v.TYPNUM = t.TYPNUM WHERE ECUNUM = ?";
            connexion.query(sql, [id], callback);

            connexion.release();
        }
    });
};