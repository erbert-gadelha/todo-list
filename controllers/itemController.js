const db = require('../database');


module.exports = {
    "create": async function(req, res) {

        let conn;
        try {
            conn = await db.getConnection();

            let query = `INSERT INTO tb_todo (user_id, name, description, priority, done, doneAt) VALUES (
                    "${req.user.id}",
                    "${req.body.name}",
                    "${req.body.description}",
                    "${req.body.priority}",
                    false,
                    NULL
            );`;

            await conn.query(query);
            res.redirect("/");

        } catch (err) {
            console.error(err);
            res.status(500).send({"message": "Erro ao executar query."});
            return;
        } finally {
            if (conn) conn.release(); // Liberar a conexão
        }

    },
    "read": async (user, id) => {

        let conn;
        try {
            conn = await db.getConnection();

            let query = `SELECT * FROM tb_todo WHERE user_id="${user.id}" AND id="${id}";`;

            const rows = await conn.query(query);

            if(rows.length > 0)
                return rows[0];


        } catch (err) {
            console.error(err);
        } finally {
            if (conn) conn.release(); // Liberar a conexão
        }
        return null;
    },
    "edit": async function(req, res) {
        if(!req.user) {
            res.redirect("/");
            return;
        }

        console.log("body", req.body);
        
        let conn;
        try {
            conn = await db.getConnection();
            const param_done = req.body.done == "on";
            const param_doneAt = (req.body.doneAt.length == 0?"NULL":req.body.doneAt);

            //const query = `UPDATE tb_todo SET done = true, doneAt = CURRENT_TIMESTAMP() WHERE user_id="${req.user.id}" AND id="${req.params.id}";`;
            const query = `UPDATE tb_todo SET 
                name="${req.body.name}",
                description="${req.body.description}",
                priority="${req.body.priority}",
                done=${param_done},
                doneAt=${param_doneAt}
            WHERE id="${req.params.id}" AND user_id="${req.user.id}";`;

            await conn.query(query);
            res.redirect("/");

        } catch (err) {
            console.error(err);
            res.status(500).send({"message": "Erro ao executar query."});
            return;
        } finally {
            if (conn) conn.release(); // Liberar a conexão
        }

    },
    "delete": async function(req, res) {
        if(!req.user) {
            res.redirect("/");
            return;
        }

        console.log("body", req.body);
        
        let conn;
        try {
            conn = await db.getConnection();
            const query = `DELETE FROM tb_todo WHERE id="${req.params.id}" AND user_id="${req.user.id}";`;
            await conn.query(query);

            res.redirect("/");
        } catch (err) {
            console.error(err);
            res.status(500).send({"message": "Erro ao executar query."});
            return;
        } finally {
            if (conn) conn.release(); // Liberar a conexão
        }
    },
    "done": async (req, res) => {

        let conn;
        try {
            conn = await db.getConnection();

            //const query = `UPDATE tb_todo SET done = true, doneAt = CURRENT_TIMESTAMP() WHERE user_id="${req.user.id}" AND id="${req.params.id}";`;
            const query = `UPDATE tb_todo SET done = true, doneAt = CURRENT_TIMESTAMP() WHERE id="${req.params.id}" AND user_id="${req.user.id}";`;

            await conn.query(query);
            res.redirect("/");

        } catch (err) {
            console.error(err);
            res.status(500).send({"message": "Erro ao executar query."});
            return;
        } finally {
            if (conn) conn.release(); // Liberar a conexão
        }

    }
};