const db = require('../database');



module.exports = {
    "home": async (req, res) => {
        let conn;
        try {
            conn = await db.getConnection();
            const query = "SELECT * FROM tb_todo";
            const rows = await conn.query(query);

            res.render('page_home', { user:null, todo_items: rows});
        } catch (err) {
            console.error(err);
            res.status(500).send({"message": "Erro ao executar query."});
        } finally {
            if (conn) conn.release();
        } 
    },
    "login": async (req, res) => {
    },
    "register": async (req, res) => {
    },
};