let db = require('../configDb');

module.exports.getConnexion = function (login, mdp, callback) {
    db.getConnection(function (err, connexion) {
        if (err) {
            return;
        }
        let sql = "SELECT login FROM login WHERE login =? AND passwd =?";
        connexion.query(sql, [login, mdp], callback);
        connexion.release();
    });
};