const path = require("path");

const controller = {
  index: (req, res) => {
    res.render(path.join(__dirname,'../views/index.ejs'),{'userLogin':req.session.userLogged})
  },
};

module.exports = controller;



