import bcrypt from "bcrypt";
import error from "../middlewares/error.js";
import jwtHelper from "../helpers/jwt.helper.js";
import { COOKIE_JWT_EXPIRES_DAY, COOKIE_JWT_NAME } from "../config/config.js";

import mUser from "../models/local/mUser.js"; //* local
// import mUser from "../models/mongo/mUser.js"; //* mongo
// import mUser from "../models/mysql/mUser.js"; //* mysql

const cUser = {
  login: (req, res) => {
    return res.render("login");
  },
  loginAuth: async (req, res) => {
    const { username, password } = req.body;
    try {
      const results = await mUser.getOne(username);
      if (results === null || results === undefined)
        return res.render("login", { userExist: false });

      //* 🔻bcrypt validación/compara
      let isMatch = await bcrypt.compare(password, results.password);
      if (!isMatch) {
        return res.render("login", {
          passwordMatch: false,
          userNoMach: username,
        });
      }
      // console.log({ isMatch });

      //* 🔻jsonwebtoken (genera)
      const { hashPass: _, ...dataUser } = results; //? todo menos pass
      const accessToken = jwtHelper.generateAccessToken(dataUser);
      // console.log({ accessToken });

      //* 🔻Establecer cookie de autenticación
      const cookiesOptions = {
        httpOnly: true,
        sameSite: "strict",
        // maxAge: 1 * 60 * 1000, //2 min
        expires: new Date(
          Date.now() + COOKIE_JWT_EXPIRES_DAY * 24 * 60 * 60 * 1000
        ),
        path: "/",
      };
      res.cookie(COOKIE_JWT_NAME, accessToken, cookiesOptions);

      return res.status(200).redirect("/");
    } catch (err) {
      return error.e500(req, res, err);
    }
  },
  signin: (req, res) => {
    return res.render("signin");
  },
  signinAuth: async (req, res) => {
    const { username, password } = req.body;
    const { "confirm-password": confirmPassword } = req.body;

    try {
      const userDB = await mUser.getOne(username);
      if (userDB) return res.render("signin", { userExist: true });

      if (password && confirmPassword && password !== confirmPassword)
        return res.render("signin", {
          passwordMatch: false,
          userNoMach: username,
        });

      const result = await mUser.create({ username, password });

      return res.render("signin", { newUser: true, user: result.username });
    } catch (err) {
      return error.e500(req, res, err);
    }
  },
  logout: (req, res) => {
    console.log({ message: "🔒 Sesión cerrada exitosamente" });
    return res.clearCookie(COOKIE_JWT_NAME).redirect("/login");
  },
};

export default cUser;
