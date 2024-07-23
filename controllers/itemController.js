const pool = require('../database');

function ValidarParametroPost(param) {

    const name = param.name,
          description = param.description,
          priority = param.priority,
          done = param.done,
          doneAt = param.doneAt;

    if (name == undefined | done == undefined | priority == undefined)
        return false;

    if (name.length < 5 | name.length > 50 | description.length > 140)
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

            let query;
            const id = req.query.id;
            if(id == undefined || id == null)
                query = "SELECT * FROM todo_item";
            else
                query = `SELECT * FROM todo_item WHERE todo_item.id = "${id}"`;

            const rows = await conn.query(query);
            res.json(rows);
        } catch (err) {
            console.error(err);
            res.status(500).send('Something went wrong');
        } finally {
            if (conn) conn.release(); // Liberar a conexão
        }

    },
    "post": async function(req, res) {
        const body = req.body;

        if(!ValidarParametroPost(body)) {
            res.status(400);
            res.send({
                "requisition": "post",
                "response": "Bad params to create a todo-item."
            });
            return;
        }

        console.log("body", body);

        const query = `INSERT INTO todo_item (id, name, description, priority, done, doneAt) VALUES (
  uuid(),
  "Dar banho no gato.",
  "Com shampoo anti-pulgas.",
  2,
  false,
  NULL
);`;

        /*`INSERT INTO todo_item
        (id, name, description, priority, done, doneAt)
        VALUES (
            uuid(),
            "${body.name}",
            "${body.description}",
            ${body.priority},
            ${body.done},
            STR_TO_DATE("${body.doneAt}","%Y-%m-%dT%H:%i:%s.%f")
        );`;*/


        let conn;
        try {
            conn = await pool.getConnection();
            const rows = await conn.query(query);
            //res.status(200).json("rows");
            res.status(200).send(rows);
            //return;
        } catch (err) {
            console.error(err);
            res.status(500).send({"message": 'Something went wrong', "error": err});
            //return;
        } finally {
            if (conn) conn.release(); // Liberar a conexão
        }

        
        /*res.status(200);
        res.send({
            "requisition": "post",
            "response": "Successful created."
        });*/
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