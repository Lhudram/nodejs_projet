let db = require('../configDb');

module.exports.getListeCircuit = function (callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            let sql ="SELECT cirnom, cirnum, cirlongueur, cirnbspectateurs from circuit";
            connexion.query(sql, callback);
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
    })
};

module.exports.ajouterCircuit = function (circuit, callback) {
    db.getConnection( function (err, connexion) {
        if (err) {
            return;
        }
        let sql = "INSERT INTO circuit (CIRNOM, CIRLONGUEUR, PAYNUM, CIRADRESSEIMAGE, CIRNBSPECTATEURS, CIRTEXT) VALUES (?, ?, ?, ?, ?, ?)";
        connexion.query(sql, circuit, callback);
        connexion.release();
    })
};

module.exports.modifierCircuit = function (circuit, callback) {
    db.getConnection( function (err, connexion) {
        if (err) {
            return;
        }
        let sql = "UPDATE circuit SET CIRNOM = ?, CIRLONGUEUR = ? , PAYNUM = ?, CIRADRESSEIMAGE = ?, CIRNBSPECTATEURS = ?, CIRTEXT = ? WHERE CIRNUM = ?";
        connexion.query(sql, circuit, callback);
        connexion.release();
    })
};

module.exports.supprimerCircuit = function (id, callback) {
    db.getConnection(function (err, connexion) {
        if (err)
            return;
        let sql = "DELETE FROM circuit WHERE CIRNUM = ?";
        connexion.query(sql, id, callback);
        connexion.release();
    });
};

module.exports.getCircuit= function (id, callback) {
    db.getConnection(function (err, connexion) {
        if (err)
            return;
        let sql = "SELECT CIRNOM, CIRLONGUEUR, PAYNUM, CIRADRESSEIMAGE, CIRNBSPECTATEURS, CIRTEXT FROM circuit WHERE CIRNUM = ?";
        connexion.query(sql, id, callback);
        connexion.release();
    });
};
