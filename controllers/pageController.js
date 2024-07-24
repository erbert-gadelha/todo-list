require('passport');
require('passport-local');
require('passport-local').Strategy;
require('passport').session

const db = require('../database');


module.exports = {
    "home": async (req, res) => {
        const user = req.user;
        
        let rows = [];
        if(false && user != null && user != undefined) {

            let conn;
            try {
                conn = await db.getConnection();
                const query = `SELECT * FROM tb_todo WHERE email="${2}"`;
                rows = await conn.query(query);
    
            } catch (err) {
                console.error(err);
                //res.status(500).send({"message": "Erro ao executar query."});
            } finally {
                if (conn) conn.release();
            } 


        }

        res.render('page_home', { user: user, todo_items: rows});
    },
    "login": async (req, res) => {
        if(req.user)
            res.redirect("/");
        else
            res.render('page_login');
    },
    "register": async (req, res) => {
        if(req.user)
            res.redirect("/");
        else
            res.render('page_register');
    },
};