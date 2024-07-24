require('passport');
require('passport-local');
require('passport-local').Strategy;
require('passport').session

const db = require('../database');
const itemController = require('../controllers/itemController');


module.exports = {
    "home": async (req, res) => {
        const user = req.user;
        
        let rows = [];
        if(user) {

            let conn;
            try {
                conn = await db.getConnection();
                const query = `SELECT * FROM tb_todo WHERE user_id="${req.user.id}" ORDER BY id DESC`;
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
    "edit": async (req, res) => {
        if(!req.user) {
            res.redirect("/");
            return;
        }

        const id = req.params.id;
        if(isNaN(id)) {
            res.redirect("/");
            return;
        }

        const data = await itemController.read(req.user, req.params.id);
        res.render('page_edit_item', {user: req.user, data: data});
    }
};