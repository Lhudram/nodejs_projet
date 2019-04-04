let db = require('../configDb');

module.exports.getListeSponsor = function (callback) {
    // connection à la base
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT sponom, sposectactivite, sponum from sponsor";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};


module.exports.getAllEcuries = function (callback) {
    // connection à la base
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT ecunum, ecunom from ecurie";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};


module.exports.ajouterSponsor = function (sponsor, callback) {
    db.getConnection(function (err, connexion) {
        if (err) {
            return;
        }
        let sql = "INSERT INTO sponsor (SPONOM, SPOSECTACTIVITE) VALUES (?, ?)";
        connexion.query(sql, sponsor, callback);
        connexion.release();
    })
};

module.exports.modifierSponsor = function (sponsor, callback) {
    db.getConnection(function (err, connexion) {
        if (err) {
            return;
        }
        let sql = "UPDATE sponsor SET SPONOM = ?, SPOSECTACTIVITE = ? WHERE SPONUM = ?";
        connexion.query(sql, [sponsor[0], sponsor[1], sponsor[3]]);
        sql = "UPDATE finance SET ECUNUM = ? WHERE SPONUM = ?";
        connexion.query(sql, [sponsor[2], sponsor[3]], callback);
        connexion.release();
    })
};

module.exports.supprimerSponsor = function (id, callback) {
    db.getConnection(function (err, connexion) {
        if (err)
            return;
        let sql = "DELETE FROM sponsorise WHERE SPONUM = ?";
        connexion.query(sql, id);
        sql = "DELETE FROM finance WHERE SPONUM = ?";
        connexion.query(sql, id);
        sql = "DELETE FROM sponsor WHERE SPONUM = ?";
        connexion.query(sql, id, callback);
        connexion.release();
    });
};

module.exports.getSponsor = function (id, callback) {
    db.getConnection(function (err, connexion) {
        if (err)
            return;
        let sql = "SELECT SPONOM, SPOSECTACTIVITE, ECUNUM FROM sponsor s LEFT JOIN finance f ON s.SPONUM = f.SPONUM WHERE s.SPONUM = ?";
        connexion.query(sql, id, callback);
        connexion.release();
    });
};