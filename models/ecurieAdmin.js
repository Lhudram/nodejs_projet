let db = require('../configDb');

module.exports.getListeEcurie = function (callback) {
    // connection à la base
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT ecunom, ecunum, ecunomdir, ecupoints from ecurie";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.supprimerEcurie = function (id, callback) {
    // connection à la base
    db.getConnection(function (err, connexion) {
        if (!err) {

            let sql = "delete from voiture where ECUNUM = ?";
            connexion.query(sql, id);

            sql = "delete from finance where ecunum = ?";
            connexion.query(sql, id);

            sql = "delete e,c,ph,s,pi from essais e, course c, photo ph, sponsorise s, pilote pi where ecunum = ? and e.PILNUM = pi.PILNUM and ph.PILNUM = pi.PILNUM and s.PILNUM = pi.PILNUM";
            connexion.query(sql, id);

            sql = "delete from ecurie where ecunum = ?";
            connexion.query(sql, id, callback);

            connexion.release();
        }
    });
};

module.exports.getAllPays = function (callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "Select paynum, paynom from pays";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.ajouterEcurie = function (ecurie, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "INSERT INTO ecurie (ECUNOM, ECUNOMDIR, ECUADRSIEGE, ECUPOINTS, PAYNUM, ECUADRESSEIMAGE, FPNUM) VALUES (?,?,?,?,?,?,1)";
            connexion.query(sql, ecurie, callback);
            connexion.release();
        }
    });
};

module.exports.getEcurie = function (id, callback) {
    // connection à la base
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT ECUNOM, ECUNOMDIR, ECUADRSIEGE, ECUPOINTS, PAYNUM from ecurie WHERE ECUNUM = ?";
            connexion.query(sql, id, callback);
            connexion.release();
        }
    });
};

module.exports.modifierEcurie = function (ecurie, id, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "UPDATE ecurie SET ECUNOM = ?, ECUNOMDIR = ?, ECUADRSIEGE = ?, ECUPOINTS = ? WHERE ECUNUM = ?";
            connexion.query(sql, [ecurie[0], ecurie[1], ecurie[2], ecurie[3], id], callback);
            connexion.release();
        }
    });
};