const token = require("jsonwebtoken");
const secret = "secret";
function autentif(req, res, next) {
  const tkn = req.cookies.jwt;
  if (tkn) {
    token.verify(tkn, secret, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
}

module.exports = { autentif };
