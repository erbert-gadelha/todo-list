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
    "edit": async function(req, res) {
    },
    "delete": function(req, res) {
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