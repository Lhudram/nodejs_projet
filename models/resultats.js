let db = require('../configDb');

module.exports.getLastResult = function (callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT GPNUM, GPDATE, GPNOM, GPDATEMAJ FROM grandprix ORDER BY GPDATE DESC LIMIT 1";
            connexion.query(sql, callback);

            connexion.release();
        }
    });
};

module.exports.getAllCourses = function (callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT GPNOM, GPNUM, PAYADRDRAP FROM grandprix gp JOIN circuit c ON gp.CIRNUM = c.CIRNUM JOIN pays p ON c.PAYNUM = p.PAYNUM ORDER BY GPNOM";
            connexion.query(sql, callback);

            connexion.release();
        }
    });
};

module.exports.getGrandPrix = function (id, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT GPCOMMENTAIRE, GPDATE FROM grandprix WHERE GPNUM = ?";
            connexion.query(sql, [id], callback);

            connexion.release();
        }
    });
};

module.exports.getGpPilotes = function (id, callback) {
    db.getConnection(function (err, connexion) {
        if (!err) {
            let sql = "SELECT PILNOM, PILPRENOM, TEMPSCOURSE, PILPOINTS FROM grandprix gp JOIN COURSE c ON gp.GPNUM = c.GPNUM JOIN PILOTE p ON p.PILNUM = c.PILNUM WHERE gp.GPNUM = ? ORDER BY TEMPSCOURSE ASC";
            connexion.query(sql, [id], callback);

            connexion.release();
        }
    });
};