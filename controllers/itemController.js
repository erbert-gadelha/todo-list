const pool = require('../database');

function ValidarParametroPost(param) {

    const title = param.title,
          description = param.description,
          priority = param.priority,
          done = param.done,
          doneAt = param.doneAt;

    if (title == undefined | done == undefined | priority == undefined)
        return false;

    if (title.length < 5 | title.length > 50)
        return false;

    if (priority < 0 || priority > 2)
        return false;

    return true;
}


module.exports = {
    "index": async function(req, res) {
        

        let conn;
        try {
            conn = await pool.getConnection();
            const rows = await conn.query("SELECT * FROM todo_item");
            res.json(rows);
        } catch (err) {
            console.error(err);
            res.status(500).send('Something went wrong');
        } finally {
            if (conn) conn.release(); // Liberar a conexão
        }

    },
    "post": function(req, res) {
        const body = req.body;

        if(!ValidarParametroPost(body)) {
            res.status(400);
            res.send({
                "requisition": "post",
                "response": "Bad params to create a todo-item."
            });
            return;
        }

        
        res.status(200);
        res.send({
            "requisition": "post",
            "response": "Successful created."
        });
    },
    "put": function(req, res) {
        res.send({
            "requisition": "put",
            "response": "wasd"
        });
    },
    "delete": function(req, res) {
        res.send({
            "requisition": "delete",
            "response": "wasd"
        });
    }
};