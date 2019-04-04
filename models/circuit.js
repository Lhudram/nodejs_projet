let db = require('../configDb');

module.exports.getListeCircuit = function (callback) {
    // connection à la base
    db.getConnection(function(err, connexion){
        if(!err){
            let sql ="SELECT cirnom, cirnum, payadrdrap from circuit c join pays p on c.paynum=p.paynum";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};
module.exports.getDetailsCircuit = function (cirnum, callback) {
    db.getConnection(function(err, connexion){
        if (err) {
            return;
        }
        let sql = "SELECT cirnum, cirnom, cirlongueur, cirnbspectateurs, ciradresseimage, cirtext, paynom from circuit c join pays p on c.paynum = p.paynum where cirnum =?";

        connexion.query(sql, [cirnum], callback);
        connexion.release();
    });
};

