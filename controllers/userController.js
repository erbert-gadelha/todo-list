const db = require('../database'),
      bcrypt = require('bcrypt');


module.exports= {
    "authenticate": async (login, password) => {
        let user = null;

        let conn;
        try {
            conn = await db.getConnection();
            const login_ = login.trim();

            let query = `SELECT * FROM tb_users WHERE email="${login.trim()}";`;
            const rows = (await conn.query(query));

            if(rows.length > 0) {
                const validate = await bcrypt.compare(password, rows[0].password);
                
                if(validate) {
                    delete rows[0]['password'];
                    return rows[0];
                }
                else
                    return null;
            }
                
                


        } catch (err) {
            console.error(err);
            return null;
        } finally {
            if (conn) conn.release(); // Liberar a conexão
        }

        return user;

    },
    "create": async function (req, res) {

        let conn;
        try {
            conn = await db.getConnection();
            const name = req.body.name.trim();
            const login = req.body.login.trim();
            const password = bcrypt.hashSync(req.body.password, 10);

            let query = `INSERT INTO tb_users (id, email, name, password) VALUES (
                uuid(),
                "${login}",
                "${name}",
                "${password}"
            );`;

            const rows = await conn.query(query);
            res.redirect("/login");
        } catch (err) {
            console.error(err);
            res.status(500).send({"message": "Erro ao executar query."});
        } finally {
            if (conn) conn.release(); // Liberar a conexão
        }
    }, 
    "logout": function(req, res) {
        req.logout(function(err) {
            if (err) {
                req.status(203).send({message: err});
                return next(err);
            }
            req.session.destroy();
            res.redirect("/");
        });
    }
};