module.exports= {
    "index": (req, res) => {
        res.render('page_login', { user: null});
    },
    "register": (req, res) => {
        res.render('page_register', { user: null});
    },
    "create-user": async function (req, res) {
        const body = req.body;
        const name = body.name.trim(),
              login = body.login.trim(),
              password = body.password;

        if (name == undefined || name.length < 5 || name.length > 50)
            res.status(400).send({"message": "Campo do nome inválido."});

        else if (login == undefined || login.length < 5 || login.length > 50)
            res.status(400).send({"message": "Campo do login inválido."});

        else if (password == undefined || password.length < 5 || password.length > 50)
            res.status(400).send({"message": "Campo do login inválido."});
        
        else {
            let conn;
            try {
                conn = await pool.getConnection();
                const query = `INSERT INTO tb_users (id, email, name, password) VALUES (
                        uuid(),
                        "${login}",
                        "${name}",
                        "$2y$10$ESfz0SN/nwZ6LJ60oIDq8..m7HnVKjrkjl85R.wjUdl0Cn8FxXLJ6"
                        );`;
                const rows = await conn.query(query);
                res.status(200).send(rows);
            } catch (err) {
                console.error(err);
                res.status(500).send({"message": 'Erro ao executar query.'});
            } finally {
                if (conn) conn.release(); // Liberar a conexão
            }
        }
    }
};