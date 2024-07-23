module.exports= {
    "index": (req, res) => {
        res.render('page_login', { user: null});
    },
    "register": (req, res) => {
        res.render('page_register', { user: null});
    }
};