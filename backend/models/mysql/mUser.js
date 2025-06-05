import bcrypt from "bcrypt";
import db from "../../config/sqlConnectDB.js";
import { SALT_ROUNDS } from "../../config/config.js";

const mUser = {
  create: async (user) => {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(user.password, salt);

    try {
      const [results] = await db.query(
        "INSERT INTO users (username, password) VALUES (?, ?)",
        [user.username, hash]
      );
      // console.log(results);
      if (results) return user;

      return results;
    } catch (err) {
      throw {
        status: 500,
        message: `Error al crear el usuario ${user.username}`,
      };
    }
  },
  getOne: async (username) => {
    try {
      const [results] = await db.query(
        "SELECT * FROM users WHERE username = ?",
        [username]
      );
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
