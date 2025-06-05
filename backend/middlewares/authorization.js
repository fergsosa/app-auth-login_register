import jwtHelper from "../helpers/jwt.helper.js";

const authorization = {
  soloPublic: (req, res, next) => {
    const logueado = jwtHelper.validateToken(req, res);
    console.log({ logueado });
    if (!logueado) return next();
    return res.redirect("/");
  },

  soloAdmin: (req, res, next) => {
    const logueado = jwtHelper.validateToken(req, res);
    console.log({ logueado });
    if (logueado) return next();
    return res.redirect("/login");
  },
};

export default authorization;
