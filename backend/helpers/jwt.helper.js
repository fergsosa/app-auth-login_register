import jwt from "jsonwebtoken";
import {
  COOKIE_JWT_NAME,
  JWT_EXPIRATION,
  JWT_SECRET_KEY,
} from "../config/config.js";

const jwtHelper = {
  generateAccessToken: (dataUser) => {
    //* 🔻sign (payload/datos | clave secreta | algoritmos/opción)
    const token = jwt.sign(dataUser, JWT_SECRET_KEY, {
      expiresIn: JWT_EXPIRATION,
    });
    return token;
  },

  validateToken: (req, res) => {
    const cookieHeader = req.headers.cookie;
    if (!cookieHeader) return false;

    const token = cookieHeader
      .split("/; */")
      .find((cookie) => cookie.startsWith(`${COOKIE_JWT_NAME}=`))
      ?.split("=")[1];

    if (!token) return false;
    // console.log({ token });

    //* 🔻verify (token | clave secreta )
    try {
      const usuarioVerificado = jwt.verify(token, JWT_SECRET_KEY);
      // console.log({ usuarioVerificado });
      if (usuarioVerificado) return true;
    } catch (error) {
      console.error("⛔ Error al verificar el token:", error.message);
      res.status(403).send(`🚫 Token inválido o expirado`);

      return null;
    }
  },
};

export default jwtHelper;
