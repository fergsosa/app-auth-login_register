import crypto from "node:crypto";
import bcrypt from "bcrypt";
import usuariosDB from "../../config/localConnectDB.js";
import { SALT_ROUNDS } from "../../config/config.js";

const mUser = {
  create: async (user) => {
    const { username, password } = user;
    const id = crypto.randomUUID();

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashPass = await bcrypt.hash(password, salt);

    const newUser = { _id: id, username, password: hashPass };

    try {
      const results = usuariosDB.push(newUser);
      console.log({ db: usuariosDB });
      if (results) return newUser;
    } catch (err) {
      throw {
        status: 500,
        message: `Error al crear el usuario ${user.username}`,
      };
    }
  },
  getOne: async (username) => {
    try {
      const results = usuariosDB.filter((user) => user.username === username);
      // console.log({ usuariosDB });
      return results[0];
    } catch (err) {
      throw {
        status: 500,
        message: `Error al obtener el usuario ${username}`,
      };
    }
  },
};

export default mUser;
